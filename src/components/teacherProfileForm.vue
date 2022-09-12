<template>
  <div class="container jumbotron">
    <h4 class="text-center text-success mb-3">ข้อมูลและประวัติครู</h4>
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
        <div class="text-center">
          <input
            type="file"
            class="mt-3 form-control-file bg-white p-1"
            @change="onFileChange"
          />
          <button class="btn btn-success mt-3" @click="uploadImage()">
            อัพโหลดรูปภาพ
          </button>
        </div>
      </div>
    </div>

    <!-- v-if="detailOpen" -->
    <form v-on:submit.prevent v-if="detailOpen">
      <div class="row mt-3">
        <div class="col-md-12">
          <div class="float-right">
            <h6 class="text-success font-weight-bold">วันที่ {{ dateNow }}</h6>
          </div>
        </div>
      </div>
      <span class="text-danger">*</span
      ><span class="text-success"> (จำเป็นต้องกรอกข้อมูล)</span>
      <h5 class="text-left text-success my-3 font-weight-bold">
        ข้อมูลส่วนตัวครู
      </h5>

      <div class="row">
        <div class="col-lg-6">
          <div class="form-group">
            <label for="namePrefix" class="text-success"
              ><span class="text-danger">*</span>คำนำหน้า</label
            >
            <select
              class="form-control"
              id="namePrefix"
              v-model="profile.namePrefix"
            >
              <option disabled value="">เลือกคำนำหน้า</option>
              <option>นาย</option>
              <option>นางสาว</option>
              <option>นาง</option>
            </select>
          </div>
        </div>

        <div class="col-lg-6">
          <div class="form-group">
            <label for="nickName" class="text-success"
              ><span class="text-danger">*</span>ชื่อเล่น</label
            >
            <input
              type="text"
              class="form-control"
              placeholder="กรอกชื่อเล่น"
              id="nickName"
              v-model.trim="profile.nickName"
            />
            <!-- <span> : {{ profile.nickName }}</span> -->
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-6">
          <div class="form-group">
            <label for="firstName" class="text-success"
              ><span class="text-danger">*</span>ชื่อจริง</label
            >
            <input
              type="text"
              class="form-control"
              placeholder="กรอกชื่อจริง"
              id="firstName"
              v-model.trim="profile.firstName"
            />
            <!-- <span> : {{ profile.firstName }}</span> -->
          </div>
        </div>
        <div class="col-lg-6">
          <div class="form-group">
            <label for="lastName" class="text-success"
              ><span class="text-danger">*</span>นามสกุล</label
            >
            <input
              type="text"
              class="form-control"
              placeholder="กรอกนามสกุล"
              id="lastName"
              v-model.trim="profile.lastName"
            />
            <!-- <span> : {{ profile.lastName }}</span> -->
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-6">
          <div class="row mx-auto">
            <div class="form-group">
              <label class="text-success"
                ><span class="text-danger">*</span>วัน / เดือน / ปี เกิด
              </label>
              <form class="form-inline">
                <div>
                  <b-form-input
                    list="day-list"
                    class="birthdayBox1"
                    v-model="dBirth"
                  ></b-form-input>

                  <datalist id="day-list">
                    <option>เลือกวันที่</option>
                    <option v-for="index in 31" :key="index" :value="index">
                      {{ index }}
                    </option>
                  </datalist>
                </div>

                <span class="mx-2 text-success">-</span>

                <div>
                  <b-form-input
                    list="month-list"
                    class="birthdayBox2"
                    v-model="mBirth"
                  ></b-form-input>

                  <datalist id="month-list">
                    <option>เลือกเดือน</option>
                    <option v-for="index in monthList" :key="index">
                      {{ index }}
                    </option>
                  </datalist>
                </div>

                <span class="mx-2 text-success"> - </span>

                <div>
                  <b-form-input
                    list="year-list"
                    class="birthdayBox3"
                    v-model="yBirth"
                    @change="testLog"
                  ></b-form-input>

                  <datalist id="year-list">
                    <option>เลือกปี</option>
                    <option v-for="index in 100" :key="index">
                      {{ index + 2490 }}
                    </option>
                  </datalist>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="form-group">
            <label for="email" class="text-success"
              ><span class="text-danger">*</span>อีเมล์</label
            >
            <input
              type="email"
              class="form-control"
              placeholder="กรอกอีเมล์มี @"
              id="อีเมล์"
              v-model.trim="profile.email"
            />
            <!-- <span> : {{ profile.email }}</span> -->
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-6">
          <div class="form-group">
            <label for="telephone" class="text-success">โทรศัพท์บ้าน</label>
            <input
              type="text"
              class="form-control"
              placeholder="ไม่มีปล่อยว่าง"
              id="telephone"
              v-model.trim="profile.telephone"
              maxlength="10"
            />
          </div>
        </div>
        <div class="col-lg-6">
          <div class="form-group">
            <label for="mobilephone" class="text-success"
              ><span class="text-danger">*</span>โทรศัพท์มือถือ</label
            >
            <input
              type="text"
              class="form-control"
              placeholder="กรอกเบอร์มือถือ"
              id="mobilephone"
              v-model.trim="profile.mobilephone"
              maxlength="10"
            />
          </div>
        </div>
      </div>

      <hr />
      <h5 class="text-left text-success my-3 font-weight-bold">
        ที่อยู่ที่ติดต่อได้สะดวก
      </h5>

      <div class="row mt-3">
        <div class="col-lg-6">
          <div class="form-group">
            <label for="addressNumber" class="text-success"
              ><span class="text-danger">*</span>บ้านเลขที่
            </label>
            <input
              type="text"
              class="form-control"
              placeholder="กรอกบ้านเลขที่ ตัวอย่าง 99/99 หมู่ 9"
              id="อีเมล์"
              v-model.trim="profile.address.addressNumber"
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
              placeholder="ไม่มีปล่อยว่าง "
              id="location"
              v-model.trim="profile.address.location"
            />
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-6">
          <div class="form-group">
            <label for="email" class="text-success"
              >ตรอก/ซอย
            </label>
            <input
              type="email"
              class="form-control"
              placeholder="ตรอก/ซอย"
              id="อีเมล์"
              v-model.trim="profile.address.soi"
            />
          </div>
        </div>
        <div class="col-lg-6">
          <div class="form-group">
            <label for="email" class="text-success">ถนน </label>
            <input
              type="email"
              class="form-control"
              placeholder="ไม่มีปล่อยว่าง"
              id="อีเมล์"
              v-model.trim="profile.address.road"
            />
          </div>
        </div>
      </div>

      <div class="row mt-2">
        <div class="col-lg-6">
          <div class="form-group">
            <label for="email" class="text-success"
              ><span class="text-danger">*</span>แขวง/ตำบล
            </label>
            <ThailandAutoComplete
              v-model="profile.address.district"
              type="district"
              @select="select"
              size=""
              label=""
              placeholder="แขวง/ตำบล"
            />
          </div>
        </div>
        <div class="col-lg-6">
          <div class="form-group">
            <label for="email" class="text-success"
              ><span class="text-danger">*</span>เขต/อำเภอ
            </label>
            <ThailandAutoComplete
              v-model="profile.address.amphoe"
              type="amphoe"
              @select="select"
              size=""
              label=""
              placeholder="อำเภอ"
            />
          </div>
        </div>
      </div>

      <div class="row mt-2">
        <div class="col-lg-6">
          <div class="form-group">
            <label for="email" class="text-success"
              ><span class="text-danger">*</span>จังหวัด
            </label>
            <ThailandAutoComplete
              v-model="profile.address.province"
              type="province"
              @select="select"
              size=""
              label=""
              placeholder="จังหวัด"
            />
          </div>
        </div>
        <div class="col-lg-6">
          <div class="form-group">
            <label for="email" class="text-success"
              ><span class="text-danger">*</span>รหัสไปรษณีย์
            </label>
            <ThailandAutoComplete
              v-model="profile.address.zipcode"
              type="zipcode"
              @select="select"
              size=""
              label=""
              placeholder="รหัสไปรษณีย์"
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
            <label for="level" class="text-success"
              ><span class="text-danger">*</span>ระดับการศึกษาสูงสุด</label
            >
            <select
              class="form-control"
              id="level"
              v-model="profile.graduated.degree"
            >
              <option disabled value="">เลือกระดับการศึกษา</option>
              <option>มัธยมศึกษา</option>
              <option>ปริญญาตรี</option>
              <option>ปริญญาโท</option>
              <option>ปริญญาเอก</option>
            </select>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="form-group">
            <label for="email" class="text-success"
              >โรงเรียน / มหาวิทยาลัย</label
            >
            <input
              type="email"
              class="form-control"
              placeholder="กรอกชื่อมหาวิทยาลัย"
              id="email"
              v-model="profile.graduated.university"
            />
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-6">
          <div class="form-group">
            <label for="email" class="text-success"
              ><span class="text-danger">*</span>ระดับชั้น / คณะ</label
            >
            <input
              type="email"
              class="form-control"
              placeholder="กรอกคณะที่จบ"
              id="email"
              v-model="profile.graduated.faculty"
            />
          </div>
        </div>
        <div class="col-lg-6">
          <div class="form-group">
            <label for="email" class="text-success">เอก / สาขาวิชา</label>
            <input
              type="email"
              class="form-control"
              placeholder="กรอกเอก/สาขาวิชา"
              id="email"
              v-model="profile.graduated.major"
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
          placeholder="กรอกวิชาที่สอน เช่น กีต้าร์"
          id="email"
          v-model="profile.subject"
        />
      </div>

      <h5 class="text-left text-success my-3 font-weight-bold">
        ประวัติการสอน
      </h5>
      <div class="form-group">
        <!-- <label for="comment"></label> -->
        <textarea
          class="form-control"
          rows="5"
          id="comment"
          placeholder="กรอกข้อมูลการทำงานเช่น 
  -สอนกีต้าร์คลาสสิค ที่ Yamaha ปี 2562-2564
  -สอนกีต้าร์คลาสสิค ที่ Melodious ปี 2565-ปัจจุบัน"
          v-model="profile.workingProfile"
        ></textarea>
      </div>

      <div class="row justify-content-center">
        <div class="btn btn-success text-center px-5" @click="validateForm">
          เพิ่มข้อมูล
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { fb, functions } from "../firebase.js";
import moment from "moment";
import DateDropdown from "vue-date-dropdown";

