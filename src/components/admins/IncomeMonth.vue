<template>
  <div id="transaction" class="">
    <div class="container-fluid">
      <div class="">
        <h4 class="text-center text-success mb-4 mt-3">สรุป รายรับ / เดือน</h4>
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
                    <h5 class="text-light text-center">รายรับ</h5>
                  </div>
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
        :rows="Items"
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
        <!-- <template slot="table-row" slot-scope="props">
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
          <span v-else-if="props.column.field == 'edit'">
            <div
              class="btn btn-warning"
              @click="editItem(props.row)"
              data-toggle="modal"
              data-target="#detailModal"
            >
              <i class="fas fa-edit"></i>
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
        </template> -->
      </vue-good-table>
    </div>

    <!--Start Income  Modal -->
    <div class="modal fade" id="incomeModal">
      <div class="modal-dialog modal-xl modal-dialog-scrollable">
        <div class="modal-content">
          <!-- Modal Header -->
          <div class="modal-header">
            <h4
              v-if="modal == 'new'"
              class="modal-title w-100 text-center text-success"
            >
              เพิ่มสินค้า
            </h4>
            <h4
              v-if="modal == 'edit'"
              class="modal-title w-100 text-center text-warning"
            >
              แก้ไขสินค้า
            </h4>
            <button type="button" class="close" data-dismiss="modal">
              &times;
            </button>
          </div>

          <!-- Modal body -->
          <div class="modal-body">
            <vue-good-table
              :columns="columns"
              :rows="Items"
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
                    @click="editItem(props.row)"
                    data-toggle="modal"
                    data-target="#Item"
                  >
                    แก้ไข
                  </div>
                </span>
                <!-- @click="deleteItem(props.row.pID)" -->

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
              @click="addItem()"
              type="button"
              class="btn btn-success"
              v-if="modal == 'new'"
            >
              บันทึกสินค้า
            </button>
            <button
              @click="updateItem(Item.pID)"
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
            <div class="accordion" role="tablist" style="padding: 0">
              <b-card no-body class="mb-1">
                <b-card-header header-tag="header" class="p-1" role="tab">
                  <b-button block v-b-toggle.accordion-1 variant="success"
                    >วิชาเรียน</b-button
                  >
                </b-card-header>
                <b-collapse
                  id="accordion-1"
                  visible
                  accordion="my-accordion"
                  role="tabpanel"
                >
                  <b-card-body>
                    <div
                      class=""
                      style="background: white"
                      v-for="(course, index) in Item.courseDetail"
                      :key="index"
                    >
                      <div class="row">
                        <div class="col-lg-12">
                          <h5 class="mt-4 text-center">
                            วิชา {{ course.courseName }}
                          </h5>
                        </div>
                      </div>
                      <div class="row text-left">
                        <div class="col-lg-6">
                          <div class="form-group">
                            <label for="namePrefix" class="text-success"
                              >วิชาเรียน</label
                            >
                            <div class="form-group">
                              <input
                                type="text"
                                class="form-control"
                                v-model="course.courseName"
                                :disabled="disabled == 1"
                              />
                            </div>
                          </div>
                        </div>

                        <div class="col-lg-6">
                          <div class="form-group">
                            <label for="nickName" class="text-success"
                              >รูปแบบการเรียน</label
                            >
                            <div class="form-group">
                              <input
                                type="text"
                                class="form-control"
                                v-model.trim="course.classType"
                                :disabled="disabled == 1"
                              />
                            </div>
                          </div>
                        </div>

                        <div class="col-lg-6">
                          <div class="form-group">
                            <label for="namePrefix" class="text-success"
                              >Level ที่ลงเรียน</label
                            >
                            <div class="form-group">
                              <input
                                type="text"
                                class="form-control"
                                v-model.trim="course.level"
                                :disabled="disabled == 1"
                              />
                            </div>
                          </div>
                        </div>

                        <div class="col-lg-6">
                          <div class="form-group">
                            <label for="nickName" class="text-success"
                              >ราคา/คอร์ส</label
                            >
                            <div class="form-group">
                              <input
                                type="text"
                                class="form-control"
                                v-model.trim="course.price"
                                :disabled="disabled == 1"
                              />
                            </div>
                          </div>
                        </div>

                        <div class="col-lg-6">
                          <div class="form-group">
                            <label for="namePrefix" class="text-success"
                              >ส่วนลด โปรโมชั่น</label
                            >
                            <div class="form-group">
                              <input
                                type="text"
                                class="form-control"
                                v-model.trim="course.discount"
                                :disabled="disabled == 1"
                              />
                            </div>
                          </div>
                        </div>

                        <div class="col-lg-6">
                          <div class="form-group">
                            <label for="" class="text-success"
                              >จำนวนครั้ง / คอร์ส</label
                            >
                            <div class="form-group">
                              <input
                                type="number"
                                class="form-control"
                                v-model.trim="course.amount"
                                :disabled="disabled == 1"
                              />
                            </div>
                          </div>
                        </div>

                        <div class="col-lg-6">
                          <div class="form-group">
                            <label for="nickName" class="text-success"
                              >อาจารย์รายวิชา</label
                            >
                            <div class="form-group">
                              <input
                                type="text"
                                class="form-control"
                                v-model.trim="course.teacherName"
                                :disabled="disabled == 1"
                              />
                            </div>
                          </div>
                        </div>

                        <div class="col-lg-6">
                          <div class="form-group">
                            <label for="namePrefix" class="text-success"
                              >ค่าสอนของครู</label
                            >
                            <div class="form-group">
                              <input
                                type="text"
                                class="form-control"
                                v-model.trim="course.wages"
                                :disabled="disabled == 1"
                              />
                            </div>
                          </div>
                        </div>

                        <div class="col-lg-6">
                          <div class="form-group">
                            <label for="" class="text-success"
                              >เริ่มเรียน เวลา</label
                            >
                            <div class="form-group">
                              <input
                                type="text"
                                class="form-control"
                                v-model.trim="course.startTime"
                                :disabled="disabled == 1"
                              />
                            </div>
                          </div>
                        </div>

                        <div class="col-lg-6">
                          <div class="form-group">
                            <label for="" class="text-success"
                              >เลิกเรียน เวลา</label
                            >
                            <div class="form-group">
                              <input
                                type="text"
                                class="form-control"
                                v-model.trim="course.finishTime"
                                :disabled="disabled == 1"
                              />
                            </div>
                          </div>
                        </div>

                        <div class="col-lg-6">
                          <div class="form-group">
                            <label for="" class="text-success"
                              >วันที่เริ่มเรียน</label
                            >
                            <div class="form-group">
                              <input
                                type="text"
                                class="form-control"
                                v-model.trim="course.startDate"
                                :disabled="disabled == 1"
                              />
                            </div>
                          </div>
                        </div>

                        <div class="col-lg-6">
                          <div class="form-group">
                            <label for="" class="text-success"
                              >วันที่เรียนจบ โดยประมาณ</label
                            >
                            <div class="form-group">
                              <input
                                type="text"
                                class="form-control"
                                v-model.trim="course.endDate"
                                :disabled="disabled == 1"
                              />
                            </div>
                          </div>
                        </div>

                        <div class="col-lg-6">
                          <div class="form-group">
                            <label for="namePrefix" class="text-success"
                              >วันที่เลือกเรียน</label
                            >
                            <div class="form-group">
                              <input
                                type="text"
                                class="form-control"
                                v-model.trim="course.day.item"
                                :disabled="disabled == 1"
                              />
                            </div>
                          </div>
                        </div>

                        <div class="col-lg-6">
                          <div class="form-group">
                            <label for="" class="text-success"
                              >จำนวนคอร์ส</label
                            >
                            <div class="form-group">
                              <input
                                type="text"
                                class="form-control"
                                v-model.trim="course.qty"
                                :disabled="disabled == 1"
                              />
                            </div>
                          </div>
                        </div>
                        <br />
                        <hr />
                      </div>
                    </div>
                  </b-card-body>
                </b-collapse>
              </b-card>

              <b-card no-body class="mb-1">
                <b-card-header header-tag="header" class="p-1" role="tab">
                  <b-button block v-b-toggle.accordion-2 variant="success"
                    >หนังสือ - อุปกรณ์</b-button
                  >
                </b-card-header>
                <b-collapse
                  id="accordion-2"
                  accordion="my-accordion"
                  role="tabpanel"
                >
                  <b-card-body>
                    <div class="my-2">
                      <h5 class="text-center text-success mt-3">
                        ค่าหนังสือ - อุปกรณ์
                      </h5>

                      <div class="table-responsive">
                        <table
                          class="table table-bordered table-striped text-center"
                        >
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
                              v-for="(item, index) in Item.productDetail"
                              :key="index"
                            >
                              <td>{{ item.pName }}</td>
                              <td>{{ item.buyAmount }}</td>
                              <td>{{ item.price }}</td>
                              <td>{{ item.pDiscount }}</td>
                              <td>
                                {{
                                  item.buyAmount * item.price - item.pDiscount
                                }}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </b-card-body>
                </b-collapse>
              </b-card>

              <b-card no-body class="mb-1">
                <b-card-header header-tag="header" class="p-1" role="tab">
                  <b-button block v-b-toggle.accordion-3 variant="success"
                    >Invoice</b-button
                  >
                </b-card-header>
                <b-collapse
                  id="accordion-3"
                  accordion="my-accordion"
                  role="tabpanel"
                >
                  <b-card-body>
                    <h5 class="text-center text-success mt-3">สรุปยอด</h5>
                    <div class="table-responsive">
                      <table
                        class="table table-bordered table-striped text-center"
                      >
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
                            <td>{{ Item.subTotal }}</td>
                            <td>{{ Item.pSubtotal }}</td>
                            <td>{{ Item.fee }}</td>
                            <td>{{ Item.grandTotal }}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group mt-2">
                        <label for="usr" class="text-success">หมายเหตุ </label>
                        <input
                          type="text"
                          class="form-control"
                          v-model.trim="Item.note"
                          :disabled="disabled == 1"
                        />
                      </div>
                    </div>
                  </b-card-body>
                </b-collapse>
              </b-card>
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
            <button
              @click="addItem()"
              type="button"
              class="btn btn-success"
              v-if="modal == 'new'"
            >
              บันทึกสินค้า
            </button>
            <button
              @click="updateItem(Item.pID)"
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

    <!-- End Detail Modal -->
  </div>
