<template>
  <div id="assessClipboard" class="shadow">
    <div class="container jumbotron">
      <div class="">
        <h4 class="text-center text-success mb-4 p-2">แบบประเมินครู - โรงเรียน</h4>
        <!-- <button @click="saveToPdf">Save to PDF</button> -->
        <survey :survey="survey"></survey>
        <div class="row">
          <div class="col-md-12 text-center">
            <div class="btn btn-success mt-3" @click="sendData()">
              ส่งผลการประเมิน
            </div>
            <div class="mt-3 shadow"></div>
          </div>
        </div>
      </div>
    </div>
    <!-- <h1>AssessClipboard</h1>
     <survey :survey="survey"></survey> -->
  </div>
</template>

<script>
import { db } from "../../firebase";

import * as SurveyVue from "survey-vue";
import "survey-vue/survey.css";
import * as widgets from "surveyjs-widgets";

// widgets.signaturepad(SurveyVue);
SurveyVue.StylesManager.applyTheme("default");
var Survey = SurveyVue.Survey;
export default {
  name: "assessClipboard",
  components: {
    Survey,
  },
  data() {
    var json = {
      pages: [
        {
          questions: [
            {
              type: "matrix",
              name: "teacherQuality",
              title: "ประเมินคุณครูผู้สอน",
              columns: [
                {
                  value: "ดีมาก",
                  text: "ดีมาก",
                },
                {
                  value: "ดี",
                  text: "ดี",
                },
                {
                  value: "พอใช้",
                  text: "พอใช้",
                },
                {
                  value: "ไม่ค่อยดี",
                  text: "ไม่ค่อยดี",
                },
                {
                  value: "ควรปรับปรุง",
                  text: "ควรปรับปรุง",
                },
              ],
              rows: [
                {
                  value: "manners",
                  text: "มารยาทและอัธยาศัย",
                },
                {
                  value: "punctual",
                  text: "ความตรงต่อเวลา",
                },
                {
                  value: "teaching",
                  text: "ความสามารถในการถ่ายทอดให้เข้าใจ",
                },
                {
                  value: "advice",
                  text: "การแนะนำการศึกษาที่สูงขึ้น​ (การสอบเอาวุฒิ)​",
                },
                {
                  value: "instruction",
                  text: "การแนะนำการพัฒนาส่วนตัว​ (การเข้าประกวด)​",
                },
              ],
            },

            {
              type: "comment",
              name: "teacherAdvice",
              title: "ข้อเสนอแนะครูผู้สอน",
            },

            {
              type: "matrix",
              name: "employQuality",
              title: "ประเมินธุรการผู้ประสานงาน",
              columns: [
                {
                  value: "ดีมาก",
                  text: "ดีมาก",
                },
                {
                  value: "ดี",
                  text: "ดี",
                },
                {
                  value: "พอใช้",
                  text: "พอใช้",
                },
                {
                  value: "ไม่ค่อยดี",
                  text: "ไม่ค่อยดี",
                },
                {
                  value: "ควรปรับปรุง",
                  text: "ควรปรับปรุง",
                },
              ],
              rows: [
                {
                  value: "manners",
                  text: "มารยาทและอัธยาศัย",
                },
                {
                  value: "advice",
                  text: "การแนะนำโปรโมชั่นและคอร์สเรียนต่างๆ",
                },
              ],
            },

            {
              type: "comment",
              name: "employAdvice",
              title: "ข้อเสนอแนะธุรการ",
            },

            {
              type: "matrix",
              name: "schoolQuality",
              title: "ประเมินโรงเรียนเมโลดิอุส",
              columns: [
                {
                  value: "ดีมาก",
                  text: "ดีมาก",
                },
                {
                  value: "ดี",
                  text: "ดี",
                },
                {
                  value: "พอใช้",
                  text: "พอใช้",
                },
                {
                  value: "ไม่ค่อยดี",
                  text: "ไม่ค่อยดี",
                },
                {
                  value: "ควรปรับปรุง",
                  text: "ควรปรับปรุง",
                },
              ],
              rows: [
                {
                  value: "replete",
                  text: "เครื่องมือเครื่องใช้ในการเรียนที่ครบครัน",
                },
                {
                  value: "cleaning",
                  text: "ความสะอาดในห้องเรียน",
                },

                {
                  value: "bathroom",
                  text: "ความสะอาดในห้องน้ำ",
                },
                {
                  value: "advice",
                  text: "การแนะนำการสอบเอาวุฒิและเข้าประกวดในเวทีต่างๆ",
                },
              ],
            },

            {
              type: "comment",
              name: "schoolAdvice",
              title: "ข้อเสนอแนะโรงเรียน:",
            },
          ],
        },
      ],
    };
    var model = new SurveyVue.Model(json);
    model.data = {
      teacherQuality: {
        "มารยาทและอัธยาศัย": null,
        "ความตรงต่อเวลา": null,
        "ความสามารถในการถ่ายทอดให้เข้าใจ":null,
        "การแนะนำการศึกษาที่สูงขึ้น​ (การสอบเอาวุฒิ)": null,
        "การแนะนำการพัฒนาส่วนตัว​ (การเข้าประกวด)": null,
      },
      teacherAdvice: "",
      employQuality: {
        "มารยาทและอัธยาศัย": null,
        "การแนะนำโปรโมชั่นและคอร์สเรียนต่างๆ": null,
      },
      employAdvice: "",
      schoolQuality: {
        "เครื่องมือเครื่องใช้ในการเรียนที่ครบครัน": null,
        "ความสะอาดในห้องเรียน": null,
        "ความสะอาดในห้องน้ำ":null,
        "การแนะนำการสอบเอาวุฒิและเข้าประกวดในเวทีต่างๆ": null,
      },
      schoolAdvice: "",
      
    };
    return {
      survey: model,
    };
  },

  mounted() {},

  methods: {
    async sendData() {
      try {
        if (this.survey.data != null) {
          await db
            .collection("assessment2")
            .doc(this.$route.params.uid)
            .set(this.survey.data);

          Swal.fire({
            title: "ส่งแบบประเมินเรียบร้อย",
            text: "ทำการส่งแบบประเมินเรียบร้อย",
            icon: "success",
            confirmButtonColor: "#30855c",
            confirmButtonText: "ตกลง",
          });
          this.$router.replace("/");
        }
      } catch (err) {
        Swal.fire({
          title: "เกิดข้อผิดพลาด",
          text: "เกิดข้อผิดพลาดบางอย่าง กรุณารอและทำรายการใหม่",
          icon: "error",
          confirmButtonColor: "#FF0000",
          confirmButtonText: "ตกลง",
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
