<template>
  <div id="expenseMonth">
    <div class="container-fluid">
      <div class="">
        <h4 class="text-center text-success mb-4 mt-3">สรุป รายจ่าย / เดือน</h4>
        <div class="row">
          <div class="col-md-4"></div>
          <div class="col-md-4">
            <div class="form-group mt-2">
              <input
                type="month"
                class="form-control"
                v-model="monthSelect"
                @change="getDatetest()"
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
                    <h5 class="text-light text-center">รายจ่าย</h5>
                  </div>
                  <h6 class="card-text mt-4 text-primary text-center">
                    <h6 class="text-dark">รายรับช่วงวันที่</h6>
                    {{ pickerDates.startDate | date }} -
                    {{ pickerDates.endDate | date }}
                  </h6>
                  <h4 class="card-text my-4 text-primary text-center">
                    จำนวน {{ incomeTotal }} บาท
                  </h4>

                  <div class="bg- shadow">
                    <button
                      to="/user/withdrawWeb"
                      class="btn btn-success btn-block text-light"
                      data-toggle="modal"
                      data-target="#incomeModal"
                    >
                      ดูข้อมูล
                    </button>
                  </div>
                  <div></div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-4"></div>
        </div>
      </div>

      <div class="mt-3 shadow"></div>
    </div>

    <div class="mt-3 shadow">
      <vue-good-table
        :columns="columns"
        :rows="expenseLists"
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
      </vue-good-table>
    </div>
  </div>
</template>

<script>
import { db } from "../../firebase";
import DateRangePicker from "vue2-daterange-picker";
//you need to import the CSS manually
import "vue2-daterange-picker/dist/vue2-daterange-picker.css";
import moment from "moment";
export default {
  name: "expenseMonth",

  data() {
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 6);
    return {
        columns: [
        {
          label: "วันที่",
          field: "docId",
          type: "text",
        },
        {
          label: "รวม",
          field: "sumTotal",
          type: "number",
        },
        {
          label: "สาธารณูปโภค",
          field: "utilities",
          type: "number",
        },
        {
          label: "เครื่องเขียน",
          field: "device",
          type: "number",
        },
        {
          label: "อุปกรณ์การสอน",
          field: "teaching",
          type: "number",
        },
        {
          label: "เครื่องใช้สำนักงาน",
          field: "office",
          type: "number",
        },
        {
          label: "โฆษณา",
          field: "advertise",
          type: "number",
        },
        {
          label: "ค่าสอนครู",
          field: "teachEarn",
          type: "number",
        },

        {
          label: "เงินเดือนเจ้าหน้าที่",
          field: "employeeEarn",
          type: "number",
        },
        {
          label: "สวัสดิการครู/เจ้าหน้าที่",
          field: "welfare",
          type: "number",
        },
        {
          label: "ค่ารับรอง",
          field: "service",
          type: "number",
        },
        {
          label: "ธรรมเนียมธนาคาร",
          field: "bankfee",
          type: "number",
        },
        {
          label: "ธรรมเนียมอื่นๆ",
          field: "otherfee",
          type: "number",
        },
        {
          label: "เงินประกัน",
          field: "security",
          type: "number",
        },
        {
          label: "ค่าเช่า",
          field: "forrent",
          type: "number",
        },
        {
          label: "ค่าซ่อมบำรุง",
          field: "maintenance",
          type: "number",
        },

        {
          label: "ค่าจ้างแรงงานทั่วไปรายครั้ง",
          field: "wagesWorker",
          type: "number",
        },
        {
          label: "กิจกรรม/คอนเสิร์ต",
          field: "activity",
          type: "number",
        },
        {
          label: "ค่าเดินทาง",
          field: "travel",
          type: "number",
        },
        {
          label: "สอบเกรด",
          field: "test",
          type: "number",
        },
        {
          label: "ค่าเครื่องดนตรี",
          field: "instrument",
          type: "number",
        },
      ],
      pickerDates: {
        startDate,
        endDate,
      },

      monthSelect: null,
      expenseLists: [],
      expenseList: {},
    };
  },
  
  methods: {
    async getDatetest() {
      console.log(this.monthSelect);
      try {
        await db
          .collection("summarizeExpense")
          .where("monthlyDay", "==", this.monthSelect)
          // .where("invYear", "==", myYear)
          .onSnapshot((querySnapshot) => {
            this.expenseLists = [];
            querySnapshot.forEach((doc) => {
              let expenseList = {
                docId: doc.id,

                utilities: doc.data().utilities,
                device: doc.data().device,
                teaching: doc.data().teaching,
                office: doc.data().office,
                advertise: doc.data().advertise,
                teachEarn: doc.data().teachEarn,
                employeeEarn: doc.data().employeeEarn,
                welfare: doc.data().welfare,
                service: doc.data().service,
                bankfee: doc.data().bankfee,

                otherfee: doc.data().otherfee,
                security: doc.data().security,
                forrent: doc.data().forrent,
                maintenance: doc.data().maintenance,
                wagesWorker: doc.data().wagesWorker,
                activity: doc.data().activity,
                travel: doc.data().travel,
                test: doc.data().test,
                instrument: doc.data().instrument,

                invDayOfMonth: doc.data().invDayOfMonth,
                invMonth: doc.data().invMonth,
                invYear: doc.data().invYear,
        
                // sumTotal: doc.data().sumTotal,
              };
              this.expenseLists.push(expenseList);
              // this.testTotal();
              console.log(this.expenseLists);
            });
          });
      } catch (err) {
        console.log(err);
      }
    },

    async getData() {
      try {
        let myYear = moment().year();
        let myMonth = moment().month() + 1;
        await db
          .collection("summarizeExpense")
          .where("invMonth", "==", myMonth)
          .where("invYear", "==", myYear)
          .onSnapshot((querySnapshot) => {
            this.expenseLists = [];
            querySnapshot.forEach((doc) => {
              let expenseList = {
                docId: doc.id,

                utilities: doc.data().utilities,
                device: doc.data().device,
                teaching: doc.data().teaching,
                office: doc.data().office,
                advertise: doc.data().advertise,
                teachEarn: doc.data().teachEarn,
                employeeEarn: doc.data().employeeEarn,
                welfare: doc.data().welfare,
                service: doc.data().service,
                bankfee: doc.data().bankfee,

                otherfee: doc.data().otherfee,
                security: doc.data().security,
                forrent: doc.data().forrent,
                maintenance: doc.data().maintenance,
                wagesWorker: doc.data().wagesWorker,
                activity: doc.data().activity,
                travel: doc.data().travel,
                test: doc.data().test,
                instrument: doc.data().instrument,

                invDayOfMonth: doc.data().invDayOfMonth,
                invMonth: doc.data().invMonth,
                invYear: doc.data().invYear,
              };
              this.expenseLists.push(expenseList);
            });
          });
      } catch (err) {
        console.log(err);
      }
    },
  },
  filters: {
    date(date) {
      return new Intl.DateTimeFormat("th-TH").format(date);
    },
  },

  mounted() {
    this.getData();
    window.scrollTo(0, 0);
  },
};
</script>

<style lang="scss" scoped></style>
