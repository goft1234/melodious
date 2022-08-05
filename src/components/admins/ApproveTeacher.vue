<template>
  <div id="teacher" class="shadow">
    <!-- <h5>อนุมัติผู้ใช้งานครู</h5> -->
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
        <span v-if="props.column.field == 'other'">
          <div
            class="btn btn-warning"
            data-toggle="modal"
            data-target="#profileModal"
            @click="fullProfile(props.row)"
          >
            <i class="fa-solid fa-user"></i>
          </div>
        </span>
        <span v-else-if="props.column.field == 'edit'">
          <div class="btn btn-success" @click="approveteacher(props.row)">
            <i class="fas fa-tasks"></i>
          </div>
        </span>
        <span v-else-if="props.column.field == 'delete'">
          <div class="btn btn-danger" @click="deleteTeacher(props.row.uid)">
            ลบ
          </div>
        </span>
        <!-- <span v-else>
        {{props.formattedRow[props.column.field]}}
      </span>       -->
      </template>
    </vue-good-table>

    <!-- The Modal -->
    <div class="modal fade" id="profileModal">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <!-- Modal Header -->
          <div class="modal-header">
            <h4 class="modal-title text-success w-100 text-center">
              ข้อมูลและประวัติครูผู้สอน
            </h4>
            <button type="button" class="close" data-dismiss="modal">
              &times;
            </button>
          </div>

          <!-- Modal body -->
          <div class="modal-body">
            <div class="row">
              <div class="col-lg-12">
                <div id="preview">
                  <img
                    v-if="profile.image"
                    :src="profile.image"
                    class="rounded-circle mx-auto d-block"
                    width="220"
                    height="220"
                    style="border: 5px solid white"
                  />
                </div>
              </div>
            </div>

            <h6 class="text-success text-right my-3">
              วัน-เวลา ที่สมัคร {{ profile.addProfileAt }}
            </h6>
            <div class="row">
              <div class="col-lg-6">
                <div class="form-group">
                  <label for="namePrefix" class="text-success">คำนำหน้า</label>
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
                  <label for="nickName" class="text-success">ชื่อเล่น</label>
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

            <div class="row">
              <div class="col-lg-6">
                <div class="form-group">
                  <label for="firstName" class="text-success">ชื่อจริง</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="กรอกชื่อจริง"
                    id="firstName"
                    v-model.trim="profile.firstName"
                    disabled
                  />
                </div>
              </div>
              <div class="col-lg-6">
                <div class="form-group">
                  <label for="lastName" class="text-success">นามสกุล</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="กรอกนามสกุล"
                    id="lastName"
                    v-model.trim="profile.lastName"
                    disabled
                  />
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-lg-6">
                <div class="form-group">
                  <label for="birthday" class="text-success"
                    >วัน/เดือน/ปี เกิด</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    placeholder="กรอกนามสกุล"
                    id="lastName"
                    v-model.trim="profile.birthday"
                    disabled
                  />
                </div>
              </div>
              <div class="col-lg-6">
                <div class="form-group">
                  <label for="email" class="text-success">อีเมล์ </label>
                  <input
                    type="email"
                    class="form-control"
                    placeholder="กรอกอีเมล์มี @"
                    id="อีเมล์"
                    v-model.trim="profile.email"
                    disabled
                  />
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-lg-6">
                <div class="form-group">
                  <label for="telephone" class="text-success"
                    >โทรศัพท์บ้าน</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    placeholder="ไม่มีให้ใส่ - "
                    id="telephone"
                    v-model.trim="profile.telephone"
                    disabled
                  />
                </div>
              </div>
              <div class="col-lg-6">
                <div class="form-group">
                  <label for="mobilephone" class="text-success"
                    >โทรศัพท์มือถือ</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    placeholder="กรอกนามสกุล"
                    id="mobilephone"
                    v-model.trim="profile.mobilephone"
                    disabled
                  />
                </div>
              </div>
            </div>

            <hr />
            <h5 class="text-left text-success my-3 font-weight-bold">
              รายละเอียดที่อยู่
            </h5>
            <div class="row mt-3">
              <div class="col-lg-6">
                <div class="form-group">
                  <label for="addressNumber" class="text-success"
                    >บ้านเลขที่
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="กรอกบ้านเลขที่ ตัวอย่าง 99/99 หมู่ 9"
                    id="อีเมล์"
                    v-model.trim="profile.address.addressNumber"
                    disabled
                  />
                </div>
              </div>
              <div class="col-lg-6">
                <div class="form-group">
                  <label for="location" class="text-success"
                    >หมู่บ้าน/ร้าน/บริษัท/อาคาร
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="ไม่มีใส่ - "
                    id="location"
                    v-model.trim="profile.address.location"
                    disabled
                  />
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-lg-6">
                <div class="form-group">
                  <label for="email" class="text-success">ตรอก/ซอย </label>
                  <input
                    type="email"
                    class="form-control"
                    placeholder="ไม่มีใส่ - "
                    id="อีเมล์"
                    v-model.trim="profile.address.soi"
                    disabled
                  />
                </div>
              </div>
              <div class="col-lg-6">
                <div class="form-group">
                  <label for="email" class="text-success">ถนน </label>
                  <input
                    type="email"
                    class="form-control"
                    placeholder="กรอกชื่อ ถนน"
                    id="อีเมล์"
                    v-model.trim="profile.address.road"
                    disabled
                  />
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-lg-6">
                <div class="form-group">
                  <label for="email" class="text-success">แขวง/ตำบล</label>
                  <input
                    type="email"
                    class="form-control"
                    placeholder="ไม่มีใส่ - "
                    id="อีเมล์"
                    v-model.trim="profile.address.district"
                    disabled
                  />
                </div>
              </div>
              <div class="col-lg-6">
                <div class="form-group">
                  <label for="email" class="text-success">เขต/อำเภอ </label>
                  <input
                    type="email"
                    class="form-control"
                    placeholder="กรอกชื่อ ถนน"
                    id="อีเมล์"
                    v-model.trim="profile.address.amphoe"
                    disabled
                  />
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-lg-6">
                <div class="form-group">
                  <label for="email" class="text-success">จังหวัด</label>
                  <input
                    type="email"
                    class="form-control"
                    placeholder="ไม่มีใส่ - "
                    id="อีเมล์"
                    v-model.trim="profile.address.province"
                    disabled
                  />
                </div>
              </div>
              <div class="col-lg-6">
                <div class="form-group">
                  <label for="email" class="text-success">รหัสไปรษณีย์ </label>
                  <input
                    type="email"
                    class="form-control"
                    placeholder="กรอกชื่อ ถนน"
                    id="อีเมล์"
                    v-model.trim="profile.address.zipcode"
                    disabled
                  />
                </div>
              </div>
            </div>
            <hr />
            <h5 class="text-left text-success my-3 font-weight-bold">
              ประวัติการศึกษา
            </h5>
            <div class="row">
              <div class="col-lg-6">
                <div class="form-group">
                  <label for="level" class="text-success">
                    ระดับการศึกษาสูงสุด</label
                  >
                  <input
                    type="email"
                    class="form-control"
                    placeholder="กรอกชื่อมหาวิทยาลัย"
                    id="email"
                    v-model="profile.graduated.degree"
                    disabled
                  />
                </div>
              </div>
              <div class="col-lg-6">
                <div class="form-group">
                  <label for="email" class="text-success">มหาวิทยาลัย</label>
                  <input
                    type="email"
                    class="form-control"
                    placeholder="กรอกชื่อมหาวิทยาลัย"
                    id="email"
                    v-model="profile.graduated.university"
                    disabled
                  />
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-lg-6">
                <div class="form-group">
                  <label for="email" class="text-success">คณะ</label>
                  <input
                    type="email"
                    class="form-control"
                    placeholder="กรอกคณะที่จบ"
                    id="email"
                    v-model="profile.graduated.faculty"
                    disabled
                  />
                </div>
              </div>
              <div class="col-lg-6">
                <div class="form-group">
                  <label for="email" class="text-success">เอก/สาขาวิชา</label>
                  <input
                    type="email"
                    class="form-control"
                    placeholder="กรอกเอก/สาขาวิชา"
                    id="email"
                    v-model="profile.graduated.major"
                    disabled
                  />
                </div>
              </div>
            </div>

            <hr />

            <div class="form-group">
              <label for="email" class="text-success">วิชาที่สอน</label>
              <input
                type="email"
                class="form-control"
                placeholder=""
                id="email"
                v-model="profile.subject"
                disabled
              />
            </div>

            <h5 class="text-left text-success my-3 font-weight-bold">
              ประวัติการสอน
            </h5>
            <div class="form-group">
              <textarea
                class="form-control"
                rows="5"
                id="comment"
                v-model="profile.workingProfile"
                disabled
              ></textarea>
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
  </div>
