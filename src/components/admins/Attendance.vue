<template>
  <div id="teacher" class="shadow">
    <div class="container-fluid jumbotron">
      <div class="">
        <h4 class="text-center text-success mb-4">บันทึกการเข้าเรียน</h4>
        <button
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
          สร้างห้องเรียน
        </button>
      </div>
      <!-- <pre>{{JSON.stringify(groupData, null, 2)}}</pre> -->
      <div class="mt-3 shadow">
        <vue-good-table
          :columns="columns"
          :rows="classrooms"
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
          <!-- props.row คือ profiles -->
          <template slot="table-row" slot-scope="props">
            <!-- <span v-if="props.column.field == 'role'">
          <select @change="changeRole(props.row.uid, $event)" class="custom-select">
            <option :selected="props.row.role.isprofile" value="isprofile">profile</option>
            <option :selected="props.row.role.isAgent" value="isAgent">AGENT</option>
            <option :selected="props.row.role.isAdmin" value="isAdmin">ADMIN</option>
          </select>
      </span> -->
            <!-- @click="fullProfile(props.row)" -->
            <span v-if="props.column.field == 'attendance'">
              <div
                class="btn btn-warning"
                data-toggle="modal"
                data-target="#profileModal"
                @click="fullProfile(props.row)"
              >
                <i class="fas fa-table"></i>
              </div>
            </span>
            <span v-else-if="props.column.field == 'studentAtClass'">
              <div v-for="(item,index) in props.row.studentAtClass" :key="index">
                <h6>{{item.firstName}}</h6>
              </div>
 
              
            </span>
            <span v-else-if="props.column.field == 'studentId'">
              <div v-for="(item,index) in props.row.studentAtClass" :key="index">
                <h6>{{item.studentId}}</h6>
              </div>
 
              
            </span>
            <span v-else-if="props.column.field == 'check'">
              <div class="btn btn-success" @click="stdAttend(props.row)">
                <i class="fas fa-check-circle"></i>
              </div>
            </span>
            <span v-else-if="props.column.field == 'delete'">
              <div class="btn btn-danger" @click="deleteTeacher(props.row.uid)">
                <i class="fas fa-trash-alt"></i>
              </div>
            </span>
            <!-- <span v-else>
        {{props.formattedRow[props.column.field]}}
      </span>       -->
          </template>
        </vue-good-table>
      </div>
    </div>

    <!-- The Modal -->
    <div class="modal fade" id="profileModal">
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <!-- Modal Header -->
          <div class="modal-header">
            <h4 class="modal-title text-success w-100 text-center">
              บันทึกการเข้าเรียน
            </h4>
            <button type="button" class="close" data-dismiss="modal">
              &times;
            </button>
          </div>

          <!-- Modal body -->
          <div class="modal-body">
            <div class="accordion" role="tablist">
              <b-card no-body class="mb-1">
                <b-card-header header-tag="header" class="p-1" role="tab">
                  <b-button block v-b-toggle.accordion-1 variant="success"
                    >รายละเอียดวิชาเรียน</b-button
                  >
                </b-card-header>
                <b-collapse
                  id="accordion-1"
                  visible
                  accordion="my-accordion"
                  role="tabpanel"
                >
                  <b-card-body>
                    <!-- style="background: #e9ecef" -->

                  </b-card-body>
                </b-collapse>
              </b-card>

              <b-card no-body class="mb-1">
                <b-card-header header-tag="header" class="p-1" role="tab">
                  <b-button block v-b-toggle.accordion-2 variant="success"
                    >บันทึกการสอน</b-button
                  >
                </b-card-header>
                <b-collapse
                  id="accordion-2"
                  accordion="my-accordion"
                  role="tabpanel"
                >
                  <b-card-body> </b-card-body>
                </b-collapse>
              </b-card>

              <b-card no-body class="mb-1">
                <b-card-header header-tag="header" class="p-1" role="tab">
                  <b-button block v-b-toggle.accordion-3 variant="success"
                    >แก้ไข</b-button
                  >
                </b-card-header>
                <b-collapse
                  id="accordion-3"
                  accordion="my-accordion"
                  role="tabpanel"
                >
                  <b-card-body> </b-card-body>
                </b-collapse>
              </b-card>
            </div>

            <div class="row">
              <div class="col-md-12">
                <!-- Button to Open the Modal -->
                <!-- <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal">
                        Open modal
                </button> -->
              </div>
            </div>

            <!-- <div class="table-responsive-lg">
              <table
                class="table table-bordered table-striped mt-3 text-center"
              >
                <thead>
                  <tr class="bg-success text-light">
                    <th>วันที่</th>
                    <th>นักเรียน</th>
                    <th>อาจารย์</th>
                    <th>รายละเอียด</th>
                    <th>รายเซ็นต์</th>
                    <th>Edit</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="justify-content-center align-center">
                    <td>19มี.ค.65</td>
                    <td>A</td>
                    <td class="text-left">
                      <div class="form-check">
                        <label class="form-check-label">
                          <input
                            type="checkbox"
                            class="form-check-input"
                            value=""
                          />มา
                        </label>
                      </div>
                      <div class="form-check">
                        <label class="form-check-label">
                          <input
                            type="checkbox"
                            class="form-check-input"
                            value=""
                          />ไม่มา
                        </label>
                      </div>
                    </td>
                    <td>
                      <div class="form-group">
                        <label for="comment">Comment:</label>
                        <textarea
                          class="form-control"
                          rows="5"
                          id="comment"
                        ></textarea>
                      </div>
                    </td>
                    <td>Doe</td>
                    <td>john@example.com</td>
                  </tr>
                </tbody>
              </table>
            </div> -->
            <!-- <h6 class="float-right text-success">12/27/2022</h6> -->
            <div class="card mt-3">
              <div class="card-footer">
                <div class="row">
                  <div class="col-lg-6">
                    <div class="form-group">
                      <label for="namePrefix" class="text-success"
                        >วันที่</label
                      >
                      <input
                        type="text"
                        class="form-control"
                        placeholder="กรอกชื่อเล่น"
                        id="namePrefix"
                        v-model.trim="profile.namePrefix"
                        disabled
                      />
                    </div>
                  </div>

                  <div class="col-lg-6">
                    <div class="form-group">
                      <label for="nickName" class="text-success">วันที่</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="กรอกชื่อเล่น"
                        id="nickName"
                        v-model.trim="profile.nickName"
                        disabled
                      />
                      <!-- <span> : {{ profile.nickName }}</span> -->
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
    <!-- </b-overlay> -->

    <!--Start The Classroom Modal -->
    <div class="modal fade" id="course">
      <div class="modal-dialog modal-dialog-scrollable modal-xl">
        <div class="modal-content">
          <!-- Modal Header -->
          <div class="modal-header">
            <h4
              v-if="modal == 'new'"
              class="modal-title w-100 text-center text-success"
            >
              สร้างห้องเรียน
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
              <!-- <h6 class="float-left text-success mb-2">ชื่อวิชาเรียน/หลักสูตร</h6> -->
              <div class="p-3" style="background: #e9ecef">
                <div class="row">
                  <div class="col-lg-6">
                    <div class="form-group">
                      <label for="nickName" class="text-success"
                        >วิชาเรียน</label
                      >
                      <select
                        class="form-control"
                        id="namePrefix"
                        v-model="classroom.courseName"
                      >
                        <option disabled value="">เลือก วิชาเรียน</option>
                        <option
                          v-for="(item, index) in courseNameTemplate"
                          :value="item"
                          :key="index"
                        >
                          {{ item }}
                        </option>
                      </select>
                    </div>
                  </div>

                  <div class="col-lg-6">
                    <div class="form-group">
                      <label for="nickName" class="text-success"
                        >รูปแบบการเรียน</label
                      >
                      <select
                        class="form-control"
                        id="namePrefix"
                        v-model="classroom.classType"
                      >
                        <option disabled value="">เลือก รูปแบบการเรียน</option>
                        <option
                          v-for="(item, index) in courseTypeTemplate"
                          :value="item"
                          :key="index"
                        >
                          {{ item }}
                        </option>
                      </select>
                    </div>
                  </div>

                  <div class="col-lg-6">
                    <div class="form-group">
                      <label for="nickName" class="text-success"
                        >ระดับการเรียน</label
                      >
                      <select
                        class="form-control"
                        id="namePrefix"
                        v-model="classroom.level"
                      >
                        <option disabled value="">เลือก ระดับการเรียน</option>
                        <option
                          v-for="(item, index) in levelTemplate"
                          :value="item"
                          :key="index"
                        >
                          {{ item }}
                        </option>
                      </select>
                    </div>
                  </div>

                  <div class="col-lg-6">
                    <div class="form-group">
                      <label for="nickName" class="text-success"
                        >อัตราค่าเรียน</label
                      >
                      <select
                        class="form-control"
                        id="namePrefix"
                        v-model="classroom.rate"
                      >
                        <option disabled value="">เลือก อัตราค่าเรียน</option>
                        <option
                          v-for="(item, index) in rateTemplate"
                          :value="item"
                          :key="index"
                        >
                          {{ item }}
                        </option>
                      </select>
                    </div>
                  </div>

                  <!-- <div class="col-lg-6">
                    <div class="form-group">
                      <label for="namePrefix" class="text-success"
                        >ส่วนลด โปรโมชั่น</label
                      >
                      <div class="form-group">
                        <input
                          type="number"
                          class="form-control"
                          placeholder="กรอกเป็นตัวเลข"
                          min="0"
                          v-model.trim="classroom.discount"
                        />
                      </div>
                    </div>
                  </div> -->

                  <div class="col-lg-6">
                    <div class="form-group">
                      <label for="nickName" class="text-success"
                        >อาจารย์รายวิชา</label
                      >
                      <select
                        class="form-control"
                        id="namePrefix"
                        v-model="classroom.teacherAtclass"
                      >
                        <option disabled value="">เลือก อาจารย์รายวิชา</option>
                        <option
                          v-for="(item, index) in teacherTemplate"
                          :value="{
                            teacherId: item.uid,
                            teacherName: item.fullName,
                          }"
                          :key="index"
                        >
                          {{ item.fullName }}
                        </option>
                      </select>
                      <!-- <span
                              >courseSelected:
                              {{ course.teacherAtclass }}</span
                            > -->
                    </div>
                  </div>

                  <div class="col-lg-6">
                    <div class="form-group">
                      <label for="namePrefix" class="text-success"
                        >ค่าสอนของครู</label
                      >
                      <div class="form-group">
                        <input
                          type="number"
                          class="form-control"
                          placeholder="กรอกเป็นตัวเลข"
                          min="0"
                          v-model.trim="classroom.wages"
                        />
                      </div>
                    </div>
                  </div>

                  <div class="col-lg-6">
                    <div class="form-group">
                      <label for="" class="text-success">เริ่มเรียน เวลา</label>
                      <div>
                        <b-form-timepicker
                          v-model="classroom.startTime"
                          locale="th"
                          placeholder="เลือก-เวลาเริ่มเรียน"
                        ></b-form-timepicker>
                        <!-- <div class="mt-2">Value: '{{ value }}'</div> -->
                      </div>
                    </div>
                  </div>

                  <div class="col-lg-6">
                    <div class="form-group">
                      <label for="" class="text-success">เลิกเรียน เวลา</label>
                      <div>
                        <b-form-timepicker
                          v-model="classroom.finishTime"
                          locale="th"
                          placeholder="เลือก-เวลาเลิกเรียน"
                        ></b-form-timepicker>
                        <!-- <div class="mt-2">Value: '{{ value }}'</div> -->
                      </div>
                    </div>
                  </div>

                  <div class="col-lg-6">
                    <div class="form-group">
                      <label for="" class="text-success"
                        >วันที่เริ่มเรียน</label
                      >
                      <div>
                        <b-form-datepicker
                          v-model="classroom.startDate"
                          locale="th"
                          placeholder="เลือก-วันที่เริ่มเรียน"
                        ></b-form-datepicker>
                        <!-- <div class="mt-2">Value: '{{ value }}'</div> -->
                      </div>
                    </div>
                  </div>

                  <div class="col-lg-6">
                    <div class="form-group">
                      <label for="" class="text-success"
                        >วันที่เรียนจบ โดยประมาณ</label
                      >
                      <div>
                        <b-form-datepicker
                          v-model="classroom.endDate"
                          locale="th"
                          placeholder="เลือก-วันที่เรียนจบ"
                        ></b-form-datepicker>
                        <!-- <div class="mt-2">Value: '{{ value }}'</div> -->
                      </div>
                    </div>
                  </div>

                  <div class="col-lg-6">
                    <div class="form-group">
                      <label for="namePrefix" class="text-success"
                        >วันที่เลือกเรียน</label
                      >
                      <select
                        class="form-control"
                        id="namePrefix"
                        v-model="classroom.dayAttend"
                      >
                        <option disabled value="">วันที่เลือกเรียน</option>
                        <option
                          v-for="(item, index) in dayTemplate"
                          :key="index"
                          :value="{ dayNum: index + 1, item }"
                        >
                          {{ item }}
                        </option>
                      </select>
                      <!-- <span>courseSelected: {{ course.daySelected }}</span> -->
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
                          placeholder="กรอกเป็นตัวเลข"
                          v-model.trim="classroom.amount"
                        />
                      </div>
                    </div>
                  </div>

                  <!-- <div class="col-lg-6">
                    <div class="form-group">
                      <label for="" class="text-success">จำนวนคอร์ส</label>
                      <div class="form-group">
                        <input
                          type="number"
                          class="form-control"
                          placeholder="กรอกเป็นตัวเลข"
                          min="1"
                          v-model.trim="classroom.qty"
                        />
                      </div>
                    </div>
                  </div> -->
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
              @click="addClassroom()"
              type="button"
              class="btn btn-success"
              v-if="modal == 'new'"
            >
              สร้างห้องเรียน
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
import { db, functions, fb } from "../../firebase.js";
import moment from "moment";

