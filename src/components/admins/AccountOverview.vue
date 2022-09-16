<template>
  <div id="transaction" class="">
    <div class="container-fluid">
      <div class="">
        <h5 class="text-center text-success mb-4 mt-3">
         สรุป รายรับ - รายจ่าย ทั้งหมด
        </h5>
        <div class="row">
          <div class="col-md-12 mb-3">
            <router-link
              to="/admin/account/expense"
              class="btn btn-success d-inline-block float-right px-3"
              data-toggle="modal"
              data-target="#modal1"
            >
              บันทึกค่าใช้จ่าย
            </router-link>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <div class="card-deck">
              <div class="card">
                <div class="card-body">
                  <div class="card-header bg-success shadow">
                    <h5 class="text-light text-center">รายรับทั้งหมด</h5>
                  </div>
                  <i
                    class="fas fa-file-invoice-dollar mt-4 text-success"
                    style="font-size: 50px"
                  ></i>
                  <h4 class="card-text my-4 text-primary text-center">
                    จำนวน {{ incomeTotal | number("0,0") }} บาท
                  </h4>

                  <div class="bg- shadow">
                    <button
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
                    <h5 class="text-light text-center">รายจ่ายทั้งหมด</h5>
                  </div>
                  <i
                    class="fas fa-wallet mt-4 text-danger"
                    style="font-size: 50px"
                  ></i>
                  <h4 class="card-text my-4 text-danger text-center">
                    จำนวน {{ expenseTotal | number("0,0") }} บาท
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
                  <i
                    class="fa-sharp fa-solid fa-sack-dollar mt-4 text-warning"
                    style="font-size: 50px"
                  ></i>
                  <h4 class="card-text my-4 text-dark text-center">
                    จำนวน {{ balance | number("0,0") }} บาท
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
      <div class="modal-dialog modal-xl modal-dialog-scrollable">
        <div class="modal-content">
          <!-- Modal Header -->
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">
              &times;
            </button>
          </div>

          <!-- Modal body -->
          <div class="modal-body">
            <vue-good-table
              :columns="columns"
              :rows="invoiceData"
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
                <span v-if="props.column.field == 'edit'">
                  <div
                    class="btn btn-warning"
                    @click="editProduct(props.row)"
                    data-toggle="modal"
                    data-target="#product"
                  >
                    แก้ไข
                  </div>
                </span>
                <!-- @click="deleteProduct(props.row.pID)" -->

                <span v-else-if="props.column.field == 'detail'">
                  <div
                    class="btn btn-success"
                    data-toggle="modal"
                    data-target="#detailModal"
                    @click="invoiceDetail(props.row)"
                  >
                    <i class="fa-solid fa-file-circle-plus"></i>
                  </div>
                </span>
                <span v-else>
                  {{ props.formattedRow[props.column.field] }}
                </span>
              </template>
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
            <button
              @click="addProduct()"
              type="button"
              class="btn btn-success"
              v-if="modal == 'new'"
            >
              บันทึกสินค้า
            </button>
            <button
              @click="updateProduct(product.pID)"
              type="button"
              class="btn btn-warning"
              v-if="modal == 'edit'"
            >
              แก้ไข
            </button>
          </div>
        </div>
      </div>
    </div>
    <!--End Income  Modal -->

    <!--Start Expense  Modal -->
    <div class="modal fade" id="expenseModal">
      <div class="modal-dialog modal-xl modal-dialog-scrollable">
        <div class="modal-content">
          <!-- Modal Header -->
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">
              &times;
            </button>
          </div>

          <!-- Modal body -->
          <div class="modal-body">
            <vue-good-table
              :columns="expenseColumns"
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
                <span v-if="props.column.field == 'edit'">
                  <div
                    class="btn btn-warning"
                    @click="editExpense(props.row)"
                    data-toggle="modal"
                    data-target="#modal1"
                  >
                    <i class="fas fa-edit"></i>
                  </div>
                </span>
                <span v-else-if="props.column.field == 'delete'">
                  <div
                    class="btn btn-danger"
                    @click="deleteExpense(props.row.docId)"
                  >
                    <i class="fas fa-trash-alt"></i>
                  </div>
                </span>
                <span v-else>
                  {{ props.formattedRow[props.column.field] }}
                </span>
              </template>
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
    <!--End Income  Modal -->

    <!-- Start Detail modal -->
    <div class="modal fade" id="detailModal">
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <!-- Modal Header -->
          <div class="modal-header text-center">
            <h4 class="modal-title w-100 text-center text-success">
              รายละเอียดใบชำระเงิน
            </h4>
            <button type="button" class="close" data-dismiss="modal">
              &times;
            </button>
          </div>

          <!-- Modal body -->
          <div class="modal-body">
            <!--Start แสดงเพื่อ ดูรายลเอียดอย่างเดียว set modal = null -->
            <div>
              <div class="py-3" style="border: 1px solid green">
                <h5 class="text-center text-success mt-3">วิชาเรียน</h5>
                <h6 class="ml-3 mt-3 text-success float-left">
                  เพื่อชำระค่าเรียน (Payment for tuition)
                </h6>
                <div class="form-check-inline ml-3 float-left">
                  <label class="form-check-label" for="">
                    <input
                      type="radio"
                      class="form-check-input"
                      id=""
                      name=""
                      value="ลงทะเบียนใหม่"
                      checked
                      v-model.trim="billingDetail.paymentType"
                      disabled
                    />ลงทะเบียนใหม่
                  </label>
                </div>
                <div class="form-check-inline">
                  <label class="form-check-label" for="radio2">
                    <input
                      type="radio"
                      class="form-check-input"
                      id=""
                      name=""
                      value="ต่อคอร์ส"
                      v-model.trim="billingDetail.paymentType"
                      disabled
                    />ต่อคอร์สเรียน
                  </label>
                </div>
                <div class="table-responsive">
                  <table class="table table-bordered table-striped text-center">
                    <thead class="thead-light">
                      <tr>
                        <th>วิชา</th>
                        <th>จำนวน</th>
                        <th>ค่าเรียน/คอร์ส</th>
                        <th>ส่วนลด</th>
                        <th>รวม</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="course in billingDetail.courseDetail"
                        :key="course.docId"
                        class="text-center"
                      >
                        <td>{{ course.courseName }}</td>
                        <td>{{ course.classQty }}</td>
                        <td>{{ course.rate }}</td>
                        <td>{{ course.classDiscount }}</td>
                        <td>
                          {{
                            course.classQty * course.rate - course.classDiscount
                          }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div class="py-3 my-2" style="border: 1px solid green">
                <h5 class="text-center text-success mt-3">หนังสือ - อุปกรณ์</h5>
                <h6 class="ml-3 mt-3 text-success">เพื่อชำระ (Payment for)</h6>
                <div class="row mx-auto">
                  <div class="col-md-3">
                    <div class="form-check-inline">
                      <label class="form-check-label">
                        <input
                          type="checkbox"
                          class="form-check-input"
                          value="หนังสือเรียน"
                          v-model.trim="billingDetail.paymentFor"
                          disabled
                        />หนังสือเรียน
                      </label>
                    </div>
                  </div>
                  <div class="col-md-3">
                    <div class="form-check-inline">
                      <label class="form-check-label">
                        <input
                          type="checkbox"
                          class="form-check-input"
                          value="อุปกรณ์การเรียน"
                          v-model.trim="billingDetail.paymentFor"
                          disabled
                        />อุปกรณ์การเรียน
                      </label>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="input-group mb-3">
                      <div class="input-group-prepend">
                        <div class="input-group-text">
                          <input
                            type="checkbox"
                            value="อื่นๆ"
                            v-model.trim="billingDetail.paymentFor"
                            disabled
                          />
                        </div>
                      </div>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="กรอกรายการชำระ"
                        v-model.trim="billingDetail.payforDetail"
                        disabled
                      />
                    </div>
                  </div>
                </div>

                <div class="table-responsive">
                  <table class="table table-bordered table-striped text-center">
                    <thead class="thead-light">
                      <tr>
                        <th>สินค้า</th>
                        <th>จำนวน</th>
                        <th>ราคา/หน่วย</th>
                        <th>ส่วนลด</th>
                        <th>รวม</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, index) in carts" :key="index">
                        <td>{{ item.pName }}</td>
                        <td>{{ item.buyAmount }}</td>
                        <td>{{ item.price }}</td>
                        <td>{{ item.pDiscount }}</td>
                        <td>
                          {{ item.buyAmount * item.price - item.pDiscount }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div class="py-3" style="border: 1px solid green">
                <h5 class="text-center text-success mt-3">สรุปยอด</h5>
                <div class="row mx-auto">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="usr" class="text-success"
                        >ค่าแรกเข้า (Enrollment fee)
                      </label>
                      <input
                        type="number"
                        class="form-control"
                        id="usr"
                        min="0"
                        v-model.trim="billingDetail.fee"
                        disabled
                      />
                    </div>
                  </div>
                </div>
                <div class="table-responsive">
                  <table class="table table-bordered table-striped text-center">
                    <thead class="thead-light">
                      <tr>
                        <th>(1)รวมค่าเรียน</th>
                        <th>(2)ค่าหนังสือหรืออุปกรณ์</th>
                        <th>ค่าแรกเข้า</th>
                        <th>รวมจำนวนเงินทั้งสิ้น</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{{ subTotal }}</td>
                        <td>{{ pSubtotal }}</td>
                        <td>{{ billingDetail.fee }}</td>
                        <td>{{ grandTotal }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h6 class="ml-3 text-success">ชำระเงินโดย (Pay By)</h6>
                <div class="row mx-auto">
                  <div class="col-md-3">
                    <div class="form-check-inline">
                      <label class="form-check-label">
                        <input
                          type="checkbox"
                          class="form-check-input"
                          value="เงินสด"
                          v-model.trim="billingDetail.payBy"
                          disabled
                        />เงินสด
                      </label>
                    </div>
                  </div>
                  <div class="col-md-3">
                    <div class="form-check-inline">
                      <label class="form-check-label">
                        <input
                          type="checkbox"
                          class="form-check-input"
                          value="เครดิตการ์ด"
                          v-model.trim="billingDetail.payBy"
                          disabled
                        />เครดิตการ์ด
                      </label>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <!-- โอนผ่านธนาคาร -->
                    <div class="input-group mb-3">
                      <div class="input-group-prepend">
                        <div class="input-group-text">
                          <input
                            type="checkbox"
                            value="โอนผ่านธนาคาร"
                            v-model.trim="billingDetail.payBy"
                            disabled
                          />
                        </div>
                      </div>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="โอนผ่านบัญชีธนาคาร"
                        v-model.trim="billingDetail.bankDetail"
                        disabled
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group mt-2">
                      <label for="usr" class="text-success">หมายเหตุ </label>
                      <input
                        type="text"
                        class="form-control"
                        id="usr"
                        v-model.trim="billingDetail.note"
                        disabled
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group mt-2">
                      <label for="usr" class="text-success"
                        >วัน-เวลาที่ทำธุรกรรม
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        v-model="billingDetail.transactionTime"
                        disabled
                      />
                    </div>
                    <!-- {{item.transactionTime}} -->
                  </div>
                  <!-- v-if="modal == 'edit'" -->
                  <!-- <div class="col-md-12">
                      <div class="form-group">
                        <label for="comment" class="text-danger"
                          >***รายละเอียดการแก้ไข</label
                        >
                        <textarea
                          disabled
                          class="form-control"
                          rows="5"
                          id="comment"
                          placeholder='ใส่รายละเอียดการแก้ "แก้ไขอะไรไปบ้าง" '
                          v-model.trim="editDetail"
                        ></textarea>
                      </div>
                    </div> -->
                </div>
              </div>
            </div>
            <!--End แสดงเพื่อ ดูรายลเอียดอย่างเดียว set modal = null -->
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
  </div>
</template>

<script>
import { fb, db } from "../../firebase";
import DateRangePicker from "vue2-daterange-picker";
//you need to import the CSS manually
import "vue2-daterange-picker/dist/vue2-daterange-picker.css";
import moment from "moment";

export default {
  name: "addProduct",
  components: { DateRangePicker },
  data() {
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 6);
    return {
      pickerDates: {
        startDate,
        endDate,
      },
      expenseColumns: [
        {
          label: "วันที่ - เวลา",
          field: "datetime",
          type: "text",
        },
        {
          label: "ประเภท",
          field: "type",
          type: "text",
        },
        {
          label: "รายการ",
          field: "list",
          type: "text",
        },
        {
          label: "จำนวนเงิน",
          field: "amount",
          type: "text",
        },
      ],

      columns: [
        {
          label: "รหัสนักเรียน",
          field: "studentId",
          type: "text",
        },
        {
          label: "ชื่อ",
          field: "firstName",
          type: "text",
        },
        {
          label: "นามสกุล",
          field: "lastName",
          type: "text",
        },
        {
          label: "ชื่อเล่น",
          field: "nickName",
          type: "text",
        },
        {
          label: "ชำระโดย",
          field: "payBy",
          type: "text",
        },
        {
          label: "inv.no",
          field: "invoiceNo",
          type: "text",
        },
        {
          label: "วันที่",
          field: "invoiceTime",
          type: "text",
        },
        {
          label: "จำนวน",
          field: "grandTotal",
          type: "text",
        },
        {
          label: "รายละเอียด",
          field: "detail",
          type: "text",
        },
      ],

      products: [],
      product: {
        pName: null,
        pCode: null,
        cost: null,
        price: null,
        quantity: null,
      },

      modal: null,
      expenseLists: [],
      invoiceData: [],
      billingDetail: {},
      carts: [],
      sumCourse: [],

      userStatus: null,
    };
  },

  methods: {
    invoiceDetail(detail) {
      this.billingDetail = detail;
      this.carts = detail.productDetail;
      this.sumCourse = detail.courseDetail;
    },

    getExpenseLists() {
      db.collection("expenseTable")
        .orderBy("timeStamp", "desc")
        .onSnapshot((querySnapshot) => {
          this.expenseLists = [];
          querySnapshot.forEach((doc) => {
            let expenseList = {
              date: doc.data().date,
              datetime: doc.data().datetime,
              type: doc.data().type,
              list: doc.data().list,
              amount: doc.data().amount,
              docId: doc.id,
            };
            this.expenseLists.push(expenseList);
            console.log(this.expenseLists);
          });
        });
    },

    getData() {
      db.collection("invoiceData")
        .orderBy("invoiceNo", "desc")
        .onSnapshot((querySnapshot) => {
          this.invoiceData = [];
          querySnapshot.forEach((doc) => {
            let billingDetail = {
              uid: doc.data().uid,
              bankDetail: doc.data().bankDetail,
              studentId: doc.data().studentId,
              firstName: doc.data().firstName,
              lastName: doc.data().lastName,
              nickName: doc.data().nickName,
              invoiceNo: doc.data().invoiceNo,
              paymentType: doc.data().paymentType,
              courseDetail: doc.data().courseDetail,
              productDetail: doc.data().productDetail,

              pSubtotal: doc.data().pSubtotal,
              subTotal: doc.data().subTotal,
              grandTotal: doc.data().grandTotal,
              fee: doc.data().fee,
              payforDetail: doc.data().payforDetail,
              invoiceTime: moment(doc.data().invoiceTime)
                .add("543", "year")
                .format("DD/MM/YYYY"),
              note: doc.data().note,
              payBy: doc.data().payBy,
              paymentFor: doc.data().paymentFor,
              transactionTime: moment(doc.data().transactionTime)
                .add("543", "year")
                .format("DD/MM/YYYY HH:mm"),

              other: doc.data().other,
              docId: doc.id,
            };
            this.invoiceData.push(billingDetail);
            // console.log(this.products);
          });
        });
    },

    async chkStatus() {
      await fb.auth().onAuthStateChanged;
      var { claims } = await fb.auth().currentUser.getIdTokenResult();

      if (claims.isAdmin) {
        this.userStatus = "isAdmin";
      } else if (claims.isAssistant) {
        this.$router.replace("/admin/approve");
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
    this.getExpenseLists();
    this.getData();
    window.scrollTo(0, 0);
  },

  created() {
    this.chkStatus();
  },

  filters: {
    date(date) {
      return new Intl.DateTimeFormat("th-TH").format(date);
    },
  },

  computed: {
    expenseTotal() {
      var expense = this.expenseLists.reduce((accumulator, Item) => {
        return accumulator + parseInt(Item.amount);
      }, 0);
      return expense;
    },

    incomeTotal() {
      var income = this.invoiceData.reduce((accumulator, Item) => {
        return accumulator + parseInt(Item.grandTotal);
      }, 0);
      // console.log(total);
      return income;
    },

    balance() {
      var balance = parseInt(this.incomeTotal) - parseInt(this.expenseTotal);
      // console.log(balance);
      return balance;
    },

    subTotal() {
      var total = this.sumCourse.reduce((accumulator, item) => {
        return accumulator + (item.rate * item.classQty - item.classDiscount);
      }, 0);
      return total;
    },

    pSubtotal() {
      var ptotal = this.carts.reduce((accumulator, item) => {
        return accumulator + item.price * item.buyAmount - item.pDiscount;
      }, 0);
      return ptotal;
    },

    grandTotal() {
      var total =
        parseInt(this.subTotal) +
        parseInt(this.pSubtotal) +
        parseInt(this.billingDetail.fee);
      return total;
    },
  },
};
</script>

<style scoped>
#transaction {
  text-align: center;
  color: #2c3e50;
}
</style>
