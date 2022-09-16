<template>
  <div>
    <div class="container jumbotron bg-light shadow">
      <h4 class="text-center text-success mb-4 p-2">ผลประเมินครู - โรงเรียน</h4>
      <div class="row">
        <div class="col-md-2"></div>
        <div class="col-md-8">
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
        <div class="col-md-2"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "../../firebase.js";

export default {
  name: "SchoolTestAsssessResult1",

  data() {
    return {
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
    };
  },

  methods: {
    getResult() {
      let docRef = db.collection("assessment2").doc(this.$route.params.uid);
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
  },
  created() {
    this.getResult();
  },
};
</script>

<style lang="scss" scoped></style>
