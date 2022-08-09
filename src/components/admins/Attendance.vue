<template>
  <div id="teacher" class="shadow">
    <div class="container-fluid jumbotron">
      <div class="">
        <h4 class="text-center text-success mb-4">บันทึกการเข้าเรียน</h4>
      </div>
      <div class="mt-3 shadow">
        <vue-good-table
          :columns="columns"
          :rows="profiles"
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
                    <div class="mt-3">
                      <div class="row text-left">
                        <div class="col-lg-4 col-md-6">
                          <div>
                            Inv No.
                            <span class="text-success">{{
                              profile.invoiceNo
                            }}</span>
                          </div>
                        </div>
                        <div class="col-lg-4 col-md-6">
                          <div>
                            ชั้นเรียน
                            <span class="text-success">{{
                              profile.classType
                            }}</span>
                          </div>
                        </div>
                        <div class="col-lg-4 col-md-6">
                          <div>
                            วันที่
                            <span class="text-success">{{
                              profile.nowDate
                            }}</span>
                          </div>
                        </div>
                        <div class="col-lg-4 col-md-6">
                          <div>
                            ชื่อ-นามสกุล
                            <span class="text-success"
                              >{{ profile.firstName }}
                              {{ profile.lastName }}</span
                            >
                          </div>
                        </div>
                        <div class="col-lg-4 col-md-6">
                          <div>
                            รหัสนักเรียน
                            <span class="text-success">{{
                              profile.studentId
                            }}</span>
                          </div>
                        </div>
                        <div class="col-lg-4 col-md-6">
                          <div>
                            ชื่อเล่น
                            <span class="text-success">{{
                              profile.nickName
                            }}</span>
                          </div>
                        </div>
                        <div class="col-lg-4 col-md-6">
                          <div>
                            ชื่อ-นามสกุล ครู
                            <span class="text-success">{{
                              profile.teacherfullName
                            }}</span>
                          </div>
                        </div>
                        <div class="col-lg-4 col-md-6">
                          <div>
                            วันเรียน
                            <span class="text-success">{{ profile.day }}</span>
                          </div>
                        </div>
                        <div class="col-lg-4 col-md-6">
                          <div>
                            เวลาเรียน
                            <span class="text-success"
                              >{{ profile.startTime }}-{{
                                profile.finishTime
                              }}</span
                            >
                          </div>
                        </div>
                        <div class="col-lg-4 col-md-6">
                          <div>
                            เบอร์โทร
                            <span class="text-success">{{
                              profile.mobilephone
                            }}</span>
                          </div>
                        </div>
                        <div class="col-lg-4 col-md-6">
                          <div>
                            วิชา
                            <span class="text-success">{{
                              profile.courseName
                            }}</span>
                          </div>
                        </div>
                        <div class="col-lg-4 col-md-6">
                          <div>
                            จำนวน ชม.
                            <span class="text-success">{{
                              profile.amount
                            }}</span>
                          </div>
                        </div>
                        <div class="col-lg-4 col-md-6">
                          <div>
                            โปรโมชั่น
                            <span class="text-success"
                              >เซตเสือน้อย5%แถมฟรี1ครั้ง</span
                            >
                          </div>
                        </div>
                        <div class="col-lg-4 col-md-6">
                          <div>
                            วันที่เริ่มเรียน
                            <span class="text-success">{{
                              profile.startDate
                            }}</span>
                          </div>
                        </div>
                        <div class="col-lg-4 col-md-6">
                          <div>
                            วันที่เรียนจบ
                            <span class="text-success">{{
                              profile.endDate
                            }}</span>
                          </div>
                        </div>
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
                  <b-card-body> </b-card-body>
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

    <!-- The Modal -->
    <div class="modal fade" id="myModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <!-- Modal Header -->
          <div class="modal-header">
            <h4 class="modal-title">Modal Heading</h4>
            <button type="button" class="close" data-dismiss="modal">
              &times;
            </button>
          </div>

          <!-- Modal body -->
          <div class="modal-body">Modal body..</div>

          <!-- Modal footer -->
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-dismiss="modal">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
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
          field: "teacherName.teacherName",
          type: "text",
        },
        {
          label: "นักเรียน",
          field: "firstName",
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
          label: "เวลาเรียน",
          field: "startTime",
          type: "text",
        },
        {
          label: "บันทึก",
          field: "attendance",
          type: "text",
        },
        {
          label: "เช็คชื่อเข้าเรียน",
          field: "check",
          type: "text",
        },
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
      }).then( async (result) => {
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
        }
        else{
          this.$store.state.show = false;
        }
      });
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
          console.log("Transaction failed: ", error);
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
      console.log(date);
    },

    getData() {
      try {
        this.$store.state.show = true;
        var date = moment().isoWeekday();
        console.log(date);
        db.collection("courseActive")
          .where("day.dayNum", "==", date)
          .where("amount", ">=", 1)
          .onSnapshot((querySnapshot) => {
            this.profiles = [];
            querySnapshot.forEach((doc) => {
              // if(!doc.data().role.isAdmin)
              // {
              // console.log(doc.data());
              let profile = {
                nowDate: moment(Date.now()).format("ll"),
                courseId: doc.id,
                amount: doc.data().amount,
                classType: doc.data().classType,
                courseName: doc.data().courseName,
                day: doc.data().day.item,
                discount: doc.data().discount,
                endDate: moment(parseInt(doc.data().endDate)).format("ll"),
                finishTime: moment(doc.data().finishTime, "HH:mm:ss").format(
                  "HH:mm"
                ),
                firstName: doc.data().firstName,
                invoiceNo: doc.data().invoiceNo,

                lastName: doc.data().lastName,
                level: doc.data().level,
                mobilephone: doc.data().mobilephone,
                nickName: doc.data().nickName,
                price: doc.data().price,
                qty: doc.data().qty,
                startDate: moment(parseInt(doc.data().startDate)).format("ll"),
                startTime: moment(doc.data().startTime, "HH:mm:ss").format(
                  "HH:mm"
                ),
                studentId: doc.data().studentId,
                teacherId: doc.data().teacherId,
                teacherName: doc.data().teacherName,
                teacherfullName : doc.data().teacherName.teacherName,
                uid: doc.data().uid,
              };
              this.profiles.push(profile);
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
    window.scrollTo(0, 0);
    this.getData();
  },
};
</script>

<style scoped></style>
