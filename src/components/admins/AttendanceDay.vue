<template>
  <div id="teacher" class="shadow">
    <div class="container-fluid jumbotron">
      <div class="">
        <h4 class="text-center text-success mb-4">รายงานการเข้าสอน - รายวัน</h4>
        <div class="row transaction">
          <div class="col-md-12">
            <date-range-picker
              :single-date-picker="singleDatePicker"
              @update="getAttendDataFromDate"
              :showDropdowns="showDropdowns"
              v-model="pickerDates"
            >
              <!-- <template
                v-slot:input="pickerDates"
                style="min-width: 450px"
                class="form-control"
                >{{ pickerDates.startDate | date }} -
                {{ pickerDates.endDate | date }}
                <br />
              </template> -->
            </date-range-picker>
            <br />
          </div>
        </div>
      </div>
      <div class="mt-3 shadow">
        <vue-good-table
          :columns="columns"
          :rows="details"
          :line-numbers="true"
          styleClass="vgt-table striped bordered"
          :search-options="{
            enabled: true,
            placeholder: 'ค้นหา',
          }"
          :pagination-options="{
            enabled: true,
          }"
          compactMode
        >
          <!-- props.row คือ profiles -->
          <template slot="table-row" slot-scope="props">
            <span v-if="props.column.field == 'studentname'">
              <div v-for="(item, index) in props.row.studentYes" :key="index">
                <h6>{{ item.firstName }}</h6>
              </div>
            </span>
            <span v-else-if="props.column.field == 'studentId'">
              <div v-for="(item, index) in props.row.studentYes" :key="index">
                <h6>{{ item.studentId }}</h6>
              </div>
            </span>
            <span v-else>
              {{ props.formattedRow[props.column.field] }}
            </span>
          </template>
        </vue-good-table>
      </div>
    </div>
  </div>
</template>

<script>
import { db, fb } from "../../firebase.js";
import DateRangePicker from "vue2-daterange-picker";
import "vue2-daterange-picker/dist/vue2-daterange-picker.css";
import moment from "moment";