export default {
  name: "",
  data() {
    return {
      columns: [
        {
          label: "ครู",
          field: "teacherAtclass.teacherName",
          type: "text",
        },
        {
          label: "นักเรียน",
          field: "studentAtClass",
          type: "text",
        },
        {
          label: "รหัสนักเรียน",
          field: "studentId",
          type: "text",
        },
        {
          label: "วิชา",
          field: "courseName",
          type: "text",
        },
        {
          label: "ประเภท",
          field: "classType",
          type: "text",
        },
        {
          label: "ระดับ",
          field: "level",
          type: "text",
        },
        {
          label: "วันเรียน",
          field: "dayAttend.item",
          type: "text",
        },
        {
          label: "เวลาเรียน",
          field: "startTime",
          type: "text",
        },
        {
          label: "บันทึก",
          field: "attendance",
          type: "text",
        },
        // {
        //   label: "เช็คชื่อเข้าเรียน",
        //   field: "check",
        //   type: "text",
        // },
        {
          label: "delete",
          field: "delete",
          type: "text",
        },
      ],
      profiles: [],

      profile: {
        // amount: "",
        // addProfileAt: "",
        // image: null,
        // namePrefix: "",
        // nickName: "",
        // firstName: "",
        // lastName: "",
        // birthday: null,
        // email: "",
        // telephone: "",
        // mobilephone: "",
        // address: {
        //   addressNumber: "",
        //   location: "",
        //   soi: "",
        //   road: "",
        //   district: "",
        //   amphoe: "",
        //   province: "",
        //   zipcode: "",
        // },
        // graduated: {
        //   degree: "",
        //   university: "",
        //   faculty: "",
        //   major: "",
        // },
        // subject: "",
        // workingProfile: "",
        // profileType: "teacher",
      },
      
      classroom: {
        courseName: "",
        classType: "",
        level: "",
        rate: 0,
        teacherAtclass: "",
        dayAttend: "",
        amount: 12,
        startTime: "",
        wages: 0,
        finishTime: "",
        startDate: "",
        endDate: "",
        createdAt: Date.now(),
        studentAtClass:[],
      },

      courseNameTemplate: [],
      courseTypeTemplate: [],
      levelTemplate: [],
      rateTemplate: [],
      teacherTemplate: [],
      dayTemplate: ["จันทร์", "อังคาร", "พุธ", "พฤหัส", "ศุกร์", "เสาร์", "อาทิตย์"],

      modal: null,
      classrooms:[],
    };
  },

  methods: {
    stdAttend(attend) {
      Swal.fire({
        title: "ยืนยันการเข้าเรียน",
        text: "ยืนยันการอนุมัติ การเข้าเรียน",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#30855c",
        cancelButtonColor: "#d33",
        confirmButtonText: "ยืนยัน",
      }).then(async (result) => {
        if (result.value) {
          this.$store.state.show = true;
          var batch = db.batch();

          var newAmount = attend.amount - 1;
          var attendRef = db.collection("courseActive").doc(attend.courseId);
          batch.set(attendRef, { amount: newAmount }, { merge: true });

          var attendDataRef = db.collection("attendData").doc();
          batch.set(attendDataRef, attend, { merge: true });

          await batch.commit().then(() => {
            Swal.fire({
              title: "Success",
              text: "ทำการลงชื่อเข้าเรียนเรียบร้อย",
              icon: "success",
              confirmButtonColor: "#30855c",
              confirmButtonText: "ตกลง",
            });
            this.$store.state.show = false;
          });
        } else {
          this.$store.state.show = false;
        }
      });
    },

    reset() {
      // this.course = {
      //   courseName: null,
      //   class: null,
      //   beginRate: null,
      //   mediumRate: null,
      //   topRate: null,
      //   teacherRate: null,
      // };
    },
    async addClassroom() {
      try {
        await db.collection("classroom").add(this.classroom);
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
    addNew() {
      this.modal = "new";
      this.reset();
    },
    deleteTeacher(uid) {
      Swal.fire({
        title: "ต้องการลบ?",
        text: "ทำการลบแล้วไม่สามารถย้อนกลับได้",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#30855c",
        cancelButtonColor: "#d33",
        confirmButtonText: "ตกลง ลบข้อมูล",
      })
        .then((result) => {
          if (result.value) {
            this.$store.state.show = true;
            var del = functions.httpsCallable("deleteTeacher");
            var data = { uid: uid };

            del(data).then(() => {
              Swal.fire({
                title: "ทำการลบเรียบร้อย",
                text: "ได้ทำการลบผู้ใช้งานนี้เรียบร้อย",
                icon: "success",
                confirmButtonColor: "#30855c",
                confirmButtonText: "ตกลง",
              });
              this.$store.state.show = false;
            });
          }
        })
        .catch((error) => {
          // console.log("Transaction failed: ", error);
          Swal.fire({
            title: "เกิดข้อผิดพลาด",
            text: "เกิดข้อผิดพลาดที่ระบบ กรุณาลองใหม่อีกครั้ง",
            icon: "warning",
            confirmButtonColor: "#FF0000",
            confirmButtonText: "ตกลง",
          });
          this.$store.state.show = false;
        });
    },

    fullProfile(profile) {
      // alert(profile.firstName);
      // console.log(profile.courseId);
      this.profile = profile;
    },
    getDate() {
      var date = moment(Date.now()).day();
      // console.log(date);
    },

    async getCourseTemplate() {
      try {
        this.$store.state.show = true;
        const doc = await db.collection("courseTemplate").doc("detail").get();
        if (doc.empty) {
          console.log("No matching documents.");
          return;
        }
        this.courseNameTemplate = doc.data().courseName;
        this.courseTypeTemplate = doc.data().courseType;
        this.levelTemplate = doc.data().level;
        this.rateTemplate = doc.data().rate;
        this.teacherTemplate = doc.data().teacher;

        // console.log(this.cTeacher);
        // this.addNewItem();
        this.$store.state.show = false;
      } catch (err) {
        Swal.fire({
          title: "เกิดข้อผิดพลาดที่ระบบ",
          text: "ไม่สามารถดึงข้อมูล course เรียนได้ กรุณาลองใหม่อีกครั้ง",
          icon: "warning",
          confirmButtonColor: "#FF0000",
          confirmButtonText: "ตกลง",
        });
        this.$store.state.show = false;
      }
    },

    getClassroom() {
      try {
        this.$store.state.show = true;
        var date = moment().isoWeekday();
        // console.log(date);
        db.collection("classroom")
          // .where("day.dayNum", "==", date)
          // .where("amount", ">=", 1)
          .onSnapshot((querySnapshot) => {
            this.classrooms = [];
            querySnapshot.forEach((doc) => {
              // if(!doc.data().role.isAdmin)
              // {
              // console.log(doc.data());
              let classroom = {
                nowDate: moment().format("ll"),
                classId: doc.id,
                amount: doc.data().amount,
                classType: doc.data().classType,
                courseName: doc.data().courseName,
                dayAttend: doc.data().dayAttend,
                endDate: moment(parseInt(doc.data().endDate)).format("ll"),
                finishTime: moment(doc.data().finishTime, "HH:mm:ss").format(
                  "HH:mm"
                ),
                // firstName: doc.data().firstName,
                // invoiceNo: doc.data().invoiceNo,

                // lastName: doc.data().lastName,
                level: doc.data().level,
                // mobilephone: doc.data().mobilephone,
                // nickName: doc.data().nickName,
                rate: doc.data().rate,
                // qty: doc.data().qty,
                startDate: moment(parseInt(doc.data().startDate)).format("ll"),
                startTime: moment(doc.data().startTime, "HH:mm:ss").format(
                  "HH:mm"
                ),
                studentAtClass:doc.data().student,
                // studentId: doc.data().studentId,
                // teacherId: doc.data().teacherId,
                teacherAtclass: doc.data().teacherAtclass,
                // teacherfullName: doc.data().teacherName.teacherName,
                // uid: doc.data().uid,
              };
              this.classrooms.push(classroom);
              console.log(this.classrooms);
            });
            this.$store.state.show = false;
          });
      } catch (err) {
        console.log(err);
        this.$store.state.show = false;
      }
    },
  },

  computed: {
    groupData() {
      const groupByCategory = this.profiles.reduce((group, product) => {
        const { invoiceNo } = product;
        console.log({ invoiceNo });
        group[invoiceNo] = group[invoiceNo] ?? [];
        group[invoiceNo].push(product);
        // console.log(group[invoiceNo]);
        // console.log(JSON.stringify(groupByCategory, null, 2));
        // console.log(group);
        return group;
      }, {});
      return groupByCategory;
    },
  },

  mounted() {
    this.getCourseTemplate();
    this.getClassroom(),
    window.scrollTo(0, 0);
    // this.getData();
  },
};
</script>

<style scoped></style>
