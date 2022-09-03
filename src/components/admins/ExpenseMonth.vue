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
                  <div class="card-header bg-danger shadow">
                    <h5 class="text-light text-center">สรุปรายจ่าย / เดือน</h5>
                  </div>
                  <i class="fas fa-wallet mt-4 text-danger" style="font-size:50px"></i>
                  <h4 class="card-text my-4 text-danger text-center">
                    จำนวน {{ expensesTotal }} บาท
                  </h4>

                  <div class="card-header bg-danger shadow">
                    <h5 class="text-light text-center"></h5>
                  </div>
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
      <template slot="table-row" slot-scope="props">
        <span v-if="props.column.field == 'detail'">
          <div
            class="btn btn-success"
            data-toggle="modal"
            data-target="#detailModal"
            @click="expensesDetail(props.row)"
          >
            <i class="fa-solid fa-file-circle-plus"></i>
          </div>
        </span>
      </template>
      </vue-good-table>
    </div>

    <!--Start Modal AddCourse -->
    <div class="modal fade" id="detailModal">
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <!-- Modal Header -->
          <div class="modal-header text-center">
            <h4 class="modal-title w-100 text-center text-success">รายจ่าย</h4>
            <button type="button" class="close" data-dismiss="modal">
              &times;
            </button>
          </div>

          <!-- Modal body -->
          <div class="modal-body">
            <vue-good-table
              :columns="detailsColumns"
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
    <!--End Modal AddCourse -->
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
      detailsColumns: [
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
      columns: [
        {
          label: "วันที่",
          field: "docId",
          type: "text",
        },
        {
          label: "รวม",
          field: "dayTotal",
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
          label: "เพิ่มเติม",
          field: "detail",
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
  computed: {
    expensesTotal() {
      var total = this.expenseLists.reduce((accumulator, item) => {
        return accumulator + parseInt(item.dayTotal);
      }, 0);
      return Number(total).toLocaleString();
    },
  },

  methods: {
    expensesDetail(docId) {
      this.expenseList = docId;
    },
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
              expenseList.dayTotal = expenseList.utilities + expenseList.device + expenseList.teaching + expenseList.office
              + expenseList.advertise + expenseList.teachEarn + expenseList.employeeEarn + expenseList.welfare 
              + expenseList.service + expenseList.bankfee + expenseList.otherfee + expenseList.security
              + expenseList.forrent + expenseList.maintenance + expenseList.wagesWorker + expenseList.activity
              + expenseList.travel + expenseList.test + expenseList.instrument 
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
              expenseList.dayTotal = expenseList.utilities + expenseList.device + expenseList.teaching + expenseList.office
              + expenseList.advertise + expenseList.teachEarn + expenseList.employeeEarn + expenseList.welfare 
              + expenseList.service + expenseList.bankfee + expenseList.otherfee + expenseList.security
              + expenseList.forrent + expenseList.maintenance + expenseList.wagesWorker + expenseList.activity
              + expenseList.travel + expenseList.test + expenseList.instrument 
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
