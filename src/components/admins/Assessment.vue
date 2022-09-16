<template>
  <div id="assessment" class="shadow">
    <div class="container-fluid jumbotron">
      <div class="">
        <h4 class="text-center text-success mb-4">แบบประเมินผลการเรียน</h4>
        <div class="row mt-3">
          <div class="col-md-3"></div>
          <div class="col-md-3 mt-2">
            <div class="btn btn-success">
              <!-- <i class="fas fa-thumbs-up"></i> -->
              <i class="fas fa-copy"></i>
            </div>
            <b> คือ แบบประเมินนักเรียน</b>
          </div>
          <div class="col-md-3 mt-2">
            <div class="btn btn-warning">
              <!-- <i class="fas fa-thumbs-up"></i> -->
              <i class="fas fa-copy"></i>
            </div>
            <b> คือ แบบประเมินครู - โรงเรียน</b>
          </div>
          <div class="col-md-3"></div>
        </div>
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
                  class="btn btn-success text-center"
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
                <div
                  class="btn btn-danger ml-1"
                  @click="doCopyResult1(props.row.courseId)"
                >
                  <i class="fas fa-link"></i>
                </div>
              </span>

              <span v-else-if="props.column.field == 'servey2'">
                <div
                  class="btn btn-warning"
                  @click="doCopy2(props.row.courseId)"
                >
                  <!-- <i class="fas fa-thumbs-up"></i> -->
                  <i class="fas fa-copy"></i>
                </div>
              </span>
              <span v-else-if="props.column.field == 'result2'">
                <div
                  class="btn btn-secondary"
                  data-toggle="modal"
                  data-target="#resultModal2"
                  @click="getResult2(props.row.courseId)"
                >
                  <i class="fas fa-poll-h"></i>
                </div>
                <div
                  class="btn btn-danger ml-1"
                  @click="doCopyResult2(props.row.courseId)"
                >
                  <i class="fas fa-link"></i>
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
                <tbody class="text-success">
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
              <!-- <hr class="text-success" /> -->
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
              <label for="comment" class="text-success"
                >ความคิดเห็นผู้ปกครอง</label
              >
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
            <button type="button" class="btn btn-dark" data-dismiss="modal">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- The Modal2 -->
    <div class="modal fade" id="resultModal2">
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
            <div class="row">
              <div class="col-md-12 text-center mb-2">
                <b class="">***ประเมินครูผู้สอน***</b>
              </div>
            </div>
            <div class="table-responsive">
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th class="text-center">หัวข้อประเมิน</th>
                    <th>ผลประเมิน</th>
                  </tr>
                </thead>
                <tbody class="text-success">
                  <tr>
                    <td>มารยาทและอัธยาศัย</td>
                    <td>{{ respond2.teacherQuality.manners }}</td>
                  </tr>
                  <tr>
                    <td>ความตรงต่อเวลา</td>
                    <td>{{ respond2.teacherQuality.punctual }}</td>
                  </tr>
                  <tr>
                    <td>ความสามารถในการถ่ายทอดให้เข้าใจ</td>
                    <td>{{ respond2.teacherQuality.teaching }}</td>
                  </tr>
                  <tr>
                    <td>การแนะนำการศึกษาที่สูงขึ้น​ (การสอบเอาวุฒิ)</td>
                    <td>{{ respond2.teacherQuality.advice }}</td>
                  </tr>
                  <tr>
                    <td>การแนะนำการพัฒนาส่วนตัว​ (การเข้าประกวด)</td>
                    <td>{{ respond2.teacherQuality.instruction }}</td>
                  </tr>
                </tbody>
              </table>
              <!-- <hr class="text-success" /> -->
            </div>

            <div class="form-group">
              <label for="comment" class="text-success"
                >- ข้อเสนอแนะครูผู้สอน</label
              >
              <textarea
                :value="respond2.teacherAdvice"
                disabled
                class="form-control"
                rows="5"
                id="comment"
              ></textarea>
            </div>

            <div class="row">
              <div class="col-md-12 text-center mb-2">
                <b class="">***ประเมินธุรการผู้ประสานงาน***</b>
              </div>
            </div>
            <div class="table-responsive">
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th class="text-center">หัวข้อที่ประเมิน</th>
                    <th>ผลประเมิน</th>
                  </tr>
                </thead>
                <tbody class="text-success">
                  <tr>
                    <td>มารยาทและอัธยาศัย</td>
                    <td>{{ respond2.employQuality.manners }}</td>
                  </tr>
                  <tr>
                    <td>การแนะนำโปรโมชั่นและคอร์สเรียนต่างๆ</td>
                    <td>{{ respond2.employQuality.advice }}</td>
                  </tr>
                </tbody>
              </table>
              <!-- <hr class="text-success" /> -->
            </div>

            <div class="form-group">
              <label for="comment" class="text-success">- ข้อเสนอแนะธุรการ</label>
              <textarea
                :value="respond2.employAdvice"
                disabled
                class="form-control"
                rows="5"
                id="comment"
              ></textarea>
            </div>

            <div class="row">
              <div class="col-md-12 text-center mb-2">
                <b class="">***ประเมินโรงเรียน***</b>
              </div>
            </div>
            <div class="table-responsive">
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th class="text-center">หัวข้อที่ประเมิน</th>
                    <th>ผลประเมิน</th>
                  </tr>
                </thead>
                <tbody class="text-success">
                  <tr>
                    <td>เครื่องมือเครื่องใช้ในการเรียนที่ครบครัน</td>
                    <td>{{ respond2.schoolQuality.replete }}</td>
                  </tr>
                  <tr>
                    <td>ความสะอาดในห้องเรียน</td>
                    <td>{{ respond2.schoolQuality.cleaning }}</td>
                  </tr>
                  <tr>
                    <td>ความสะอาดในห้องน้ำ</td>
                    <td>{{ respond2.schoolQuality.bathroom }}</td>
                  </tr>
                  <tr>
                    <td>การแนะนำการสอบเอาวุฒิและเข้าประกวดในเวทีต่างๆ</td>
                    <td>{{ respond2.schoolQuality.advice }}</td>
                  </tr>
                </tbody>
              </table>
              <!-- <hr class="text-success" /> -->
            </div>

            <div class="form-group">
              <label for="comment" class="text-success"
                >- ข้อเสนอแนะโรงเรียน</label
              >
              <textarea
                :value="respond2.schoolAdvice"
                disabled
                class="form-control"
                rows="5"
                id="comment"
              ></textarea>
            </div>
          </div>

          <!-- Modal footer -->
          <div class="modal-footer">
            <button type="button" class="btn btn-dark" data-dismiss="modal">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fb, db } from "../../firebase.js";
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
          label: "ครู",
          field: "teacherAtclass.teacherName",
          type: "text",
        },
        {
          label: "นักเรียน",
          field: "stdFullname",
          type: "text",
        },
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
          label: "Link ประเมิน",
          field: "servey",
          type: "text",
        },
        {
          label: "ผลประเมิน",
          field: "result",
          type: "text",
        },
        {
          label: "Link ประเมิน",
          field: "servey2",
          type: "text",
        },
        {
          label: "ผลประเมิน",
          field: "result2",
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

      respond2: {
        teacherQuality: {
          manners: "",
          punctual: "",
          teaching: "",
          advice: "",
          instruction: "",
        },
        teacherAdvice: "",

        employQuality: {
          manners: "",
          advice: "",
        },
        employAdvice: "",

        schoolQuality: {
          replete: "",
          cleaning: "",
          bathroom: "",
          advice: "",
        },
        schoolAdvice: "",

      },

      userStatus: null,
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
            (this.respond = {
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
            }),
              console.log("No such document!");
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    },

    getResult2(courseId) {
      console.log(courseId);
      let docRef = db.collection("assessment2").doc(courseId);
      docRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            this.respond2 = doc.data();
            console.log("Document data:", this.respond);
          } else {
            // doc.data() will be undefined in this case
            (this.respond2 = {
              teacherQuality: {
                manners: "",
                punctual: "",
                teaching: "",
                advice: "",
                instruction: "",
              },
              teacherAdvice: "",

              employQuality: {
                manners: "",
                advice: "",
              },
              employAdvice: "",

              schoolQuality: {
                replete: "",
                cleaning: "",
                bathroom: "",
                advice: "",
              },
              schoolAdvice: "",
            }),
              console.log("No such document!");
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    },

    doCopyResult1(courseId){
      this.assesslink = `https://melodious-test.web.app/assess/${courseId}`;
      // this.assesslink = `http://172.16.3.207:8080/assessresult1/${courseId}`;
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

    doCopyResult2(courseId){
      this.assesslink = `https://melodious-test.web.app/assess/${courseId}`;
      // this.assesslink = `http://172.16.3.207:8080/assessresult2/${courseId}`;
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

    doCopy(courseId) {
      this.assesslink = `https://melodious-test.web.app/assess/${courseId}`;
      // http://172.16.3.207:8080/
      // this.assesslink = `http://172.16.3.207:8080/assess/${courseId}`;
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

    doCopy2(courseId) {
      this.assesslink = `https://melodious-test.web.app/assess/${courseId}`;
      // http://172.16.3.207:8080/
      // this.assesslink = `http://172.16.3.207:8080/assess2/${courseId}`;
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

  mounted() {
    this.getCourseActive();
  },

  created() {
    this.chkStatus();
  },
};
</script>

<style lang="scss" scoped></style>
