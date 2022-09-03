<template>
  <div id="balanceMonth">
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
            <div class="col-md-12 text-center">
                <div class="card-deck">
              <div class="card">
                <div class="card-body">
                  <div class="card-header bg-success shadow">
                    <h5 class="text-light text-center">สรุปรายรับ - เดือน</h5>
                  </div>
                  <i class="fas fa-file-invoice-dollar mt-4  text-success" style="font-size:50px"></i>
                  <h4 class="card-text my-4 text-primary text-center">
                    จำนวน {{ sumTotal }} บาท
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

              <div class="card">
                <div class="card-body">
                  <div class="card-header bg-danger shadow">
                    <h5 class="text-light text-center">สรุปรายจ่าย - เดือน</h5>
                  </div>
                  <i class="fas fa-wallet mt-4 text-danger" style="font-size:50px"></i>
                  <h4 class="card-text my-4 text-danger text-center">
                    จำนวน {{ expenseTotal }} บาท
                  </h4>

                  <div class="bg- shadow">
                    <button
                      to="/user/withdrawWeb"
                      class="btn btn-danger btn-block text-light"
                      data-toggle="modal"
                      data-target="#expenseModal"
                    >
                      ดูข้อมูล
                    </button>
                  </div>
                </div>
              </div>

              <div class="card">
                <div class="card-body">
                  <div class="card-header bg-dark shadow">
                    <h5 class="text-light text-center">คงเหลือ</h5>
                  </div>
                 <i class="fa-sharp fa-solid fa-sack-dollar mt-4 text-warning" style="font-size:50px"></i>
                  <h4 class="card-text my-4 text-dark text-center" >
                    จำนวน {{ balance }} บาท
                  </h4>

                  <div class="card-header bg-dark shadow">
                    <h5 class="text-light text-center"></h5>
                  </div>
                </div>
              </div>
            </div>
            </div>
        </div>
      </div>

      <div class="mt-3 shadow"></div>
    </div>

    <!--Start Income  Modal -->
    <div class="modal fade" id="incomeModal">
      <div class="modal-dialog modal-lg modal-dialog-scrollable">
        <div class="modal-content">
          <!-- Modal Header -->
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">
              &times;
            </button>
          </div>

          <!-- Modal body -->
          <div class="modal-body">
            <div class="table-responsive">
                  <table class="table table-bordered table-striped text-center">
                    <thead class="thead-light">
                      <tr>
                        <th>รายรับ</th>
                        <th>จำนวนเงิน</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>ค่าคอร์สเรียน</td>
                        <td><h5 class="text-success">{{ classPriceTotal }}</h5> </td>
                      </tr>

                      <tr>
                        <td>ค่าหนังสือ</td>
                        <td><h5 class="text-success">{{ bookTotal }}</h5> </td>
                      </tr>

                      <tr>
                        <td>ค่าอุปกรณ์ดนตรี</td>
                        <td><h5 class="text-success">{{ instrumentTotal }}</h5> </td>
                      </tr>

                      <tr>
                        <td>ค่าอุปกรณ์ดนตรี</td>
                        <td><h5 class="text-success">{{ equipmentTotal }}</h5> </td>
                      </tr>

                      <tr>
                        <td>ค่าแรกเข้า</td>
                        <td><h5 class="text-success">{{ feeTotal }}</h5> </td>
                      </tr>

                      <tr>
                        <td>รายได้อื่นๆ</td>
                        <td><h5 class="text-success">{{ otherTotal }}</h5> </td>
                      </tr>

                      <tr>
                        <td>ค่าสอบ</td>
                        <td><h5 class="text-success">{{ examTotal }}</h5> </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
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

    <!--Start Expenses  Modal -->
    <div class="modal fade" id="expenseModal">
      <div class="modal-dialog modal-lg modal-dialog-scrollable">
        <div class="modal-content">
          <!-- Modal Header -->
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">
              &times;
            </button>
          </div>

          <!-- Modal body -->
          <div class="modal-body">
            <div class="table-responsive">
                  <table class="table table-bordered table-striped text-center">
                    <thead class="thead-light">
                      <tr>
                        <th>รายจ่าย</th>
                        <th>จำนวนเงิน</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>สาธารณูปโภค</td>
                        <td><h5 class="text-success">{{ utilitiesTotal }}</h5> </td>
                      </tr>

                      <tr>
                        <td>ค่าเครื่องเขียน</td>
                        <td><h5 class="text-success">{{ deviceTotal }}</h5> </td>
                      </tr>

                      <tr>
                        <td>ค่าอุปกรณ์การสอน</td>
                        <td><h5 class="text-success">{{ teachingTotal }}</h5> </td>
                      </tr>

                      <tr>
                        <td>ค่าเครื่องใช้สำนักงาน</td>
                        <td><h5 class="text-success">{{ officeTotal }}</h5> </td>
                      </tr>

                      <tr>
                        <td>ค่าโฆษณา</td>
                        <td><h5 class="text-success">{{ advertiseTotal }}</h5> </td>
                      </tr>

                      <tr>
                        <td>ค่าสอนครู</td>
                        <td><h5 class="text-success">{{ teachEarnTotal }}</h5> </td>
                      </tr>

                      <tr>
                        <td>เงินเดือนเจ้าหน้าที่</td>
                        <td><h5 class="text-success">{{ employeeEarnTotal }}</h5> </td>
                      </tr>
                        <!--  -->
                      <tr>
                        <td>ค่าสวัสดิการครู/เจ้าหน้าที่</td>
                        <td><h5 class="text-success">{{ welfareTotal }}</h5> </td>
                      </tr>

                      <tr>
                        <td>ค่าธรรมเนียมธนาคาร</td>
                        <td><h5 class="text-success">{{ bankfeeTotal }}</h5> </td>
                      </tr>

                      <tr>
                        <td>ค่าธรรมเนียมอื่นๆ</td>
                        <td><h5 class="text-success">{{ otherfeeTotal }}</h5> </td>
                      </tr>

                      <tr>
                        <td>ค่าเงินประกัน</td>
                        <td><h5 class="text-success">{{ securityTotal }}</h5> </td>
                      </tr>

                      <tr>
                        <td>ค่าค่าเช่า</td>
                        <td><h5 class="text-success">{{ forrentTotal }}</h5> </td>
                      </tr>

                      <tr>
                        <td>ค่าซ่อมบำรุง</td>
                        <td><h5 class="text-success">{{ maintenanceTotal }}</h5> </td>
                      </tr>

                      <tr>
                        <td>ค่าจ้างแรงงานทั่วไปรายครั้ง</td>
                        <td><h5 class="text-success">{{ wagesWorkerTotal }}</h5> </td>
                      </tr>

                      <tr>
                        <td>ค่ากิจกรรม/คอนเสิร์ต</td>
                        <td><h5 class="text-success">{{ activityTotal }}</h5> </td>
                      </tr>

                      <tr>
                        <td>ค่าเดินทาง</td>
                        <td><h5 class="text-success">{{ travelTotal }}</h5> </td>
                      </tr>

                      <tr>
                        <td>ค่าสอบเกรด</td>
                        <td><h5 class="text-success">{{ testTotal }}</h5> </td>
                      </tr>

                      <tr>
                        <td>ค่าเครื่องดนตรี</td>
                        <td><h5 class="text-success">{{ instrumentTotal }}</h5> </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
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
    <!--End Expense  Modal -->
  </div>