</template>

<script>
import { db, functions } from "../../firebase.js";
import firebase from "firebase/app";
import moment from "moment";

export default {
  name: "",
  data() {
    return {
      columns: [
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
          label: "เบอร์โทร",
          field: "mobilephone",
          type: "text",
        },
        {
          label: "วิชา",
          field: "subject",
          type: "text",
        },
        {
          label: "ข้อมูลอื่นๆ",
          field: "other",
          type: "text",
        },
        {
          label: "อนุมัติ",
          field: "edit",
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
        uid: "",
        addProfileAt: "",
        image: null,

        namePrefix: "",
        nickName: "",
        firstName: "",
        lastName: "",
        fullName: "",
        birthday: null,
        email: "",
        telephone: "",
        mobilephone: "",

        address: {
          addressNumber: "",
          location: "",
          soi: "",
          road: "",
          district: "",
          amphoe: "",
          province: "",
          zipcode: "",
        },

        graduated: {
          degree: "",
          university: "",
          faculty: "",
          major: "",
        },

        subject: "",
        workingProfile: "",
        profileType: "teacher",
      },
    };
  },

  methods: {
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
      this.profile = profile;
    },

    approveteacher(user) {
      Swal.fire({
        title: "ยืนยันการอนุมัติ",
        text: "ยืนยันการอนุมัติ ครูผู้สอน",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#30855c",
        cancelButtonColor: "#d33",
        confirmButtonText: "ยืนยัน",
      }).then(async (result) => {
        if (result.value) {
          this.$store.state.show = true;
          var templateRef = db.collection("courseTemplate").doc("detail");
          let data = {
            uid: user.uid,
            fullName: user.fullName,
          };

          return db
            .runTransaction((transaction) => {
              // This code may get re-run multiple times if there are conflicts.
              return transaction.get(templateRef).then(async (sfDoc) => {
                if (!sfDoc.exists) {
                  // throw "Document does not exist!";
                  await templateRef.set({
                    teacher: [],
                    courseName: [],
                    courseType: [],
                    level: [],
                    rate: [],
                  });
                  this.$store.state.show = false;
                }

                await templateRef.update({
                  teacher: firebase.firestore.FieldValue.arrayUnion(data),
                });
                var addFunctions = functions.httpsCallable("ApproveTeacher");
                await addFunctions(user);
                this.$store.state.show = false;
              });
            })
            .then(() => {
              Swal.fire({
                title: "อนุมัติผู้ใช้งานเรียบร้อย",
                text: "สามารถค้นหาผู้ใช้ ได้ที่หน้าข้อมูลครูผู้สอน",
                icon: "success",
                confirmButtonColor: "#30855c",
                confirmButtonText: "ตกลง",
              });
              this.$store.state.show = false;
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
        }else{
          this.$store.state.show = false;
        }
      });
    },

    getTeacher() {
      try {
        this.$store.state.show = true;
        db.collection("teacherData")
          .where("role.isProfile", "==", true)
          .orderBy("addProfileAt", "desc")
          .onSnapshot((querySnapshot) => {
            this.profiles = [];
            querySnapshot.forEach((doc) => {
              // if(!doc.data().role.isAdmin)
              // {
              // console.log(doc.data());
              let profile = {
                uid: doc.id,
                addProfileAt: moment(doc.data().addProfileAt).add(543,'year').format(
                  "LLL"
                ),
                image: doc.data().image,

                namePrefix: doc.data().namePrefix,
                nickName: doc.data().nickName,
                firstName: doc.data().firstName,
                lastName: doc.data().lastName,
                fullName: doc.data().fullName,
                birthday: doc.data().birthday,
                email: doc.data().email,
                telephone: doc.data().telephone,
                mobilephone: doc.data().mobilephone,
                profileType: "teacher",

                address: {
                  addressNumber: doc.data().address.addressNumber,
                  location: doc.data().address.location,
                  soi: doc.data().address.soi,
                  road: doc.data().address.road,
                  district: doc.data().address.district,
                  amphoe: doc.data().address.amphoe,
                  province: doc.data().address.province,
                  zipcode: doc.data().address.zipcode,
                },

                graduated: {
                  degree: doc.data().graduated.degree,
                  university: doc.data().graduated.university,
                  faculty: doc.data().graduated.faculty,
                  major: doc.data().graduated.major,
                },
                subject: doc.data().subject,
                workingProfile: doc.data().workingProfile,
                commited: "ครู",
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
    this.getTeacher();
  },
};
</script>

<style scoped>
</style>