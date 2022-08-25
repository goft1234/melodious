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
                  <!-- <i class="fas fa-thumbs-up"></i> -->
                  <i class="fas fa-copy"></i>
                </div>
              </span>
              <span v-else-if="props.column.field == 'result'">
                <div
                  class="btn btn-secondary"
                  data-toggle="modal"
                  data-target="#resultModal"
                  @click="getResult(props.row.courseId)"
                >
                  <i class="fas fa-poll-h"></i>
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
    <!-- The Modal -->
    <div class="modal fade" id="resultModal">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <!-- Modal Header -->
          <div class="modal-header">
            <h4 class="modal-title w-100 text-center text-success">
              ผลประเมิน
            </h4>
            <button type="button" class="close" data-dismiss="modal">
              &times;
            </button>
          </div>

          <!-- Modal body -->
          <div class="modal-body">
            <div class="table-responsive">
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th class="text-center">หัวข้อที่ประเมิน</th>
                    <th>ผลประเมิน</th>
                  </tr>
                </thead>
                <tbody class=" text-success">
                  <tr>
                    <td>ความสนใจ การตั้งใจเรียน และการมีสมาธิ</td>
                    <td>{{ respond.Quality.interesting }}</td>
                  </tr>
                  <tr>
                    <td>การเรียนรู้เรื่องจังหวะ ตัวโน๊ต</td>
                    <td>{{ respond.Quality.rhythm }}</td>
                  </tr>
                  <tr>
                    <td>
                      การนั่ง การวางมือ และการปฎิบัติกับเครื่องดนตรี
                      ด้วยท่าทางที่ถูกต้อง
                    </td>
                    <td>{{ respond.Quality.position }}</td>
                  </tr>
                  <tr>
                    <td>การอ่านโน๊ต</td>
                    <td>{{ respond.Quality.noteReading }}</td>
                  </tr>
                  <tr>
                    <td>การทบทวนบทเรียน หรือแบบทดสอบ</td>
                    <td>{{ respond.Quality.exam }}</td>
                  </tr>
                  <tr>
                    <td>ความจำ และความแม่นยำ</td>
                    <td>{{ respond.Quality.accurate }}</td>
                  </tr>
                  <tr>
                    <td>ทักษะการฟัง และการอ่าน ประสาทสัมผัส</td>
                    <td>{{ respond.Quality.ear }}</td>
                  </tr>
                  <tr>
                    <td>ความคิดสร้างสรรค์ จินตนาการ</td>
                    <td>{{ respond.Quality.imagin }}</td>
                  </tr>
                  <tr>
                    <td>ทักษะการไล่สเกล</td>
                    <td>{{ respond.Quality.scale }}</td>
                  </tr>
                  <tr>
                    <td>ทฤษฎีดนตรี เรียบเรียง เสียงประสาน</td>
                    <td>{{ respond.Quality.theory }}</td>
                  </tr>
                </tbody>
              </table>
              <hr class="text-success" />
            </div>
            <div class="form-group">
              <label for="comment" class="text-success">ความคิดเห็นครู</label>
              <textarea
                :value="respond.teacherComment"
                disabled
                class="form-control"
                rows="5"
                id="comment"
              ></textarea>
            </div>
            <div class="form-group">
              <label for="comment" class="text-success">ความคิดเห็นผู้ปกครอง</label>
              <textarea
                :value="respond.parentComment"
                disabled
                class="form-control"
                rows="5"
                id="comment"
              ></textarea>
            </div>
          </div>

          <!-- Modal footer -->
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-dismiss="modal">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "../../firebase.js";
import moment from "moment";
import Vue from "vue";
import VueClipboard from "vue-clipboard2";

Vue.use(VueClipboard);
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
        {
          label: "ผลประเมิน",
          field: "result",
          type: "text",
        },
      ],
      courseActives: [],
      assesslink: "",
      respond: {
        Quality: {
          interesting: "",
          rhythm: "",
          position: "",
          noteReading: "",
          exam: "",
          accurate: "",
          ear: "",
          imagin: "",
          scale: "",
          theory: "",
        },
        teacherComment: "",
        parentComment: "",
      },
    };
  },

  methods: {
    getResult(courseId) {
      console.log(courseId);
      let docRef = db.collection("assessment").doc(courseId);
      docRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            this.respond = doc.data();
            console.log("Document data:", this.respond);
          } else {
            // doc.data() will be undefined in this case
            this.respond = {
              Quality: {
                interesting: "",
                rhythm: "",
                position: "",
                noteReading: "",
                exam: "",
                accurate: "",
                ear: "",
                imagin: "",
                scale: "",
                theory: "",
              },
              teacherComment: "",
              parentComment: "",
            },
              console.log("No such document!");
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    },
    doCopy(courseId) {
      // this.assesslink = `https://melodious-test.web.app/assess/${courseId}`;
      // http://172.16.3.207:8080/
      this.assesslink = `http://172.16.3.205:8080/assess/${courseId}`;
      console.log(this.assesslink);
      this.$copyText(this.assesslink).then(
        function (e) {
          Swal.fire({
            title: "COPY SUCCESS",
            text: "ทำการคัดลอกลิงค์เรียบร้อย",
            icon: "success",
            confirmButtonColor: "#30855c",
            confirmButtonText: "ตกลง",
          });
          console.log(e);
        },
        function (e) {
          Swal.fire({
            title: "เกิดข้อผิดพลาด",
            text: "เกิดข้อผิดพลาดบางอย่าง กรุณารอและทำรายการใหม่",
            icon: "error",
            confirmButtonColor: "#FF0000",
            confirmButtonText: "ตกลง",
          });
          console.log(e);
        }
      );
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
            let learningTime = `${courseActive.startTime} - ${courseActive.finishTime}`;
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
