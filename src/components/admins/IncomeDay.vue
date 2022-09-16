<template>
  <div id="incomeDay" class="">
    <div class="container-fluid">
      <div class="">
        <h4 class="text-center text-success mb-4 mt-3">ข้อมูล Transaction</h4>
        <div class="row transaction">
          <div class="col-md-12">
            <date-range-picker
              :single-date-picker="singleDatePicker"
              @update="getInvoiceDate"
              :showDropdowns="showDropdowns"
              v-model="pickerDates"
            >
              <!-- <template
                v-slot:input="pickerDates"
                style="min-width: 450px"
                class="form-control"
                >{{ pickerDates.startDate | date }} -
                {{ pickerDates.endDate | date }}
                <br />
              </template> -->
            </date-range-picker>
            <br />
          </div>
        </div>

        <div class="row">
          <div class="col-md-4"></div>
          <div class="col-md-4">
            <div class="card-deck text-center">
              <div class="card">
                <div class="card-body">
                  <div class="card-header bg-success shadow">
                    <h5 class="text-light text-center">รายรับ รายวัน</h5>
                  </div>
                  <!-- <h6 class="card-text mt-4 text-primary text-center">
                    <h6 class="text-dark">รายรับช่วงวันที่</h6>
                    {{ pickerDates.startDate | date }} -
                    {{ pickerDates.endDate | date }}
                  </h6> -->
                  <i
                    class="fas fa-file-invoice-dollar mt-4 text-success"
                    style="font-size: 50px"
                  ></i>

                  <h4 class="card-text my-4 text-primary text-center">
                    จำนวน {{ incomeTotal | number("0,0") }} บาท
                  </h4>

                  <div class="card-header bg-success shadow">
                    <h5 class="text-light text-center"></h5>
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
          <span v-if="props.column.field == 'detail'">
            <div
              class="btn btn-success"
              data-toggle="modal"
              data-target="#detailModal"
              @click="invoiceDetail(props.row)"
            >
              <i class="fa-solid fa-file-circle-plus"></i>
            </div>
          </span>
          <span v-else-if="props.column.field == 'delete'">
            <div
              class="btn btn-danger"
              @click="editItem(props.row)"
              data-toggle="modal"
              data-target="#Item"
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

    <!-- Start Detail modal -->
    <div class="modal fade" id="detailModal">
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <!-- Modal Header -->
          <div class="modal-header text-center">
            <h4 class="modal-title w-100 text-center text-success">
              รายละเอียดรายรับ
            </h4>
            <button type="button" class="close" data-dismiss="modal">
              &times;
            </button>
          </div>

          <!-- Modal body -->
          <div class="modal-body">
            <div id="modalNull">
              <div class="py-3" style="border: 1px solid green">
                <h5 class="text-center text-success mt-3">วิชาเรียน</h5>
                <h6 class="ml-3 mt-3 text-success">
                  เพื่อชำระค่าเรียน (Payment for tuition)
                </h6>
                <div class="form-check-inline ml-3">
                  <label class="form-check-label" for="">
                    <input
                      type="radio"
                      class="form-check-input"
                      id=""
                      name=""
                      value="ลงทะเบียนใหม่"
                      checked
                      v-model.trim="invoiceItem.paymentType"
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
                      v-model.trim="invoiceItem.paymentType"
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
                        v-for="(course, index) in invoiceItem.courseDetail"
                        :key="index"
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
                          v-model.trim="invoiceItem.paymentFor"
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
                          v-model.trim="invoiceItem.paymentFor"
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
                            v-model.trim="invoiceItem.paymentFor"
                            disabled
                          />
                        </div>
                      </div>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="กรอกรายการชำระ"
                        v-model.trim="invoiceItem.payforDetail"
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
                      <tr
                        v-for="(Item, index) in invoiceItem.productDetail"
                        :key="index"
                      >
                        <td>{{ Item.pName }}</td>
                        <td>{{ Item.buyAmount }}</td>
                        <td>{{ Item.price }}</td>
                        <td>{{ Item.pDiscount }}</td>
                        <td>
                          {{ Item.buyAmount * Item.price - Item.pDiscount }}
                        </td>
                        <!-- <td v-if="modal == 'edit'">
                            <button
                              type="button"
                              @click="deleteProduct(index, Item)"
                              class="btn btn-danger btn-sm"
                            >
                              <i class="fas fa-times text-light"></i>
                            </button>
                          </td> -->
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
                        v-model.trim="invoiceItem.fee"
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
                        <td>{{ invoiceItem.subTotal }}</td>
                        <td>{{ invoiceItem.pSubtotal }}</td>
                        <td>{{ invoiceItem.fee }}</td>
                        <td>{{ invoiceItem.grandTotal }}</td>
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
                          v-model.trim="invoiceItem.payBy"
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
                          v-model.trim="invoiceItem.payBy"
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
                            v-model.trim="invoiceItem.payBy"
                            disabled
                          />
                        </div>
                      </div>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="โอนผ่านบัญชีธนาคาร"
                        v-model.trim="invoiceItem.bankDetail"
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
                        v-model.trim="invoiceItem.note"
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
                        v-model="invoiceItem.transactionTime"
                        disabled
                      />
                    </div>
                  </div>
                </div>
              </div>
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
    <!-- End Detail Modal -->
  </div>
</template>

<script>
import { db } from "../../firebase";
import DateRangePicker from "vue2-daterange-picker";
import "vue2-daterange-picker/dist/vue2-daterange-picker.css";
import moment from "moment";