</template>

<script>
import { db } from "../../firebase";
import DateRangePicker from "vue2-daterange-picker";
//you need to import the CSS manually
import "vue2-daterange-picker/dist/vue2-daterange-picker.css";
import moment from "moment";
export default {
  name: "balanceMonth",

  data() {
    return {
        monthSelect: null,
        Items: [],
        expenseLists: [],
        sumTotal : null,
        expenseTotal : null,
        balance : null,
    };
  },

  methods: {
    async getIncomeData() {
      try {
        let myYear = moment().year();
        let myMonth = moment().month() + 1;
        await db
          .collection("summarize")
          .where("invMonth", "==", myMonth)
          .where("invYear", "==", myYear)
          .onSnapshot((querySnapshot) => {
            this.Items = [];
            querySnapshot.forEach((doc) => {
              let Item = {
                docId: doc.id,
                book: doc.data().book,
                classPriceTotal: doc.data().classPriceTotal,
                courseTotal: doc.data().courseTotal,
                equipmentTotal: doc.data().equipmentTotal,
                examTotal: doc.data().examTotal,
                fee: doc.data().fee,
                instrumentTotal: doc.data().instrumentTotal,
                invDayOfMonth: doc.data().invDayOfMonth,
                invMonth: doc.data().invMonth,
                invYear: doc.data().invYear,
                otherTotal: doc.data().otherTotal,
                sumTotal: doc.data().sumTotal,
              };
              // Item.fullDate = `${invDayOfMonth}/${invMonth}/${invYear}`
              this.Items.push(Item);
              // console.log(this.Items);
              this.summarizeInvoice(this.Items)
            });
          });
      } catch (err) {
        console.log(err);
      }
    },

    async getExpenseData(){
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
              this.summarizeExpenses(this.expenseLists)
            });
          });
      } catch (err) {
        console.log(err);
      }
    },
    summarizeExpenses(expenseLists){
        var expenseTotal = expenseLists.reduce((acc, item) => {
        return (
          acc +
          parseInt(item.dayTotal)
        );
      }, 0);
      this.expenseTotal = expenseTotal
      this.balance = this.sumTotal -  this.expenseTotal
    //   this.expenseTotal = Number(expenseTotal).toLocaleString();
    },
    
    summarizeInvoice(invoices) {

      var sumTotal = invoices.reduce((acc, item) => {
        return (
          acc +
          parseInt(item.sumTotal)
        );
      }, 0);

    //   this.sumTotal = Number(sumTotal).toLocaleString();
    this.sumTotal = sumTotal
    //   result.monthlyDay = `${result.invYear}-0${result.invMonth}`;
    },
  },

  created() {
    this.getIncomeData();
    this.getExpenseData();
    window.scrollTo(0, 0);
  },

  computed:{
    utilitiesTotal() {
      var total = this.expenseLists.reduce((accumulator, item) => {
        return accumulator + item.utilities
      }, 0);
      return Number(total).toLocaleString();
    },

    deviceTotal() {
      var total = this.expenseLists.reduce((accumulator, item) => {
        return accumulator + item.device
      }, 0);
      return Number(total).toLocaleString();
    },

    teachingTotal() {
      var total = this.expenseLists.reduce((accumulator, item) => {
        return accumulator + item.teaching
      }, 0);
      return Number(total).toLocaleString();
    },

    officeTotal() {
      var total = this.expenseLists.reduce((accumulator, item) => {
        return accumulator + item.office
      }, 0);
      return Number(total).toLocaleString();
    },

    advertiseTotal() {
      var total = this.expenseLists.reduce((accumulator, item) => {
        return accumulator + item.advertise
      }, 0);
      return Number(total).toLocaleString();
    },

    teachEarnTotal() {
      var total = this.expenseLists.reduce((accumulator, item) => {
        return accumulator + item.teachEarn
      }, 0);
      return Number(total).toLocaleString();
    },

     employeeEarnTotal() {
      var total = this.expenseLists.reduce((accumulator, item) => {
        return accumulator + item.employeeEarn
      }, 0);
      return Number(total).toLocaleString();
    },

    teachEarnTotal() {
      var total = this.expenseLists.reduce((accumulator, item) => {
        return accumulator + item.teachEarn
      }, 0);
      return Number(total).toLocaleString();
    },

    welfareTotal() {
      var total = this.expenseLists.reduce((accumulator, item) => {
        return accumulator + item.welfare
      }, 0);
      return Number(total).toLocaleString();
    },

    bankfeeTotal() {
      var total = this.expenseLists.reduce((accumulator, item) => {
        return accumulator + item.bankfee
      }, 0);
      return Number(total).toLocaleString();
    },

    otherfeeTotal() {
      var total = this.expenseLists.reduce((accumulator, item) => {
        return accumulator + item.otherfee
      }, 0);
      return Number(total).toLocaleString();
    },

    securityTotal() {
      var total = this.expenseLists.reduce((accumulator, item) => {
        return accumulator + item.security
      }, 0);
      return Number(total).toLocaleString();
    },

    forrentTotal() {
      var total = this.expenseLists.reduce((accumulator, item) => {
        return accumulator + item.forrent
      }, 0);
      return Number(total).toLocaleString();
    },

    maintenanceTotal() {
      var total = this.expenseLists.reduce((accumulator, item) => {
        return accumulator + item.maintenance
      }, 0);
      return Number(total).toLocaleString();
    },

    wagesWorkerTotal() {
      var total = this.expenseLists.reduce((accumulator, item) => {
        return accumulator + item.wagesWorker
      }, 0);
      return Number(total).toLocaleString();
    },

    activityTotal() {
      var total = this.expenseLists.reduce((accumulator, item) => {
        return accumulator + item.activity
      }, 0);
      return Number(total).toLocaleString();
    },

    travelTotal() {
      var total = this.expenseLists.reduce((accumulator, item) => {
        return accumulator + item.travel
      }, 0);
      return Number(total).toLocaleString();
    },

    testTotal() {
      var total = this.expenseLists.reduce((accumulator, item) => {
        return accumulator + item.test
      }, 0);
      return Number(total).toLocaleString();
    },

    instrumentTotal() {
      var total = this.expenseLists.reduce((accumulator, item) => {
        return accumulator + item.instrument
      }, 0);
      return Number(total).toLocaleString();
    },

    // ------------------------------------- //
    classPriceTotal() {
      var total = this.Items.reduce((accumulator, item) => {
        return accumulator + item.classPriceTotal
      }, 0);
      return Number(total).toLocaleString();
    },

    bookTotal() {
      var total = this.Items.reduce((accumulator, item) => {
        return accumulator + item.book
      }, 0);
      return Number(total).toLocaleString();
    },

    instrumentTotal() {
      var total = this.Items.reduce((accumulator, item) => {
        return accumulator + item.instrumentTotal
      }, 0);
      return Number(total).toLocaleString();
    },

    equipmentTotal() {
      var total = this.Items.reduce((accumulator, item) => {
        return accumulator + item.equipmentTotal
      }, 0);
      return Number(total).toLocaleString();
    },

    feeTotal() {
      var total = this.Items.reduce((accumulator, item) => {
        return accumulator + item.fee
      }, 0);
      return Number(total).toLocaleString();
    },

    otherTotal() {
      var total = this.Items.reduce((accumulator, item) => {
        return accumulator + item.otherTotal
      }, 0);
      return Number(total).toLocaleString();
    },

    examTotal() {
      var total = this.Items.reduce((accumulator, item) => {
        return accumulator + item.examTotal
      }, 0);
      return Number(total).toLocaleString();
    },
  }
};
</script>

<style lang="scss" scoped></style>
