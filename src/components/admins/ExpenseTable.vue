<template>
  <div id="addcourse">
    <div class="my-3">
      <h4 class="text-center text-success mb-4">บันทึกรายจ่าย</h4>
      <!-- <h5 class="d-inline-block text-success">รายวิชาเรียน</h5> -->
      <button
        @click="addNew"
        class="btn btn-info d-inline-block px-2"
        data-toggle="modal"
        data-target="#expenseTemplate"
      >
        สร้างหมวดหมู่
      </button>
      <button
        @click="addNew"
        class="btn btn-success d-inline-block float-right px-3"
        data-toggle="modal"
        data-target="#modal1"
      >
        เพิ่มรายการ
      </button>
    </div>

    <div class="mt-3 shadow">
      <vue-good-table
        :columns="columns"
        :rows="itemDatas"
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
              @click="deletecourse(props.row.couseId)"
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

    <!--Start The Modal -->
    <div class="modal fade" id="modal1">
      <div class="modal-dialog modal-dialog-scrollable">
        <div class="modal-content">
          <!-- Modal Header -->
          <div class="modal-header">
            <h4
              v-if="modal == 'new'"
              class="modal-title w-100 text-center text-success"
            >
              เพิ่มวิชาเรียน
            </h4>
            <h4
              v-if="modal == 'edit'"
              class="modal-title w-100 text-center text-warning"
            >
              แก้ไขวิชาเรียน
            </h4>
            <button type="button" class="close" data-dismiss="modal">
              &times;
            </button>
          </div>

          <!-- Modal body -->
          <div class="modal-body">
            <form v-on:submit.prevent>
              <h6 class="float-left text-success">วันที่</h6>
              <div class="input-group mb-2">
                <div class="input-group-prepend">
                  <span class="input-group-text">
                    <i class="fas fa-calendar-alt"></i>
                  </span>
                </div>
                <input
                  type="text"
                  v-model.trim="itemData.date"
                  class="form-control"
                  placeholder=""
                  disabled
                />
              </div>

              <div class="form-group">
                <label for="courseType" class="text-success mt-2"
                  >หมวดหมู่</label
                >
                <div class="input-group mb-2">
                  <div class="input-group-prepend">
                    <span class="input-group-text">
                      <i class="fas fa-object-ungroup"></i>
                    </span>
                  </div>
                  <select
                    class="form-control"
                    id="courseType"
                    v-model="itemData.type"
                  >
                    <option disabled value="">เลือกหมวดหมู่</option>
                    <option
                      v-for="(item, index) in expenseTemplate.type"
                      :key="index"
                    >
                      {{ item }}
                    </option>
                  </select>
                </div>
              </div>

              <div class="form-group">
                <label for="courseType" class="text-success mt-2">รายการ</label>
                <div class="input-group mb-2">
                  <div class="input-group-prepend">
                    <span class="input-group-text">
                      <i class="fas fa-list-alt"></i>
                    </span>
                  </div>
                  <input
                    type="text"
                    v-model.trim="itemData.list"
                    class="form-control"
                    placeholder="กรอกรายการที่ต้องการบันทึก"
                  />
                </div>
              </div>

              <div class="form-group">
                <label for="courseType" class="text-success mt-2"
                  >จำนวนเงิน</label
                >
                <div class="input-group mb-2">
                  <div class="input-group-prepend">
                    <span class="input-group-text">
                      <i class="fas fa-dollar-sign"></i>
                    </span>
                  </div>
                  <input
                    type="number"
                    v-model.trim="itemData.amount"
                    class="form-control"
                    placeholder="กรอกจำนวนเงิน"
                    min="0"
                  />
                </div>
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
              @click="addItemData()"
              type="button"
              class="btn btn-success"
              v-if="modal == 'new'"
            >
              บันทึกวิชาเรียน
            </button>
            <button
              @click="updatecourse(course.couseId)"
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

    <!--Start The template Modal -->
    <div class="modal fade" id="expenseTemplate">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <!-- Modal Header -->
          <div class="modal-header">
            <h4 class="modal-title w-100 text-center text-secondary">
              สร้างหมวดหมู่
            </h4>

            <button type="button" class="close" data-dismiss="modal">
              &times;
            </button>
          </div>

          <!-- Modal body -->
          <div class="modal-body">
            <form v-on:submit.prevent>
              <!-- <h6 class="float-left text-success">ชื่อวิชาเรียน/หลักสูตร</h6> -->
              <label for="product_link" class="text-primary">
                สร้างหมวดหมู่
              </label>
              <b-form-tags
                v-model="expenseTemplate.type"
                no-outer-focus
                tag-variant="success"
                class="mb-4"
              >
                <template
                  v-slot="{
                    tags,
                    inputAttrs,
                    inputHandlers,
                    tagVariant,
                    addTag,
                    removeTag,
                  }"
                >
                  <b-input-group class="mb-2">
                    <b-form-input
                      v-bind="inputAttrs"
                      v-on="inputHandlers"
                      placeholder="กดปุ่มAdd หรือ กดEnter เพื่อเพิ่ม"
                      class="form-control"
                    ></b-form-input>
                    <b-input-group-append>
                      <b-button @click="addTag()" variant="success"
                        >Add</b-button
                      >
                    </b-input-group-append>
                  </b-input-group>
                  <div class="d-inline-block" style="font-size: 1.3rem">
                    <b-form-tag
                      v-for="tag in tags"
                      @remove="removeTag(tag)"
                      :key="tag"
                      :title="tag"
                      :variant="tagVariant"
                      class="mr-1"
                      >{{ tag }}</b-form-tag
                    >
                  </div>
                </template>
              </b-form-tags>
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
              @click="updateKeyword()"
              type="button"
              class="btn btn-success"
            >
              บันทึกข้อมูล
            </button>
          </div>
        </div>
      </div>
    </div>
    <!--End The template Modal -->
  </div>
