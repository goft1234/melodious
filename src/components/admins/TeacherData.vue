<template>
  <div id="teacher" class="shadow">
    <div class="container-fluid jumbotron">
      <div class="">
        <h4 class="text-center text-success mb-4">ข้อมูลครู</h4>
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
            <span v-if="props.column.field == 'other'">
              <div
                class="btn btn-secondary"
                data-toggle="modal"
                data-target="#profileModal"
                @click="fullProfile(props.row)"
              >
                <i class="fa-solid fa-user"></i>
              </div>
            </span>
            <span v-else-if="props.column.field == 'status'">
              <select
                @change="changeStatus(props.row.uid, $event)"
                class="custom-select"
              >
                <option :selected="props.row.role.isTeacher" value="isTeacher">
                  ครู - อาจารย์
                </option>
                <option :selected="props.row.role.isAdmin" value="isAdmin">
                  Admin-(แอ็ดมิน)
                </option>
              </select>
            </span>
            <span v-else-if="props.column.field == 'edit'">
              <div
                v-if="props.row.canUpdate == true"
                class="btn btn-info"
                @click="openEditModal(props.row)"
              >
                <!-- data-toggle="modal"
              data-target="#invoiceModal" -->
                <i class="fas fa-edit"></i>
              </div>
              <div
                v-else
                class="btn btn-warning"
                @click="editProfile(props.row)"
              >
                <i class="fas fa-edit"></i>
              </div>
            </span>
            <span v-else-if="props.column.field == 'schedule'">
              <div class="btn btn-success" @click="otherProfile(props.row.uid)">
                <i class="fas fa-chalkboard-teacher"></i>
              </div>
            </span>
            <span v-else-if="props.column.field == 'delete'">
              <div class="btn btn-danger" @click="deleteTeacher(props.row.uid)">
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
                    :disabled="disabled == 1"
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
                    :disabled="disabled == 1"
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
                    :disabled="disabled == 1"
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
                    :disabled="disabled == 1"
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
                    :disabled="disabled == 1"
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
                    :disabled="disabled == 1"
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
                    :disabled="disabled == 1"
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
                    :disabled="disabled == 1"
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
                    :disabled="disabled == 1"
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
                    :disabled="disabled == 1"
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
                    :disabled="disabled == 1"
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
                    :disabled="disabled == 1"
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
                    :disabled="disabled == 1"
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
                    :disabled="disabled == 1"
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
                    :disabled="disabled == 1"
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
                    :disabled="disabled == 1"
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
                    :disabled="disabled == 1"
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
                    :disabled="disabled == 1"
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
                    :disabled="disabled == 1"
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
                    :disabled="disabled == 1"
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
                :disabled="disabled == 1"
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
                :disabled="disabled == 1"
              ></textarea>
            </div>
          </div>

          <!-- Modal footer -->
          <div class="modal-footer">
            <button
              @click="updateProfile(profile.uid)"
              type="button"
              class="btn btn-warning"
              v-if="modal == 'edit'"
            >
              แก้ไข
            </button>
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
          label: "สถานะ",
          field: "status",
          type: "text",
        },
        {
          label: "ข้อมูลอื่นๆ",
          field: "other",
          type: "text",
        },
        {
          label: "แก้ไข",
          field: "edit",
          type: "text",
        },
        {
          label: "ตารางสอน",
          field: "schedule",
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

      modal: null,
      disabled: 0,
      editPass: "123456",
      allow: false,
    };
  },

  methods: {
    changeStatus(uid, event) {
      var addMessage = functions.httpsCallable("changeTeacherToAdmin");
      var data = { uid: uid, role: { [event.target.value]: true } };
      // console.log(data);
      addMessage(data)
        .then((result) => {
          console.log(result);
          if (result) {
            Swal.fire({
              title: "ทำการปรับสถานะเรียบร้อย",
              text: "Admin ได้ทำการปรับสถานะ แล้วเรียบร้อย",
              icon: "success",
              confirmButtonColor: "#30855c",
              confirmButtonText: "ตกลง",
            });
            this.$store.state.show = false;
          }
        })
        .catch((error) => {
          console.log(error);
          Swal.fire({
            title: "เกิดข้อผิดพลาด",
            text: "เกิดข้อผิดพลาดที่ระบบ กรุณาลองใหม่อีกครั้ง",
            icon: "warning",
            confirmButtonColor: "#FF0000",
            confirmButtonText: "ตกลง",
          });
        });
    },

    otherProfile(userId) {
      console.log(userId);
      this.$router.push("/admin/teacherSchedule/" + userId);
    },

    fullProfile(profile) {
      // alert(profile.firstName);
      this.profile = profile;
      this.disabled = 1;
    },

    updateProfile(uid) {
      // alert(docId)
      this.profile.canUpdate = false;
      db.collection("teacherData")
        .doc(uid)
        .update(this.profile)
        .then(() => {
          Swal.fire({
            title: "อัพเดทข้อมูล",
            text: "ได้ทำการupdateข้อมูลเรียบร้อย",
            icon: "success",
            confirmButtonColor: "#30855c",
            confirmButtonText: "ตกลง",
          });
          $("#profileModal").modal("hide");
        });
    },

    openEditModal(profile) {
      db.collection("teacherData")
        .doc(profile.uid)
        .onSnapshot((doc) => {
          console.log("แก้ไขได้ป่าว", doc.data().canUpdate);
          this.allow = doc.data().canUpdate;
        });

      if (this.allow == true) {
        this.profile = profile;
        this.modal = "edit";
        this.disabled = 0;
        $("#profileModal").modal("show");
      }
    },

    async editProfile(profile) {
      const { value: password } = await Swal.fire({
        title: "กรอก Password",
        input: "password",
        icon: "question",
        inputLabel: "Password",
        inputPlaceholder: "กรอกรหัสเข้าแก้ไข",
        confirmButtonColor: "#30855c",
        inputAttributes: {
          maxlength: 10,
          autocapitalize: "off",
          autocorrect: "off",
        },
      });

      if (password == this.editPass) {
        db.collection("teacherData")
          .doc(profile.uid)
          .set({ canUpdate: true }, { merge: true })
          .then(() => {
            Swal.fire({
              title: "SUCCESS",
              text: "ทำการแก้ไขข้อมูลได้",
              icon: "success",
              confirmButtonColor: "#30855c",
              confirmButtonText: "ตกลง",
            });
          });
      } else {
        Swal.fire({
          title: "Incorrect password",
          text: "รหัสเข้าแก้ไขไม่ถูกต้อง",
          icon: "error",
          confirmButtonColor: "#FF0000",
          confirmButtonText: "ตกลง",
        });
      }
    },

    getData() {
      try {
        this.$store.state.show = true;
        db.collection("teacherData")
          // .where("role.isTeacher", "==", true)
          // .where("role.isAdmin", "==", true)
          .onSnapshot((querySnapshot) => {
            this.profiles = [];
            querySnapshot.forEach((doc) => {
              // if(!doc.data().role.isAdmin)
              // {
              // console.log(doc.data());
              if(doc.data().role.isAdmin || doc.data().role.isTeacher)
              {
                let profile = {
                uid: doc.id,
                addProfileAt: moment(doc.data().addProfileAt).format(
                  "DD/MM/YYYY HH:mm:ss"
                ),
                image: doc.data().image,
                canUpdate: doc.data().canUpdate,
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
                role: doc.data().role,

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
              }
            });
            this.$store.state.show = false;
          });
      } catch (err) {
        console.log(err);
        this.$store.state.show = false;
      }
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
    getEditPassword() {
      db.collection("passEdit")
        .doc("detail")
        .onSnapshot((doc) => {
          this.editPass = doc.data().password;
        });
    },
  },

  mounted() {
    window.scrollTo(0, 0);
    this.getData();
    this.getEditPassword();
  },
};
</script>

<style scoped></style>