</template>

<script>
import { db } from "../../firebase";
import DateRangePicker from "vue2-daterange-picker";
//you need to import the CSS manually
import "vue2-daterange-picker/dist/vue2-daterange-picker.css";
import moment from "moment";

export default {
  name: "addItem",
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
      pickerDates: {
        startDate,
        endDate,
      },
      columns: [
        {
          label: "วันที่",
          field: "docId",
          type: "text",
        },
        {
          label: "จำนวนคอร์ส",
          field: "courseTotal",
          type: "number",
        },
        {
          label: "ค่าคอร์สเรียน",
          field: "classPriceTotal",
          type: "number",
        },
        {
          label: "ค่าอุปกรณ์ดนตรี",
          field: "instrumentTotal",
          type: "number",
        },
        {
          label: "ค่าอุปกรณ์การเรียน",
          field: "equipmentTotal",
          type: "number",
        },
        {
          label: "ค่าแรกเข้า",
          field: "fee",
          type: "number",
        },
        {
          label: "รายได้อื่นๆ",
          field: "otherTotal",
          type: "number",
        },
        {
          label: "ค่าสอบ",
          field: "examTotal",
          type: "number",
        },
        {
          label: "รวม",
          field: "sumTotal",
          type: "number",
        },
        // {
        //   label: "รายละเอียด",
        //   field: "detail",
        //   type: "text",
        // },
      ],

      modal: null,

      Items: [],
      Item: {
        pName: null,
        pCode: null,
        cost: null,
        price: null,
        quantity: null,
      },
      datatest: [],
      disabled: 0,

      monthSelect: null,
      dayAsset1: [],
      dayAsset2: [],
      dayAsset3: [],
      dayAsset4: [],
      dayAsset5: [],
      dayAsset6: [],
      dayAsset7: [],
      dayAsset8: [],
    };
  },
  
  filters: {
    date(date) {
      return new Intl.DateTimeFormat("th-TH").format(date);
    },
  },

  methods: {
    invoiceDetail(detail) {
      this.Item = detail;
      this.disabled = 1;
      console.log(this.Item);
    },

    async getDatetest() {
      console.log(this.monthSelect);
      try {
        await db
          .collection("summarize")
          .where("monthlyDay", "==", this.monthSelect)
          // .where("invYear", "==", myYear)
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
              this.Items.push(Item);
              // this.testTotal();
              console.log(this.Items);
            });
          });
      } catch (err) {
        console.log(err);
      }
    },
    test() {
      var startDateFormat = moment(this.pickerDates.endDate).format("x");
      var endDateFormat = moment(this.pickerDates.endDate).format("x");
      console.log("start " + startDateFormat);
    },

    async getData() {
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
            });
          });
      } catch (err) {
        console.log(err);
      }
    },
  },

  created() {
    this.getData();
    window.scrollTo(0, 0);
  },

  computed: {
    incomeTotal() {
      var total = this.Items.reduce((accumulator, item) => {
        return accumulator + parseInt(item.sumTotal);
      }, 0);
      return total
    },

    // testTotal() {
    //   // console.log(moment(this.monthSelect).daysInMonth());
    //   let amountDay = moment(this.monthSelect).daysInMonth();
    //   for (var i = 1; i < amountDay + 1; i++) {
    //     this.Items.forEach((item) => {
    //       if (item.invDayOfMonth == i) {
    //         // console.log(item.invDayOfMonth);
    //         console.log(this.dayAsset.toString() + i.toString());
    //       }
    //     });
    //   }
    // },

    // testSpread() {
    //   const result = this.Items.reduce((carry, current) => {
    //     const { day } = current;
    //     let el = carry.find(
    //       (item) => item.invDayOfMonth === invDayOfMonth
    //     );

    //     if (!el) {
    //       el = {day};
    //       carry.push(el);
    //     }

    //     el.other.push({ ...course });
    //      console.log('ทดสอบ'+result);
    //     return result;
    //   }, []);
    // },
  },
};
</script>

<style scoped>
#transaction {
  text-align: center;
  color: #2c3e50;
}
</style>
