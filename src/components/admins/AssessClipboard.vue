<template>
  <div id="assessClipboard" class="shadow">
    <div class="container jumbotron">
      <div class="">
        <h4 class="text-center text-success mb-4">แบบประเมินผลการเรียน</h4>
        <!-- <button @click="saveToPdf">Save to PDF</button> -->
        <survey :survey="survey"></survey>
        <div class="btn btn-success" @click="getData(survey)">ส่งข้อมูล</div>
        <div class="mt-3 shadow"></div>
      </div>
    </div>
    <!-- <h1>AssessClipboard</h1>
     <survey :survey="survey"></survey> -->
  </div>
</template>

<script>
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
              name: "ประเมินผลการเรียน",
              title:
                "",
              columns: [
                {
                  value: 4,
                  text: "ดีมาก",
                },
                {
                  value: 3,
                  text: "ดี",
                },
                {
                  value: 2,
                  text: "พอใช้",
                },
                {
                  value: 1,
                  text: "ควรปรับปรุง",
                },

              ],
              rows: [
                {
                  value: "affordable",
                  text: "ความสนใจ การตั้งใจเรียน และการมีสมาธิ",
                },
                {
                  value: "does what it claims",
                  text: "การเรียนรู้เรื่องจังหวะ ตัวโน๊ต",
                },
                {
                  value: "better then others",
                  text: "การนั่ง การวางมือ และการปฎิบัติกับเครื่องดนตรี ด้วยท่าทางที่ถูกต้อง",
                },
                {
                  value: "easy to use",
                  text: "การอ่านโน๊ต",
                },
                {
                  value: "affordable",
                  text: "การทบทวนบทเรียน หรือแบบทดสอบ",
                },
                {
                  value: "does what it claims",
                  text: "ความจำ และความแม่นยำ",
                },
                {
                  value: "better then others",
                  text: "ทักษะการฟัง และการอ่าน ประสาทสัมผัส",
                },
                {
                  value: "easy to use",
                  text: "ความคิดสร้างสรรค์ จินตนาการ",
                },
                {
                  value: "better then others",
                  text: "ทักษะการไล่สเกล",
                },
                {
                  value: "easy to use",
                  text: "ทฤษฎีดนตรี เรียบเรียง เสียงประสาน",
                },
                
              ],
            },
            // {
            //   type: "signaturepad",
            //   name: "sign",
            //   title: "Please enter your signature",
            // },
        //     {
        //       type: "rating",
        //       name: "satisfaction",
        //       title: "How satisfied are you with the Product?",
        //       mininumRateDescription: "Not Satisfied",
        //       maximumRateDescription: "Completely satisfied",
        //     },
        //     {
        //       type: "rating",
        //       name: "recommend friends",
        //       visibleIf: "{satisfaction} > 3",
        //       title:
        //         "How likely are you to recommend the Product to a friend or co-worker?",
        //       mininumRateDescription: "Will not recommend",
        //       maximumRateDescription: "I will recommend",
        //     },
            {
              type: "comment",
              name: "suggestions",
              title: "ความคิดเห็นครูผู้สอน",
            },
            {
              type: "comment",
              name: "suggestions",
              title: "ความคิดเห็นผู้ปกครอง",
            },
        //   ],
        // },
        // {
        //   questions: [
        //     {
        //       type: "radiogroup",
        //       name: "price to competitors",
        //       title: "Compared to our competitors, do you feel the Product is",
        //       choices: [
        //         "Less expensive",
        //         "Priced about the same",
        //         "More expensive",
        //         "Not sure",
        //       ],
        //     },
        //     {
        //       type: "radiogroup",
        //       name: "price",
        //       title: "Do you feel our current price is merited by our product?",
        //       choices: [
        //         "correct|Yes, the price is about right",
        //         "low|No, the price is too low for your product",
        //         "high|No, the price is too high for your product",
        //       ],
        //     },
        //     {
        //       type: "multipletext",
        //       name: "pricelimit",
        //       title: "What is the... ",
        //       items: [
        //         {
        //           name: "mostamount",
        //           title:
        //             "Most amount you would every pay for a product like ours",
        //         },
        //         {
        //           name: "leastamount",
        //           title: "The least amount you would feel comfortable paying",
        //         },
        //       ],
        //     },
          ],
        },
        {
        //   questions: [
        //     {
        //       type: "text",
        //       name: "email",
        //       title:
        //         "Thank you for taking our survey. Your survey is almost complete, please enter your email address in the box below if you wish to participate in our drawing, then press the 'Submit' button.",
        //     },
        //   ],
        },
      ],
    };
    var model = new SurveyVue.Model(json);
    model.data = {
      Quality: {
        affordable: "3",
        "does what it claims": "4",
        "better then others": "3",
        "easy to use": "5",
      },
      satisfaction: "4",
      "recommend friends": "4",
      suggestions: "",
      "price to competitors": "Not sure",
      price: "correct",
      pricelimit: {
        mostamount: 450,
        leastamount: 200,
      },
      email: "jon.snow@nightwatch.org",
    };
    return {
      survey: model,
    };
  },

  mounted() {},

  methods: {
    getData(survey){
        console.log(this.survey.data);
        console.log('5555');
    },
    saveToPdf() {
    //   saveSurveyToPdf("surveyResult.pdf", this.survey, 595 * 2, 792 * 2);
     console.log(this.survey.data);
    }
  },
};
</script>

<style lang="scss" scoped></style>
