<template>
  <div id="teacher" class="shadow">
    <div class="container-fluid jumbotron">
      <div class="">
        <h4 class="text-center text-success mb-4">รายงานการเข้าสอน</h4>
      </div>
      <div class="mt-3 shadow">
        <vue-good-table
          :columns="columns"
          :rows="profiles"
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
            <span v-if="props.column.field == 'schedule'">
              <div class="btn btn-success" @click="attendDetail(props.row.uid)">
                <i class="fas fa-chalkboard-teacher"></i>
              </div>
            </span>
            <span v-else>
              {{ props.formattedRow[props.column.field] }}
            </span>
          </template>
        </vue-good-table>
      </div>
    </div>

    <!--Start Income  Modal -->
    <div class="modal fade" id="attendModal">
      <div class="modal-dialog modal-xl modal-dialog-scrollable">
        <div class="modal-content">
          <!-- Modal Header -->
          <div class="modal-header">
            <h4 class="modal-title w-100 text-center text-success">
              สรุปการเข้าสอน
            </h4>
            <button type="button" class="close" data-dismiss="modal">
              &times;
            </button>
          </div>

          <!-- Modal body -->
          <div class="modal-body">
            <div class="row">
              <div class="col-md-4"></div>
              <div class="col-md-4">
                <div class="form-group mt-2">
                  <input
                    type="month"
                    class="form-control"
                    v-model="monthSelect"
                    @change="getAttendDataFromMonth()"
                  />
                </div>
              </div>
              <div class="col-md-4"></div>
            </div>

            <div class="row">
              <div class="col-md-4"></div>
              <div class="col-md-4">
                <div class="card-deck text-center">
                  <div class="card">
                    <div class="card-body">
                      <div class="card-header bg-success shadow">
                        <h5 class="text-light text-center">ยอดรายได้การสอน</h5>
                      </div>
                      <i
                        class="fas fa-file-invoice-dollar mt-4 text-success"
                        style="font-size: 50px"
                      ></i>
                      <h4 class="card-text my-4 text-primary text-center">
                        จำนวน {{ wagesTotal | number("0,0") }} บาท
                      </h4>

                      <div class="card-header bg-success shadow">
                        <h5 class="text-light text-center"></h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-4"></div>
            </div>
            <vue-good-table
              :columns="columnsDetail"
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
              <template slot="table-row" slot-scope="props">
                <!-- <span v-if="props.column.field == 'edit'">
                  <div
                    class="btn btn-warning"
                    @click="editProduct(props.row)"
                    data-toggle="modal"
                    data-target="#product"
                  >
                    แก้ไข
                  </div>
                </span> -->

                <span v-if="props.column.field == 'studentname'">
                  <div
                    v-for="(item, index) in props.row.studentYes"
                    :key="index"
                  >
                    <h6>{{ item.firstName }}</h6>
                  </div>
                </span>
                <span v-else-if="props.column.field == 'studentId'">
                  <div
                    v-for="(item, index) in props.row.studentYes"
                    :key="index"
                  >
                    <h6>{{ item.studentId }}</h6>
                  </div>
                </span>
                <span v-else>
                  {{ props.formattedRow[props.column.field] }}
                </span>
              </template>
            </vue-good-table>
          </div>

          <!-- Modal footer -->
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
    <!--End Income  Modal -->
  </div>
</template>

<script>
import { db, functions, fb } from "../../firebase.js";
import moment from "moment";

