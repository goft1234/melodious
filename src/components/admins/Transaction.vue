<template>
  <div id="transaction" class="shadow">
    <div class="container-fluid jumbotron">
      <div class="">
        <h4 class="text-center text-success mb-4">
          ข้อมูล transaction {{ incomeTotal }}
        </h4>
        <div class="row">
          <div class="col-md-12">
            <date-range-picker
              :single-date-picker="singleDatePicker"
              @update="getDatetest"
              :showDropdowns="showDropdowns"
              v-model="pickerDates"
            >
              <template v-slot:input="pickerDates" style="min-width: 350px"
                >{{ pickerDates.startDate | date }} -
                {{ pickerDates.endDate | date }}
              </template>
            </date-range-picker>
            <br />
            <!-- <div class="btn btn-success px-3" @click="test()">test</div> -->
          </div>
        </div>
        <h5 class="text-success text-left">รายการ</h5>
        <!-- <button
          @click="addNew"
          class="btn btn-success d-inline-block float-right px-5"
          data-toggle="modal"
          data-target="#product"
        >
          เพิ่มสินค้า
        </button> -->
      </div>

      <div class="mt-3 shadow">
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
            <span v-else-if="props.column.field == 'delete'">
              <div class="btn btn-danger" @click="deleteProduct(props.row.pID)">
                ลบสินค้า
              </div>
            </span>
            <span v-else>
              {{ props.formattedRow[props.column.field] }}
            </span>
          </template>
        </vue-good-table>
      </div>
    </div>

    <!--Start The Modal -->
    <div class="modal fade" id="product">
      <div class="modal-dialog">
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
            <form v-on:submit.prevent>
              <h6 class="float-left text-success">ชื่อสินค้า</h6>
              <div class="input-group mb-2">
                <div class="input-group-prepend">
                  <span class="input-group-text">
                    <i class="fas fa-cubes"></i>
                  </span>
                </div>
                <input
                  type="text"
                  v-model.trim="product.pName"
                  class="form-control"
                  placeholder="กรอกชื่อสินค้า"
                />
              </div>

              <h6 class="float-left text-success mt-2">รหัสสินค้า</h6>
              <div class="input-group mb-2">
                <div class="input-group-prepend">
                  <span class="input-group-text">
                    <i class="fas fa-list-ol"></i>
                  </span>
                </div>
                <input
                  type="text"
                  v-model.trim="product.pCode"
                  class="form-control"
                  placeholder="กรอกรหัสสินค้า"
                />
              </div>

              <h6 class="float-left text-success mt-2">ราคาต้นทุน</h6>
              <div class="input-group mb-2">
                <div class="input-group-prepend">
                  <span class="input-group-text">
                    <i class="fas fa-dollar-sign px-1"></i>
                  </span>
                </div>
                <input
                  type="number"
                  v-model.trim="product.cost"
                  class="form-control"
                  placeholder="กรอกราคาต้นทุน"
                />
              </div>

              <h6 class="float-left text-success mt-2">ราคาขาย</h6>
              <div class="input-group mb-2">
                <div class="input-group-prepend">
                  <span class="input-group-text">
                    <i class="fab fa-sellcast"></i>
                  </span>
                </div>
                <input
                  type="number"
                  v-model.trim="product.price"
                  class="form-control"
                  placeholder="กรอกราคาขาย"
                />
              </div>

              <h6 class="float-left text-success mt-2">จำนวน</h6>
              <div class="input-group mb-2">
                <div class="input-group-prepend">
                  <span class="input-group-text">
                    <i class="fas fa-sort-numeric-up"></i>
                  </span>
                </div>
                <input
                  type="number"
                  v-model.trim="product.quantity"
                  class="form-control"
                  placeholder="กรอกจำนวน"
                />
              </div>
            </form>
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
    <!--End The Modal -->
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
          label: "รายละเอียด",
          field: "paymentType",
          type: "text",
        },
      ],

      modal: null,

      products: [],
      product: {
        pName: null,
        pCode: null,
        cost: null,
        price: null,
        quantity: null,
      },
      datatest: [],
    };
  },
  filters: {
    date(date) {
      return new Intl.DateTimeFormat("en-En").format(date);
    },
  },

  computed: {
    incomeTotal() {
      var total = this.products.reduce((accumulator, item) => {
        return accumulator + item.grandTotal;
      }, 0);
      console.log(total);
      return total;
    },
  },
  methods: {
    async getDatetest() {
      try {
        var startDateFormat = moment(this.pickerDates.startDate).format(
          "x"
        );
        console.log(startDateFormat);
        var endDateFormat = moment(this.pickerDates.endDate).format("x");
        await db.collection("invoiceData")
          .where("invoiceTimestamp", ">=", startDateFormat)
          .where("invoiceTimestamp", "<=", endDateFormat)
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
    deleteProduct(doc) {
      Swal.fire({
        title: "ต้องการลบ?",
        text: "ทำการลบแล้วไม่สามารถย้อนกลับได้",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#30855c",
        cancelButtonColor: "#d33",
        confirmButtonText: "ตกลง ลบข้อมูล",
      }).then((result) => {
        if (result.value) {
          // console.log(doc)
          db.collection("products")
            .doc(doc)
            .delete()
            .then(() => {
              Swal.fire({
                title: "ทำการลบสินค้าเรียบร้อย",
                text: "ได้ทำการลบสินค้าเรียบร้อย",
                icon: "success",
                confirmButtonColor: "#30855c",
                confirmButtonText: "ตกลง",
              });
            });
        }
      });
    },

    addNew() {
      this.modal = "new";
      this.reset();
    },

    reset() {
      this.product = {
        pName: null,
        pCode: null,
        cost: null,
        price: null,
        quantity: null,
      };
    },

    editProduct(product) {
      this.modal = "edit";
      // console.log(pId);
      this.product = product;
    },

    updateProduct(docId) {
      // alert(docId)
      db.collection("products")
        .doc(docId)
        .update(this.product)
        .then(() => {
          Swal.fire({
            title: "อัพเดทข้อมูล",
            text: "ได้ทำการupdateสินค้าเรียบร้อย",
            icon: "success",
            confirmButtonColor: "#30855c",
            confirmButtonText: "ตกลง",
          });
          $("#product").modal("hide");
          this.reset();
        });
    },

    async addProduct() {
      try {
        await db.collection("products").add(this.product);
        Swal.fire({
          title: "เรียบร้อย",
          text: "ได้ทำการเพิ่มสินค้าแล้วเรียบร้อย",
          icon: "success",
          confirmButtonColor: "#30855c",
          confirmButtonText: "ตกลง",
        });
        $("#product").modal("hide");
        this.reset();
      } catch (err) {
        Swal.fire({
          title: "เกิดข้อผิดพลาด",
          text: "เกิดข้อผิดพลาดบางอย่าง กรุณารอและทำรายการใหม่",
          icon: "error",
          confirmButtonColor: "#FF0000",
          confirmButtonText: "ตกลง",
        });
      }
    },

    getData() {
      var today = moment(Date.now()).format("DD/MM/YYYY");
      // moment().toDate().getDate()
      console.log(today);
      db.collection("invoiceData")
        .where("invoiceTime", "==", today)
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
