<template>
  <div id="assessClipboard" class="shadow">
    <div class="container jumbotron">
      <div class="">

        <h4 class="text-center text-success mb-4">แบบประเมินผลการเรียน</h4>
        <!-- <button @click="saveToPdf">Save to PDF</button> -->
        <survey :survey="survey"></survey>
        <div class="btn btn-success" @click="sendData()">ส่งข้อมูล</div>
        <div class="mt-3 shadow"></div>
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
              name: "Quality",
              title:
                "ประเมินผลการเรียน",
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
                  value: "ควรปรับปรุง",
                  text: "ควรปรับปรุง",
                },

              ],
              rows: [
                {
                  value: "interesting",
                  text: "ความสนใจ การตั้งใจเรียน และการมีสมาธิ",
                },
                {
                  value: "rhythm",
                  text: "การเรียนรู้เรื่องจังหวะ ตัวโน๊ต",
                },
                {
                  value: "position",
                  text: "การนั่ง การวางมือ และการปฎิบัติกับเครื่องดนตรี ด้วยท่าทางที่ถูกต้อง",
                },
                {
                  value: "noteReading",
                  text: "การอ่านโน๊ต",
                },
                {
                  value: "exam",
                  text: "การทบทวนบทเรียน หรือแบบทดสอบ",
                },
                {
                  value: "accurate",
                  text: "ความจำ และความแม่นยำ",
                },
                {
                  value: "ear",
                  text: "ทักษะการฟัง และการอ่าน ประสาทสัมผัส",
                },
                {
                  value: "imagin",
                  text: "ความคิดสร้างสรรค์ จินตนาการ",
                },
                {
                  value: "scale",
                  text: "ทักษะการไล่สเกล",
                },
                {
                  value: "theory",
                  text: "ทฤษฎีดนตรี เรียบเรียง เสียงประสาน",
                },
                
              ],
            },
            
            {
              type: "comment",
              name: "teacherComment",
              title: "ความคิดเห็นครูผู้สอน",
            },
            {
              type: "comment",
              name: "parentComment",
              title: "ความคิดเห็นผู้ปกครอง",
            },
       
          ],
        },

      ],
    };
    var model = new SurveyVue.Model(json);
    model.data = {
      Quality: {
        "ความสนใจ การตั้งใจเรียน และการมีสมาธิ": null,
        "การเรียนรู้เรื่องจังหวะ ตัวโน๊ต": null,
        "การนั่ง การวางมือ และการปฎิบัติกับเครื่องดนตรี ด้วยท่าทางที่ถูกต้อง": null,
        "การอ่านโน๊ต" : null,
        "การทบทวนบทเรียน หรือแบบทดสอบ" : null,
        "ความจำ และความแม่นยำ": null,
        "ทักษะการฟัง และการอ่าน ประสาทสัมผัส":null,
        "ความคิดสร้างสรรค์ จินตนาการ":null,
        "ทักษะการไล่สเกล":null,
        "ทฤษฎีดนตรี เรียบเรียง เสียงประสาน" :null,

      },

      teacherComment: "",
      parentComment: "",
      
    };
    return {
      survey: model,
    };
  },

  mounted() {},

  methods: {
    sendData(){
     console.log( this.$route.params.uid);

        console.log(this.survey.data);
        console.log('5555');
        db.collection('assessment').doc(this.$route.params.uid).set(this.survey.data)
    },
    saveToPdf() {
    //   saveSurveyToPdf("surveyResult.pdf", this.survey, 595 * 2, 792 * 2);
     console.log(this.survey.data);
    }
  },
};
</script>

<style lang="scss" scoped></style>
