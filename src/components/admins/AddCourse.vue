<template>
  <div id="addcourse" class="shadow">
    <div class="container-fluid jumbotron">
      <div class="">
        <h4 class="text-center text-success mb-4">หลักสูตรและค่าเรียน</h4>
        <!-- <h5 class="d-inline-block text-success">รายวิชาเรียน</h5> -->
        <button
          @click="addNew"
          class="btn btn-info d-inline-block px-2"
          data-toggle="modal"
          data-target="#courseTemplate"
        >
          สร้างแม่แบบ
        </button>
        <button
          @click="addNew"
          class="btn btn-success d-inline-block float-right px-3"
          data-toggle="modal"
          data-target="#course"
        >
          เพิ่มวิชาเรียน
        </button>
      </div>

      <div class="mt-3 shadow">
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
          compactMode
        >
          <template slot="table-row" slot-scope="props">
            <span v-if="props.column.field == 'edit'">
              <div
                class="btn btn-warning"
                @click="editcourse(props.row)"
                data-toggle="modal"
                data-target="#course"
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
    </div>

    <!--Start The Modal -->
    <div class="modal fade" id="course">
      <div class="modal-dialog">
        <div class="modal-content">
          <!-- Modal Header -->
          <div class="modal-header">
            <h4 v-if="modal == 'new'" class="modal-title w-100 text-center text-success">
              เพิ่มวิชาเรียน
            </h4>
            <h4 v-if="modal == 'edit'" class="modal-title w-100 text-center text-warning">
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
                <select
                  class="form-control"
                  id="courseType"
                  v-model="course.courseName"
                >
                  <option disabled value="">เลือกวิชาเรียน</option>
                  <option v-for="(item, index) in courseTemplate.courseName" :key="index">
                    {{ item }}
                  </option>
                </select>
              </div>

              <div class="form-group">
                <label for="courseType" class="text-success mt-2"
                  >รูปแบบการเรียน</label
                >
                <div class="input-group mb-2">
                  <div class="input-group-prepend">
                    <span class="input-group-text">
                      <i class="fas fa-users"></i>
                    </span>
                  </div>
                  <select
                    class="form-control"
                    id="courseType"
                    v-model="course.class"
                  >
                    <option disabled value="">เลือกรูปแบบการเรียน</option>
                    <option v-for="(item, index) in courseTemplate.courseType" :key="index">
                    {{ item }}
                  </option>
                  </select>
                </div>
              </div>

              <div class="form-group">
                <label for="courseType" class="text-success mt-2"
                  >อัตราค่าเรียน ชั้นต้น</label
                >
                <div class="input-group mb-2">
                  <div class="input-group-prepend">
                    <span class="input-group-text">
                      <i class="fas fa-star-half-alt"></i>
                    </span>
                  </div>
                  <select
                    class="form-control"
                    id="courseType"
                    v-model="course.beginRate"
                  >
                    <option disabled value="">เลือกเรทราคา</option>
                    <option v-for="(item, index) in courseTemplate.rate" :key="index" :value="item">
                    {{ item }}
                  </option>
                  </select>
                </div>
              </div>

              <div class="form-group">
                <label for="courseType" class="text-success mt-2"
                  >อัตราค่าเรียน ชั้นกลาง</label
                >
                <div class="input-group mb-2">
                  <div class="input-group-prepend">
                    <span class="input-group-text">
                      <i class="fas fa-star"></i>
                    </span>
                  </div>
                  <select
                    class="form-control"
                    id="courseType"
                    v-model="course.mediumRate"
                  >
                    <option disabled>เลือกเรทราคา</option>
                    <option v-for="(item, index) in courseTemplate.rate" :key="index">
                    {{ item }}
                  </option>
                  </select>
                </div>
              </div>

              <div class="form-group">
                <label for="courseType" class="text-success mt-2"
                  >อัตราค่าเรียน ชั้นสูง</label
                >
                <div class="input-group mb-2">
                  <div class="input-group-prepend">
                    <span class="input-group-text">
                      <i class="fas fa-grin-stars"></i>
                    </span>
                  </div>
                  <select
                    class="form-control"
                    id="courseType"
                    v-model="course.topRate"
                  >
                    <option disabled>เลือกเรทราคา</option>
                    <option v-for="(item, index) in courseTemplate.rate" :key="index">
                    {{ item }}
                  </option>
                  </select>
                </div>
              </div>

              <div class="form-group">
                <label for="courseType" class="text-success mt-2"
                  >อัตราค่าเรียน ครูพิเศษ</label
                >
                <div class="input-group mb-2">
                  <div class="input-group-prepend">
                    <span class="input-group-text">
                      <i class="fas fa-medal"></i>
                    </span>
                  </div>
                  <select
                    class="form-control"
                    id="courseType"
                    v-model="course.teacherRate"
                  >
                    <option disabled>เลือกเรทราคา</option>
                    <option v-for="(item, index) in courseTemplate.rate" :key="index">
                    {{ item }}
                  </option>
                  </select>
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

    <!--Start The template Modal -->
    <div class="modal fade" id="courseTemplate">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <!-- Modal Header -->
          <div class="modal-header">
            <h4 class="modal-title w-100 text-center text-secondary">สร้างแม่แบบ</h4>

            <button type="button" class="close" data-dismiss="modal">
              &times;
            </button>
          </div>

          <!-- Modal body -->
          <div class="modal-body">
            <form v-on:submit.prevent>
              <!-- <h6 class="float-left text-success">ชื่อวิชาเรียน/หลักสูตร</h6> -->
              <label for="product_link" class="text-primary">
                ชื่อวิชาเรียน/หลักสูตร
              </label>
              <b-form-tags
                v-model="courseTemplate.courseName"
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

              <div class="form-group">
                <label for="product_link" class="text-success">
                  รูปแบบการเรียน
                </label>
                <b-form-tags
                  v-model="courseTemplate.courseType"
                  tag-variant="success"
                  no-outer-focus
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
              </div>

              <div class="form-group">
                <label for="product_link" class="text-success">
                  ระดับการเรียน
                </label>
                <b-form-tags
                  v-model="courseTemplate.level"
                  tag-variant="success"
                  no-outer-focus
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
              </div>

              <div class="form-group">
                <label for="product_link" class="text-success">
                  อัตราค่าเรียน
                </label>
                <b-form-tags
                  v-model="courseTemplate.rate"
                  tag-variant="success"
                  no-outer-focus
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
export default {
  name: "addcourse",

  data() {
    return {
      columns: [
        {
          label: "วิชา/หลักสูตร",
          field: "courseName",
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
      courseTemplate: {
        // courseName: [],
        // courseType: [],
        // level: [],
        // rate: [],
      },
      courses: [],
      course: {
        courseName: '',
        class: '',
        beginRate: '',
        mediumRate: '',
        topRate: '',
        teacherRate: '',
      },
    };
  },
  methods: {
    getCoursetemplate() {
      const userRef = db.collection("courseTemplate");
      const unsub = userRef.onSnapshot(
        (docSnapshot) => {
          if (docSnapshot.empty) {
            console.log("No matching documents.");
            return;
          }
          docSnapshot.forEach((doc) => {
            this.courseTemplate = doc.data();
            // console.log(doc.id, "=>", doc.data());
          });
        },
        (err) => {
          console.log(`Encountered error: ${err}`);
        }
      );
    },

    updateKeyword() {
      db.collection("courseTemplate")
        .doc("detail")
        .set(this.courseTemplate,{ merge: true })
        .then(
          () => {
            Swal.fire({
              title: "อัพเดทเรียบร้อย",
              text: "อัพเดท template เรียบร้อย",
              icon: "success",
              confirmButtonColor: "#30855c",
              confirmButtonText: "ตกลง",
            });
            $("#courseTemplate").modal("hide");
          },

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
          title: "เพิ่มข้อมูลเรียบร้อย",
          text: "ได้ทำการเพิ่มข้อมูลแล้วเรียบร้อย",
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
            courseName: doc.data().courseName,
            class: doc.data().class,
            beginRate: doc.data().beginRate,
            mediumRate: doc.data().mediumRate,
            topRate: doc.data().topRate,
            teacherRate: doc.data().teacherRate,
            couseId: doc.id,
          };
          this.courses.push(course);
          console.log(this.courses);
        });
      });
    },
  },

  mounted() {
    this.getcourses();
    this.getCoursetemplate();
    window.scrollTo(0, 0);
  },
};
</script>

<style>
</style>