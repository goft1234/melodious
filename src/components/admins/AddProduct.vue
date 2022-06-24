<template>
  <div id="addProduct">
    <div class="container-fluid jumbotron">
      <div class="">
        <h4 class="text-center text-success mb-4">ลงข้อมูลสินค้า</h4>
        <h5 class="d-inline-block text-success">รายการสินค้า</h5>
        <button
          @click="addNew"
          class="btn btn-success d-inline-block float-right px-5"
          data-toggle="modal"
          data-target="#product"
        >
          เพิ่มสินค้า
        </button>
      </div>

      <div class="mt-3">
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
            <h4 v-if="modal == 'new'" class="modal-title text-success">
              เพิ่มสินค้า
            </h4>
            <h4 v-if="modal == 'edit'" class="modal-title text-warning">
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
                  type="text"
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
                  type="text"
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
                  type="text"
                  v-model.trim="product.quantity"
                  class="form-control"
                  placeholder="กรอกจำนวน"
                />
              </div>
            </form>
          </div>

          <!-- Modal footer -->
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">
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
export default {
  name: "addProduct",

  data() {
    return {
      columns: [
        {
          label: "ชื่อสินค้า",
          field: "pName",
          type: "text",
        },
        {
          label: "รหัสสินค้า",
          field: "pCode",
          type: "text",
        },
        {
          label: "ราคาทุน",
          field: "cost",
          type: "text",
        },
        {
          label: "ราคาขาย",
          field: "price",
          type: "text",
        },
        {
          label: "จำนวน",
          field: "quantity",
          type: "text",
        },
        {
          label: "edit",
          field: "edit",
          type: "text",
        },
        {
          label: "delete",
          field: "delete",
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
    };
  },
  methods: {
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

    getProducts() {
      db.collection("products").onSnapshot((querySnapshot) => {
        this.products = [];
        querySnapshot.forEach((doc) => {
          let product = {
            pName: doc.data().pName,
            pCode: doc.data().pCode,
            cost: doc.data().cost,
            price: doc.data().price,
            quantity: doc.data().quantity,
            pID: doc.id,
          };
          this.products.push(product);
        });
      });
    },
  },

  mounted() {
    this.getProducts();
    window.scrollTo(0, 0);
  },
};
</script>

<style>
</style>