export default {
  name: "",
  data() {
    return {
      columns: [
        {
          label: "ชื่อ",
          field: "firstName",
          type: "text",
        },
        {
          label: "นามสกุล",
          field: "lastName",
          type: "text",
        },
        {
          label: "ชื่อเล่น",
          field: "nickName",
          type: "text",
        },
        {
          label: "เบอร์โทร",
          field: "mobilephone",
          type: "text",
        },
        {
          label: "วิชา",
          field: "subject",
          type: "text",
        },
        {
          label: "การเข้าสอน",
          field: "schedule",
          type: "text",
        },
      ],

      columnsDetail: [
        {
          label: "วันที่",
          field: "learningTime",
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
        {
          label: "ค่าสอน",
          field: "wages",
          type: "text",
        },
      ],

      profiles: [],

      profile: {
        uid: "",
        addProfileAt: "",
        image: null,

        namePrefix: "",
        nickName: "",
        firstName: "",
        lastName: "",
        birthday: null,
        email: "",
        telephone: "",
        mobilephone: "",

        address: {
          addressNumber: "",
          location: "",
          soi: "",
          road: "",
          district: "",
          amphoe: "",
          province: "",
          zipcode: "",
        },

        graduated: {
          degree: "",
          university: "",
          faculty: "",
          major: "",
        },

        subject: "",
        workingProfile: "",
        profileType: "teacher",
      },

      userStatus: null,

      monthSelect: null,
      details: [],
      userId : null,
    };
  },

  methods: {
    getAttendDataFromMonth() {
      // alert(this.monthSelect);
      try{
        db
          .collection("AttendanceHistory")
          // .orderBy("createdAt", "asc")
          .where("monthlyDay", "==", this.monthSelect)
          .orderBy("learningTime", "desc")
          // .where("amount", ">=", 1)
          .onSnapshot((querySnapshot) => {
            this.details = [];
            querySnapshot.forEach((doc) => {
              // if(!doc.data().role.isAdmin)
              // {
              // console.log(doc.data());
              if (doc.data().teacherAtclass.teacherId == this.userId) {
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
              }
              console.log(this.details);
            });
          });
      }catch(err){

      }
    },

     attendDetail(uid) {
      // console.log(uid);
      this.userId = uid
      this.monthSelect = null;
      try {
        // var date = moment().isoWeekday();
        // console.log(date);
         db
          .collection("AttendanceHistory")
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
              if (doc.data().teacherAtclass.teacherId == uid) {
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
              }
              console.log(this.details);
            });
          });
        $("#attendModal").modal("show");
      } catch (err) {
        console.log(err);
      }
    },

    getData() {
      try {
        this.$store.state.show = true;
        db.collection("teacherData")
          // .where("role.isTeacher", "==", true)
          // .where("role.isAdmin", "==", true)
          .onSnapshot((querySnapshot) => {
            this.profiles = [];
            querySnapshot.forEach((doc) => {
              // if(!doc.data().role.isAdmin)
              // {
              // console.log(doc.data());
              if (
                doc.data().role.isAdmin ||
                doc.data().role.isTeacher ||
                doc.data().role.isAssistant
              ) {
                let profile = {
                  uid: doc.id,
                  addProfileAt: moment(doc.data().addProfileAt).format(
                    "DD/MM/YYYY HH:mm:ss"
                  ),
                  image: doc.data().image,
                  canUpdate: doc.data().canUpdate,
                  namePrefix: doc.data().namePrefix,
                  nickName: doc.data().nickName,
                  firstName: doc.data().firstName,
                  lastName: doc.data().lastName,
                  fullName: doc.data().fullName,
                  birthday: doc.data().birthday,
                  email: doc.data().email,
                  telephone: doc.data().telephone,
                  mobilephone: doc.data().mobilephone,
                  profileType: "teacher",
                  role: doc.data().role,

                  address: {
                    addressNumber: doc.data().address.addressNumber,
                    location: doc.data().address.location,
                    soi: doc.data().address.soi,
                    road: doc.data().address.road,
                    district: doc.data().address.district,
                    amphoe: doc.data().address.amphoe,
                    province: doc.data().address.province,
                    zipcode: doc.data().address.zipcode,
                  },

                  graduated: {
                    degree: doc.data().graduated.degree,
                    university: doc.data().graduated.university,
                    faculty: doc.data().graduated.faculty,
                    major: doc.data().graduated.major,
                  },
                  subject: doc.data().subject,
                  workingProfile: doc.data().workingProfile,
                  commited: "ครู",
                };
                this.profiles.push(profile);
              }
            });
            this.$store.state.show = false;
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
    this.getData();
  },

  created() {
    this.chkStatus();
  },
};
</script>

<style scoped></style>