export default {
  name: "profile",
  components: {
    DateDropdown,
  },
  data() {
    return {
      selectedDate: "",
      options: {
        // https://momentjs.com/docs/#/displaying/
        format: "DD/MM/YYYY",
        useCurrent: false,
        showClear: true,
        showClose: true,
      },

      imageName: null,
      dateNow: moment().add(543, "year").format("LL"),
      detailOpen: false,
      monthList: [
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12",
      ],
      dBirth: "",
      mBirth: "",
      yBirth: "",

      profile: {
        uid: "",
        addProfileAt: null,
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuNfh5XEmL28p3fZftINhCjPR1g7V8IDWJ9-H58s0jyp4GMH_nWaRqFrRFu-6CJbaTdK0&usqp=CAU",

        namePrefix: "",
        nickName: "",
        firstName: "",
        lastName: "",
        fullName: null,
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
        role: { isProfile: true },
        profileType: "teacher",
      },
    };
  },

  methods: {
    select(address) {
      this.profile.address.district = address.district;
      this.profile.address.amphoe = address.amphoe;
      this.profile.address.province = address.province;
      this.profile.address.zipcode = address.zipcode;
    },

    onFileChange(e) {
      const file = e.target.files[0];
      this.imageName = e.target.files[0];
      this.profile.image = URL.createObjectURL(file);
    },

    uploadImage() {
      if (this.imageName != null) {
        this.$store.state.show = true;
        let file = this.imageName;
        var storageRef = fb
          .storage()
          .ref("teacherImg/" + Math.random() + "_" + file.name);

        let uploadTask = storageRef.put(file);

        uploadTask.on(
          "state_changed",
          (snapshot) => {},
          (error) => {
            // Handle unsuccessful uploads
            Swal.fire({
              title: "เกิดข้อผิดพลาด",
              text: "ไม่สามารถอัพโหลดรูปภาพได้ กรุณาลองใหม่อีกครั้ง",
              icon: "warning",
              confirmButtonColor: "#FF0000",
              confirmButtonText: "ตกลง",
            });
            this.$store.state.show = false;
          },
          () => {
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
              this.profile.image = downloadURL;
              Swal.fire({
                title: "SUCCESS",
                text: "อัพโหลดรูปภาพเรียบร้อย",
                icon: "success",
                confirmButtonColor: "#30855c",
                confirmButtonText: "ตกลง",
              });
              this.$store.state.show = false;
              this.detailOpen = true;
            });
          }
        );
      } else {
        Swal.fire({
          title: "เกิดข้อผิดพลาด",
          text: "ไม่สามารถอัพโหลดรูปภาพได้ กรุณาลองใหม่อีกครั้ง",
          icon: "warning",
          confirmButtonColor: "#FF0000",
          confirmButtonText: "ตกลง",
        });
      }
    },

    validateForm() {
      if (
        this.profile.image != "" &&
        this.profile.namePrefix != "" &&
        this.profile.nickName != "" &&
        this.profile.firstName != "" &&
        this.profile.lastName != "" &&
        this.profile.email != "" &&
        this.dBirth != "" &&
        this.mBirth != "" &&
        this.yBirth != "" &&
        this.profile.birthday != "" &&
        this.profile.telephone != "" &&
        this.profile.mobilephone != "" &&
        this.profile.address.addressNumber != "" &&
        this.profile.address.district != "" &&
        this.profile.address.amphoe != "" &&
        this.profile.address.province != "" &&
        this.profile.address.zipcode != "" &&
        this.graduated.degree != "" &&
        this.graduated.faculty != ""
      ) {
        this.addProfile();
      } else {
        Swal.fire({
          title: "กรอกข้อมูลให้ครบถ้วน",
          text: "กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน",
          icon: "warning",
          confirmButtonColor: "#FF0000",
          confirmButtonText: "ตกลง",
        });
      }
    },

    async addProfile() {
      this.$store.state.show = true;
      this.profile.addProfileAt = Date.now();
      this.profile.birthday = `${this.dBirth}/${this.mBirth}/${this.yBirth}`;
      this.profile.fullName = `${this.profile.firstName} ${this.profile.lastName} (ครู ${this.profile.nickName})`;

      var addFunctions = functions.httpsCallable("TeacherData");
      addFunctions(this.profile)
        .then(() => {
          Swal.fire({
            title: "บันทึกประวัติเรียบร้อย",
            text: "กรุณารอ Admin อนุมัติการเข้าใช้ ",
            icon: "success",
            confirmButtonColor: "#30855c",
            confirmButtonText: "ตกลง",
          });

          fb.auth()
            .signOut()
            .then((_) => {
              this.$router.push("/pending");
            });
          this.$store.state.show = false;
        })
        .catch((error) => {
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
  },

  created() {
    this.profile.uid = fb.auth().currentUser.uid;
  },
};
</script>

<style scoped>
@media (max-width: 575.98px) {
  .birthdayBox1 {
    width: 80px;
  }
  .birthdayBox2 {
    width: 80px;
  }
  .birthdayBox3 {
    width: 100px;
  }
}

@media (min-width: 576px) {
  .birthdayBox1 {
    width: 150px;
  }
  .birthdayBox2 {
    width: 150px;
  }
  .birthdayBox3 {
    width: 150px;
  }
}
</style>