export default {
  name: "",
  components: { DateRangePicker },
  data() {
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 6);
    return {
      singleDatePicker: "range",
      showDropdowns: true,
      localeData: {
        direction: "ltr",
        format: "DD/MM/YYYY",
        separator: " - ",
        applyLabel: "Apply",
        cancelLabel: "Cancel",
        weekLabel: "W",
        customRangeLabel: "Custom Range",
        daysOfWeek: ["อา", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        monthNames: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        firstDay: 0,
      },
      pickerDates: {
        startDate,
        endDate,
      },
      columns: [
        {
          label: "วันที่",
          field: "learningTime",
          type: "text",
        },
        {
          label: "ครู",
          field: "teacherAtclass.teacherName",
          type: "text",
        },
        {
          label: "นักเรียน",
          field: "studentname",
          type: "text",
        },
        {
          label: "รหัสนักเรียน",
          field: "studentId",
          type: "text",
        },
        {
          label: "วิชา",
          field: "courseName",
          type: "text",
        },
        {
          label: "ประเภท",
          field: "classType",
          type: "text",
        },
        {
          label: "ระดับ",
          field: "level",
          type: "text",
        },
        {
          label: "วันเรียน",
          field: "dayAttend.item",
          type: "text",
        },
        {
          label: "เวลาเรียน",
          field: "classTime",
          type: "text",
        },
        // {
        //   label: "ข้อมูล",
        //   field: "attendance",
        //   type: "text",
        // },
        // {
        //   label: "delete",
        //   field: "delete",
        //   type: "text",
        // },
      ],

      userStatus: null,

      monthSelect: null,
      details: [],
      userId: null,
    };
  },
  filters: {
    date(date) {
      return new Intl.DateTimeFormat("th-TH").format(date);
    },
  },

  methods: {
    getAttendDataFromDate() {
      try {
        // this.$store.state.show = true;
        var startDateFormat = moment(this.pickerDates.startDate).format(
          "YYYY-MM-DD"
        );
        console.log(startDateFormat);
        var endDateFormat = moment(this.pickerDates.endDate).format(
          "YYYY-MM-DD"
        );
        console.log(endDateFormat);
        db.collection("AttendanceHistory")
          .where("learningTime", ">=", startDateFormat)
          .where("learningTime", "<=", endDateFormat)
          .orderBy("learningTime", "desc")
          .onSnapshot((querySnapshot) => {
            this.details = [];
            querySnapshot.forEach((doc) => {
              let detail = {
                docId: doc.id,
                studentAtClass: doc.data().studentAtClass,
                learningTime: moment(doc.data().learningTime)
                  .add(543, "year")
                  .format("DD/MM/YYYY"),
                commentThisTime: doc.data().commentThisTime,
                teacherAtclass: doc.data().teacherAtclass,
                studentYes: doc.data().studentYes,
                courseName: doc.data().courseName,
                classType: doc.data().classType,
                level: doc.data().level,
                commentClass: doc.data().commentClass,
                attendancePic: doc.data().attendancePic,
                wages: doc.data().wages,
                chkOut: doc.data().chkOut,

                finishTime: moment(doc.data().finishTime, "HH:mm:ss").format(
                  "HH:mm"
                ),
                startTime: moment(doc.data().startTime, "HH:mm:ss").format(
                  "HH:mm"
                ),
                dayAttend: doc.data().dayAttend,
              };
              detail.classTime = `${detail.startTime} - ${detail.finishTime}`;
              this.details.push(detail);
              // }
              console.log(this.details);
              this.$store.state.show = false;
            });
          });
      } catch (err) {
        this.$store.state.show = false;
      }
    },
    
    getAttendData() {
      try {
        this.$store.state.show = true;
        db.collection("AttendanceHistory")
          // .orderBy("createdAt", "asc")
          // .where("teacherAtclass.teacherId", "==", uid)
          .orderBy("learningTime", "desc")
          // .where("amount", ">=", 1)
          .onSnapshot((querySnapshot) => {
            this.details = [];
            querySnapshot.forEach((doc) => {
              // if(!doc.data().role.isAdmin)
              // {
              // console.log(doc.data());
              // if (doc.data().teacherAtclass.teacherId == uid) {
              let detail = {
                docId: doc.id,
                studentAtClass: doc.data().studentAtClass,
                learningTime: moment(doc.data().learningTime)
                  .add(543, "year")
                  .format("DD/MM/YYYY"),
                commentThisTime: doc.data().commentThisTime,
                teacherAtclass: doc.data().teacherAtclass,
                studentYes: doc.data().studentYes,
                courseName: doc.data().courseName,
                classType: doc.data().classType,
                level: doc.data().level,
                commentClass: doc.data().commentClass,
                attendancePic: doc.data().attendancePic,
                wages: doc.data().wages,
                chkOut: doc.data().chkOut,

                finishTime: moment(doc.data().finishTime, "HH:mm:ss").format(
                  "HH:mm"
                ),
                startTime: moment(doc.data().startTime, "HH:mm:ss").format(
                  "HH:mm"
                ),
                dayAttend: doc.data().dayAttend,
              };
              detail.classTime = `${detail.startTime} - ${detail.finishTime}`;
              this.details.push(detail);
              // }
              console.log(this.details);
              this.$store.state.show = false;
            });
          });
      } catch (err) {
        console.log(err);
        this.$store.state.show = false;
      }
    },

    async chkStatus() {
      await fb.auth().onAuthStateChanged;
      var { claims } = await fb.auth().currentUser.getIdTokenResult();

      if (claims.isAdmin) {
        this.userStatus = "isAdmin";
      } else if (claims.isRegisted) {
        this.$router.replace("/");
      } else if (claims.isProfile) {
        this.$router.replace("/");
      } else if (claims.isTeacher) {
        this.$router.replace("/");
      } else if (claims.isStudent) {
        this.$router.replace("/");
      }
      console.log(claims);
    },
  },

  computed: {
    wagesTotal() {
      var total = this.details.reduce((accumulator, item) => {
        return accumulator + parseInt(item.wages);
      }, 0);
      return total;
    },
  },

  mounted() {
    window.scrollTo(0, 0);
    this.getAttendData();
  },

  created() {
    this.chkStatus();
  },
};
</script>

<style lang="scss" scoped>
.transaction {
  text-align: center;
  color: #2c3e50;
}
</style>
