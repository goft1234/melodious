<template>
  <div id="studentInvoice" class="shadow">
    <div class="container-fluid jumbotron">
      <div class="">
        <h4 class="text-center text-success mb-4">ประวัติการชำระเงิน</h4>
        <div class="row">
          <div class="col-12">
            <router-link
              class="btn btn-success d-inline-block float-right px-3"
              to="/admin/student"
            >
              ย้อนกลับ
            </router-link>
          </div>
        </div>
        <div class="mt-3 shadow">
          <vue-good-table
            :columns="columns"
            :rows="stdInvoices"
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
              <span v-else>
                {{ props.formattedRow[props.column.field] }}
              </span>
            </template>
          </vue-good-table>
        </div>
      </div>
    </div>
    <!-- Start Detail modal -->
    <div class="modal fade" id="detailModal">
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <!-- Modal Header -->
          <div class="modal-header text-center">
            <h4 class="modal-title w-100 text-center text-success">
              รายละเอียดการชำระค่าเรียน
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
                      v-model.trim="stdInvoice.paymentType"
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
                      v-model.trim="stdInvoice.paymentType"
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
                        v-for="(course, index) in stdInvoice.courseDetail"
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
                          v-model.trim="stdInvoice.paymentFor"
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
                          v-model.trim="stdInvoice.paymentFor"
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
                            v-model.trim="stdInvoice.paymentFor"
                            disabled
                          />
                        </div>
                      </div>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="กรอกรายการชำระ"
                        v-model.trim="stdInvoice.payforDetail"
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
                        v-for="(Item, index) in stdInvoice.productDetail"
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
                        v-model.trim="stdInvoice.fee"
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
                        <td>{{ stdInvoice.subTotal }}</td>
                        <td>{{ stdInvoice.pSubtotal }}</td>
                        <td>{{ stdInvoice.fee }}</td>
                        <td>{{ stdInvoice.grandTotal }}</td>
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
                          v-model.trim="stdInvoice.payBy"
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
                          v-model.trim="stdInvoice.payBy"
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
                            v-model.trim="stdInvoice.payBy"
                            disabled
                          />
                        </div>
                      </div>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="โอนผ่านบัญชีธนาคาร"
                        v-model.trim="stdInvoice.bankDetail"
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
                        v-model.trim="stdInvoice.note"
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
                        v-model="stdInvoice.transactionTime"
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
import moment from "moment";
export default {
  name: "studentInvoice",

  data() {
    return {
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
      ],
      stdInvoices: [],
      stdInvoice:{},
    };
  },

  methods: {
    invoiceDetail(detail) {
      this.stdInvoice = detail;
      console.log(this.stdInvoice);
    },
    
    getStudentInvoice() {
      try {
        this.$store.state.show = true;
        db.collection("invoiceData")
          .where("userId", "==", this.$route.params.uid)
          .onSnapshot((querySnapshot) => {
            this.stdInvoices = [];
            querySnapshot.forEach((doc) => {
              let stdInvoice = {
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
                invoiceTime: doc.data().invoiceTime,
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
                transactionTime: moment(doc.data().transactionTime).format(
                  "DD/MM/YY HH:mm"
                ),
              };
              this.stdInvoices.push(stdInvoice);
            });
            this.$store.state.show = false;
          });
      } catch (err) {
        console.log(err);
        this.$store.state.show = false;
      }
    },
  },

  mounted() {
    this.getStudentInvoice();
    window.scrollTo(0, 0);
  },
};
</script>

<style lang="scss" scoped></style>