</template>

<script>
import { db } from "../../firebase";
import moment from "moment";

export default {
  name: "addcourse",

  data() {
    return {
      columns: [
        {
          label: "วันที่",
          field: "date",
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
          label: "จำนวน",
          field: "amount",
          type: "text",
        },
        {
          label: "แก้ไข",
          field: "edit",
          type: "text",
        },
        {
          label: "ลบ",
          field: "delete",
          type: "text",
        },
      ],

      modal: null,
      expenseTemplate: {
        // courseName: [],
        // courseType: [],
        // level: [],
        // rate: [],
      },
      itemDatas: [],
      itemData: {
        date: moment().add('543','year').format('DD/MM/YYYY'),
        type: "",
        list: "",
        docId: "",
      },
    };
  },
  methods: {
    getItemdataTemplate() {
      const Ref = db.collection("expenseTemplate");
      const unsub = Ref.onSnapshot(
        (docSnapshot) => {
          if (docSnapshot.empty) {
            console.log("No matching documents.");
            return;
          }
          docSnapshot.forEach((doc) => {
            this.expenseTemplate = doc.data();
            // console.log(doc.id, "=>", doc.data());
          });
        },
        (err) => {
          console.log(`Encountered error: ${err}`);
        }
      );
    },

    updateKeyword() {
      db.collection("expenseTemplate")
        .doc("detail")
        .set(this.expenseTemplate, { merge: true })
        .then(
          () => {
            Swal.fire({
              title: "อัพเดทเรียบร้อย",
              text: "อัพเดท template เรียบร้อย",
              icon: "success",
              confirmButtonColor: "#30855c",
              confirmButtonText: "ตกลง",
            });
            $("#expenseTemplate").modal("hide");
          }

          // { merge: true }
        );
    },

    deletecourse(doc) {
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
          db.collection("courses")
            .doc(doc)
            .delete()
            .then(() => {
              Swal.fire({
                title: "ทำการลบเรียบร้อย",
                text: "ได้ทำการลบข้อมูลเรียบร้อย",
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
      this.course = {
        courseName: null,
        class: null,
        beginRate: null,
        mediumRate: null,
        topRate: null,
        teacherRate: null,
      };
    },

    editExpense(itemData) {
      this.modal = "edit";
      // console.log(couseId);
      this.itemData = itemData;
    },

    updatecourse(docId) {
      // alert(docId)
      db.collection("courses")
        .doc(docId)
        .update(this.itemData)
        .then(() => {
          Swal.fire({
            title: "อัพเดทข้อมูล",
            text: "ได้ทำการupdateสินค้าเรียบร้อย",
            icon: "success",
            confirmButtonColor: "#30855c",
            confirmButtonText: "ตกลง",
          });
          $("#course").modal("hide");
          this.reset();
        });
    },

    async addItemData() {
      try {
        await db.collection("expenseTable").add(this.itemData);
        Swal.fire({
          title: "เพิ่มข้อมูลเรียบร้อย",
          text: "ได้ทำการเพิ่มข้อมูลแล้วเรียบร้อย",
          icon: "success",
          confirmButtonColor: "#30855c",
          confirmButtonText: "ตกลง",
        });
        $("#modal1").modal("hide");
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

    getItemdata() {
      db.collection("expenseTable").onSnapshot((querySnapshot) => {
        this.itemDatas = [];
        querySnapshot.forEach((doc) => {
          let itemData = {
            date:doc.data().date,
            type: doc.data().type,
            list: doc.data().list,
            amount: doc.data().amount,
            docId: doc.id,
          };
          this.itemDatas.push(itemData);
          console.log(this.itemDatas);
        });
      });
    },
  },

  mounted() {
    this.getItemdata();
    this.getItemdataTemplate();
    window.scrollTo(0, 0);
  },
};
</script>

<style></style>
