<template>
  <div id="assessment" class="shadow">
    <div class="container-fluid jumbotron">
      <div class="">
        <h4 class="text-center text-success mb-4">แบบประเมินผลการเรียน</h4>
        <div class="mt-3 shadow">
          <vue-good-table
            :columns="columns"
            :rows="courseActives"
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
            <span v-if="props.column.field == 'servey'">
              <div
                class="btn btn-success"
                @click="doCopy(props.row.courseId)"
              >
                <i class="fas fa-thumbs-up"></i>
              </div>
            </span>
            <!-- <span v-else-if="props.column.field == 'edit'">
              <div
                v-if="props.row.canUpdate == true"
                class="btn btn-info"
                @click="openEditModal(props.row)"
              >
                <i class="fas fa-edit"></i>
              </div>
              <div
                v-else
                class="btn btn-warning"
                @click="editProfile(props.row)"
              >
                <i class="fas fa-edit"></i>
              </div>
            </span>
            <span v-else-if="props.column.field == 'delete'">
              <div
                class="btn btn-danger"
                @click="deleteemployee(props.row.uid)"
              >
                <i class="fas fa-trash-alt"></i>
              </div>
            </span> -->
            <span v-else>
              {{ props.formattedRow[props.column.field] }}
            </span>
          </template>
          </vue-good-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db} from "../../firebase.js";
import moment from "moment";
import Vue from 'vue'
import VueClipboard from 'vue-clipboard2'

Vue.use(VueClipboard)
export default {
  name: "assessment",

  data() {
    return {
      columns: [
        {
          label: "วิชา",
          field: "courseName",
          type: "text",
        },
        {
          label: "ระดับชั้น",
          field: "level",
          type: "text",
        },
        {
          label: "วันเรียน",
          field: "dayAttend.item",
          type: "text",
        },
        {
          label: "เวลา",
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
          field: "stdFullname",
          type: "text",
        },
        // {
        //   label: "ตารางสอน",
        //   field: "schedule",
        //   type: "text",
        // },
        {
          label: "แบบประเมิน",
          field: "servey",
          type: "text",
        },
      ],
      courseActives: [],
      assesslink:'',
    };
  },

  methods: {
    doCopy (courseId) {
        this.assesslink = `https://melodious-test.web.app/assess/${courseId}`; 
        // http://172.16.3.207:8080/
        // this.assesslink = `http://172.16.3.207:8080/assess/${courseId}`;
        console.log(this.assesslink);
        this.$copyText(this.assesslink).then(function (e) {
          alert('Copied')
          console.log(e)
        }, function (e) {
          alert('Can not copy')
          console.log(e)
        })
    },
    
    getCourseActive() {
      try {
        db.collection("courseActive").onSnapshot((querySnapshot) => {
          this.courseActives = [];
          querySnapshot.forEach((doc) => {
            console.log(doc.data());
            let courseActive = {
              courseId: doc.id,
              classType: doc.data().classType,
              courseName: doc.data().courseName,
              dayAttend: doc.data().dayAttend,
              endDate: moment(doc.data().endDate).format("DD/MM/YYYY HH:mm"),
              finishTime: doc.data().finishTime,
              firstName: doc.data().firstName,
              lastName: doc.data().lastName,

              nickName: doc.data().nickName,

              level: doc.data().level,
              startDate: doc.data().startDate,
              startTime: doc.data().startTime,
              teacherAtclass: doc.data().teacherAtclass,
            };
            let studentFullname = `${courseActive.firstName}  ${courseActive.lastName} (${courseActive.nickName})`;
            let learningTime = `${courseActive.startTime} - ${courseActive.finishTime}`
            courseActive.stdFullname = studentFullname;
            courseActive.learningTime = learningTime;
            this.courseActives.push(courseActive);
            // this.$store.state.employeeApproveCount = this.profiles.length;
            // }
          });
        });
      } catch (err) {
        console.log(err);
      }
    },
  },

  mounted() {
    this.getCourseActive();
  },
};
</script>

<style lang="scss" scoped></style>
