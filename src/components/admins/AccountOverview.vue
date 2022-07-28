<template>
  <div id="transaction" class="shadow">
    <div class="container-fluid">
      <div class="">
        <h5 class="text-center text-success mb-4 mt-3">ภาพรวม รายรับ - รายจ่าย</h5>
    
        <div class="row">
          <div class="col-md-12">
            <div class="card-deck">
              <div class="card">
                <div class="card-body">
                  <div class="card-header bg-success shadow">
                    <h5 class="text-light text-center">รายรับ</h5>
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

              <div class="card">
                <div class="card-body">
                  <div class="card-header bg-danger shadow">
                    <h5 class="text-light text-center">รายจ่าย</h5>
                  </div>
                  <h6 class="card-text mt-4 text-danger text-center">
                    <h6 class="text-danger">รายจ่ายช่วงวันที่</h6>
                    {{ pickerDates.startDate | date }} -
                    {{ pickerDates.endDate | date }}
                  </h6>
                  <h4 class="card-text my-4 text-danger text-center">
                    จำนวน {{ incomeTotal }} บาท
                  </h4>

                  <div class="bg- shadow">
                    <button
                      to="/user/withdrawWeb"
                      class="btn btn-danger btn-block text-light"
                    >
                      ดูข้อมูล
                    </button>
                  </div>
                </div>
              </div>

              <div class="card">
                <div class="card-body">
                  <div class="card-header bg-warning shadow">
                    <h5 class="text-light text-center">คงเหลือ</h5>
                  </div>
                  <h6 class="card-text mt-4 text-dark text-center">
                    <h6 class="text-dark">ยอดคงเหลือช่วงวันที่</h6>
                    {{ pickerDates.startDate | date }} -
                    {{ pickerDates.endDate | date }}
                  </h6>
                  <h4 class="card-text my-4 text-dark text-center">
                    จำนวน {{ incomeTotal }} บาท
                  </h4>

                  <div class="bg- shadow">
                    <button
                      to="/user/withdrawWeb"
                      class="btn btn-warning btn-block text-light"
                    >
                      ดูข้อมูล
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- <h5 class="text-success text-left">รายการ</h5> -->
        <!-- <button
          @click="addNew"
          class="btn btn-success d-inline-block float-right px-5"
          data-toggle="modal"
          data-target="#product"
        >
          เพิ่มสินค้า
        </button> -->
      </div>

      <div class="mt-3 shadow"></div>
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
              :rows="products"
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
                      v-for="(course, index) in product.courseDetail"
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
                                readonly
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
                                readonly
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
                                readonly
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
                                readonly
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
                                readonly
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
                                readonly
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
                                readonly
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
                                readonly
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
                                readonly
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
                                readonly
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
                                readonly
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
                                readonly
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
                                readonly
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
                                readonly
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
                    <div class="my-2" >
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
                            <tr v-for="(item, index) in product.productDetail" :key="index">
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
                              <td>{{ product.subTotal }}</td>
                              <td>{{ product.pSubtotal }}</td>
                              <td>{{ product.fee }}</td>
                              <td>{{ product.grandTotal }}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div class="col-md-6">
                          <div class="form-group mt-2">
                            <label for="usr" class="text-success"
                              >หมายเหตุ
                            </label>
                            <input
                              type="text"
                              class="form-control"
                              v-model.trim="product.note"
                              readonly
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

      modal : null,
    };
  },
  filters: {
    date(date) {
      return new Intl.DateTimeFormat("th-TH").format(date);
    },
  },

  computed: {
    incomeTotal() {
      var total = this.products.reduce((accumulator, item) => {
        return accumulator + item.grandTotal;
      }, 0);
    //   console.log(total);
      return total;
    },
  },
  methods: {
    invoiceDetail(detail) {
      this.product = detail;
    //   console.log(this.product);
    },

    getData() {
      db.collection("invoiceData")
      .orderBy('invoiceNo','desc')
        .onSnapshot((querySnapshot) => {
          this.products = [];
          querySnapshot.forEach((doc) => {
            let product = {
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
              invoiceTime: doc.data().invoiceTime,
              note: doc.data().note,
              payBy: doc.data().payBy,
              paymentFor: doc.data().paymentFor,
              transactionTime: doc.data().transactionTime,

              other: doc.data().other,
              docId: doc.id,
            };
            this.products.push(product);
            // console.log(this.products);
          });
        });
    },
  },

  mounted() {
    this.getData();
    window.scrollTo(0, 0);
  },
};
</script>

<style scoped>
#transaction {
  text-align: center;
  color: #2c3e50;
}
</style>
