<template>
  <div id="addcourse" class="shadow">
    <div class="container-fluid jumbotron">
      <div class="">
        <h4 class="text-center text-success mb-4">หลักสูตรและค่าเรียน</h4>
        <h5 class="d-inline-block text-success">รายวิชาเรียน</h5>
        <button
          @click="addNew"
          class="btn btn-success d-inline-block float-right px-5"
          data-toggle="modal"
          data-target="#course"
        >
          เพิ่มวิชาเรียน
        </button>
      </div>

      <div class="mt-3">
        <vue-good-table
          :columns="columns"
          :rows="courses"
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
                @click="editcourse(props.row)"
                data-toggle="modal"
                data-target="#course"
              >
                แก้ไข
              </div>
            </span>
            <span v-else-if="props.column.field == 'delete'">
              <div
                class="btn btn-danger"
                @click="deletecourse(props.row.couseId)"
              >
                ลบ
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
    <div class="modal fade" id="course">
      <div class="modal-dialog">
        <div class="modal-content">
          <!-- Modal Header -->
          <div class="modal-header">
            <h4 v-if="modal == 'new'" class="modal-title text-success">
              เพิ่มวิชาเรียน
            </h4>
            <h4 v-if="modal == 'edit'" class="modal-title text-warning">
              แก้ไขวิชาเรียน
            </h4>
            <button type="button" class="close" data-dismiss="modal">
              &times;
            </button>
          </div>

          <!-- Modal body -->
          <div class="modal-body">
            <form v-on:submit.prevent>
              <h6 class="float-left text-success">ชื่อวิชาเรียน/หลักสูตร</h6>
              <div class="input-group mb-2">
                <div class="input-group-prepend">
                  <span class="input-group-text">
                    <i class="fas fa-music"></i>
                  </span>
                </div>
                <input
                  type="text"
                  v-model.trim="course.couseName"
                  class="form-control"
                  placeholder="กรอกวิชาเรียน/หลักสูตร"
                />
              </div>

              <div class="form-group">
                <label for="classType" class="text-success mt-2"
                  >รูปแบบการเรียน</label
                >
                <select
                  class="form-control"
                  id="classType"
                  v-model="course.class"
                >
                  <option disabled>เลือกรูปแบบการเรียน</option>
                  <option>เดี่ยว</option>
                  <option>กลุ่ม</option>
                  <option>เดี่ยว30นาที</option>
                  <option>กลุ่ม 3 คนขึ้นไป</option>
                  <option>กลุ่ม 4 คนขึ้นไป</option>
                </select>
              </div>

              <h6 class="float-left text-success mt-2">
                อัตราค่าเรียน ชั้นต้น
              </h6>
              <div class="input-group mb-2">
                <div class="input-group-prepend">
                  <span class="input-group-text">
                    <i class="fas fa-star-half-alt"></i>
                  </span>
                </div>
                <input
                  type="text"
                  v-model.trim="course.beginRate"
                  class="form-control"
                  placeholder="อัตราค่าเรียน ชั้นต้น"
                />
              </div>

              <h6 class="float-left text-success mt-2">
                อัตราค่าเรียน ชั้นกลาง
              </h6>
              <div class="input-group mb-2">
                <div class="input-group-prepend">
                  <span class="input-group-text">
                    <i class="fas fa-star"></i>
                  </span>
                </div>
                <input
                  type="text"
                  v-model.trim="course.mediumRate"
                  class="form-control"
                  placeholder="อัตราค่าเรียน ชั้นกลาง"
                />
              </div>

              <h6 class="float-left text-success mt-2">
                อัตราค่าเรียน ชั้นสูง
              </h6>
              <div class="input-group mb-2">
                <div class="input-group-prepend">
                  <span class="input-group-text">
                    <i class="fas fa-grin-stars"></i>
                  </span>
                </div>
                <input
                  type="text"
                  v-model.trim="course.topRate"
                  class="form-control"
                  placeholder="อัตราค่าเรียน ชั้นสูง"
                />
              </div>

              <h6 class="float-left text-success mt-2">
                อัตราค่าเรียน ครูพิเศษ
              </h6>
              <div class="input-group mb-2">
                <div class="input-group-prepend">
                  <span class="input-group-text">
                    <i class="fas fa-medal"></i>
                  </span>
                </div>
                <input
                  type="text"
                  v-model.trim="course.teacherRate"
                  class="form-control"
                  placeholder="อัตราค่าเรียน ครูพิเศษ"
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
              @click="addcourse()"
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
  </div>
</template>

<script>
import { db } from "../../firebase";
export default {
  name: "addcourse",

  data() {
    return {
      columns: [
        {
          label: "วิชา/หลักสูตร",
          field: "couseName",
          type: "text",
        },
        {
          label: "ประเภท",
          field: "class",
          type: "text",
        },
        {
          label: "ชั้นต้น",
          field: "beginRate",
          type: "text",
        },
        {
          label: "ชั้นกลาง",
          field: "mediumRate",
          type: "text",
        },
        {
          label: "ชั้นสูง",
          field: "topRate",
          type: "text",
        },
        {
          label: "ครูพิเศษ",
          field: "teacherRate",
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

      courses: [],
      course: {
        couseName: null,
        class: null,
        beginRate: null,
        mediumRate: null,
        topRate: null,
        teacherRate: null,
      },
    };
  },
  methods: {
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
                title: "ทำการลบสินค้าเรียบร้อย",
                text: "ได้ทำการลบสินค้าเรียบร้อย",
                icon: "success",
                confirmButtonColor: "#30855c",
                confirmButtonText: "ตกลง",
              });
              this.chkAsset();
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
        couseName: null,
        class: null,
        beginRate: null,
        mediumRate: null,
        topRate: null,
        teacherRate: null,
      };
    },

    editcourse(course) {
      this.modal = "edit";
      // console.log(couseId);
      this.course = course;
    },

    updatecourse(docId) {
      // alert(docId)
      db.collection("courses")
        .doc(docId)
        .update(this.course)
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

    async addcourse() {
      try {
        await db.collection("courses").add(this.course);
        Swal.fire({
          title: "เรียบร้อย",
          text: "ได้ทำการเพิ่มสินค้าแล้วเรียบร้อย",
          icon: "success",
          confirmButtonColor: "#30855c",
          confirmButtonText: "ตกลง",
        });
        $("#course").modal("hide");
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

    getcourses() {
      db.collection("courses").onSnapshot((querySnapshot) => {
        this.courses = [];
        querySnapshot.forEach((doc) => {
          let course = {
            couseName: doc.data().couseName,
            class: doc.data().class,
            beginRate: doc.data().beginRate,
            mediumRate: doc.data().mediumRate,
            topRate: doc.data().topRate,
            teacherRate: doc.data().teacherRate,
            couseId: doc.id,
          };
          this.courses.push(course);
        });
      });
    },
  },

  mounted() {
    this.getcourses();
    window.scrollTo(0, 0);
  },
};
</script>

<style>
</style>