export default {
  name: "incomeDay",
  components: { DateRangePicker },
  data() {
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 6);
    return {
      singleDatePicker: "range",
      showDropdowns: true,
      localeData: {
        direction: "ltr",
        format: "DD/MM/YYYY",
        separator: " - ",
        applyLabel: "Apply",
        cancelLabel: "Cancel",
        weekLabel: "W",
        customRangeLabel: "Custom Range",
        daysOfWeek: ["อา", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        monthNames: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        firstDay: 0,
      },
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
          field: "transactionTime",
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
        // {
        //   label: "ลบ",
        //   field: "delete",
        //   type: "text",
        // },
      ],
      pickerDates: {
        startDate,
        endDate,
      },
      invoiceData: [],
      invoiceItem: {},

      expenseLists: [],
    };
  },
  filters: {
    date(date) {
      return new Intl.DateTimeFormat("th-TH").format(date);
    },
  },

  created() {
    this.getInvoiceData();
  },

  methods: {
    invoiceDetail(detail) {
      this.invoiceItem = detail;
      console.log(this.invoiceItem);
    },

    getInvoiceData() {
      var today = moment().format("DD/MM/YYYY");
      // console.log('วันนี้'+today);
      // moment().toDate().getDate()
      // console.log(today);
      db.collection("invoiceData")
        .where("invoiceTime", "==", today)
        .orderBy("invoiceNo", "desc")
        .onSnapshot((querySnapshot) => {
          this.invoiceData = [];
          querySnapshot.forEach((doc) => {
            let Item = {
              userId: doc.data().userId,
              docId: doc.id,

              bankDetail: doc.data().bankDetail,
              canUpdate: doc.data().canUpdate,
              courseDetail: doc.data().courseDetail,
              fee: doc.data().fee,
              firstName: doc.data().firstName,
              grandTotal: doc.data().grandTotal,
              invDayOfMonth: doc.data().invDayOfMonth,
              invDayOfWeek: doc.data().invDayOfWeek,
              invMonth: doc.data().invMonth,
              invYear: doc.data().invYear,

              invoiceNo: doc.data().invoiceNo,
              invoiceTime: moment(doc.data().invoiceTime)
                .add("543", "year")
                .format("DD/MM/YYYY"),
              invoiceTimestamp: doc.data().invoiceTimestamp,
              lastName: doc.data().lastName,
              nickName: doc.data().nickName,
              note: doc.data().note,
              other: doc.data().other,
              pSubtotal: doc.data().pSubtotal,
              payBy: doc.data().payBy,
              payforDetail: doc.data().payforDetail,

              paymentFor: doc.data().paymentFor,
              paymentType: doc.data().paymentType,
              productDetail: doc.data().productDetail,
              studentId: doc.data().studentId,
              subTotal: doc.data().subTotal,
              transactionTime: moment(doc.data().transactionTime)
                .add("543", "year")
                .format("DD/MM/YYYY HH:mm"),

            };
            this.invoiceData.push(Item);
            console.log(this.invoiceData);
          });
        });
    },

    getInvoiceDate() {
      try {
        var startDateFormat = moment(this.pickerDates.startDate).format("DD/MM/YYYY");
        console.log(startDateFormat);
        var endDateFormat = moment(this.pickerDates.endDate).format("DD/MM/YYYY");
        console.log(endDateFormat);
        
        db.collection("invoiceData")
          .where("invoiceTime", ">=", startDateFormat)
          .where("invoiceTime", "<=", endDateFormat)
          .onSnapshot((querySnapshot) => {
            this.invoiceData = [];
            querySnapshot.forEach((doc) => {
              // if(doc.data().invoiceTime >= startDateFormat && doc.data().invoiceTime <= endDateFormat ){
                let Item = {
                userId: doc.data().userId,
                docId: doc.id,

                bankDetail: doc.data().bankDetail,
                canUpdate: doc.data().canUpdate,
                courseDetail: doc.data().courseDetail,
                fee: doc.data().fee,
                firstName: doc.data().firstName,
                grandTotal: doc.data().grandTotal,
                invDayOfMonth: doc.data().invDayOfMonth,
                invDayOfWeek: doc.data().invDayOfWeek,
                invMonth: doc.data().invMonth,
                invYear: doc.data().invYear,

                invoiceNo: doc.data().invoiceNo,
                invoiceTime: moment(doc.data().invoiceTime)
                .add("543", "year")
                .format("DD/MM/YYYY"),
                invoiceTimestamp: doc.data().invoiceTimestamp,
                lastName: doc.data().lastName,
                nickName: doc.data().nickName,
                note: doc.data().note,
                other: doc.data().other,
                pSubtotal: doc.data().pSubtotal,
                payBy: doc.data().payBy,
                payforDetail: doc.data().payforDetail,

                paymentFor: doc.data().paymentFor,
                paymentType: doc.data().paymentType,
                productDetail: doc.data().productDetail,
                studentId: doc.data().studentId,
                subTotal: doc.data().subTotal,
                transactionTime: moment(doc.data().transactionTime)
                .add("543", "year")
                .format("DD/MM/YYYY HH:mm"),

              };
              this.invoiceData.push(Item);
              // }
            });
          });
      } catch (err) {
        console.log(err);
      }
    },
  },

  mounted() {
    window.scrollTo(0, 0);
  },

  computed: {
    incomeTotal() {
      var total = this.invoiceData.reduce((accumulator, Item) => {
        return accumulator + Item.grandTotal;
      }, 0);
      return total;
    },
  },
};
</script>

<style lang="scss" scoped>
.transaction {
  text-align: center;
  color: #2c3e50;
}
</style>
