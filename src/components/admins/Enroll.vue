<template>
  <div class="container jumbotron shadow">
    <h4 class="text-center text-success mb-3">ข้อมูลและประวัตินักเรียน</h4>
    <div class="row">
      <div class="col-lg-12">
        <!-- <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuNfh5XEmL28p3fZftINhCjPR1g7V8IDWJ9-H58s0jyp4GMH_nWaRqFrRFu-6CJbaTdK0&usqp=CAU"
            id="preview"
            class="rounded-circle mx-auto d-block"
            width="200"
          /> -->

        <!-- <div class="form-group">
                  <label for="product_image" class="text-primary">อัพโหลด รูปภาพสินค้า</label>
                  <input type="file" @change="uploadImage" class="form-control">
                </div>

                <div class="form-group d-flex">
                  <div class="p-1 mx-auto d-block img-fluid" >
                      <div class="img-wrapp">
                          <img :src="profile.image" class="" alt="" width="200px">
                          <span class="delete-img" >X</span>
                      </div>
                  </div>
                </div> -->

        <!-- <input
            type="file"
            @change="onFileChange"
            class="mx-auto bg-light p-2 d-block mt-3"
          />
          <div class="p-1 mx-auto d-block img-fluid">
            <div class="img-wrapp" id="preview">
              <img v-if="profile.image" :src="profile.image" class="" alt="" width="200px" />
            </div>
          </div> -->
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
    <form v-on:submit.prevent  class="" v-if="detailOpen">
      <div class="row mt-3">
        <div class="col-md-12">
          <div class="float-left">
            <h6 class="text-success font-weight-bold">วันที่ {{ dateNow }}</h6>
          </div>
          <div class="float-right">
            <h6 class="text-success font-weight-bold">
              รหัส {{ profile.studentId }}
            </h6>
          </div>
        </div>
      </div>
      <div class="text-center">
        <span class="text-danger">*</span
        ><span class="text-success"> (จำเป็นต้องกรอกข้อมูล)</span>
      </div>
      <h5 class="text-left text-success my-3 font-weight-bold">
        ข้อมูลส่วนตัวนักเรียน
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
              <option>เด็กชาย</option>
              <option>เด็กหญิง</option>
              <option>นาย</option>
              <option>นาง</option>
              <option>นางสาว</option>
            </select>
            <!-- <span>courseSelected: {{ profile.namePrefix }}</span> -->
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

                  <datalist id="day-list" >
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
                    @change="fullBirthday"
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

          <!-- <div class="form-group">
            <label for="birthday" class="text-success"><span class="text-danger">*</span>วัน/เดือน/ปี เกิด</label>
            <date-picker
              name="birthday"
              v-model="profile.birthday"
              :config="options"
            ></date-picker>
          </div> -->
        </div>

        <div class="col-lg-6">
          <div class="form-group">
            <label for="email" class="text-success"
              ><span class="text-danger">*</span>อีเมล์
            </label>
            <input
              type="email"
              class="form-control"
              placeholder="ไม่มีให้กรอกเป็น email ของผู้ปกครอง"
              id="อีเมล์"
              v-model.trim="profile.email"
            />
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
              placeholder="ไม่มีให้กรอกเป็น เบอร์ ของผู้ปกครอง"
              id="mobilephone"
              v-model.trim="profile.mobilephone"
              maxlength="10"
            />
          </div>
        </div>
      </div>

      <hr />
      <h5 class="text-left text-success my-3 font-weight-bold">
        ข้อมูลผู้ปกครอง
      </h5>
      <div class="col-md-12 text-center mb-3">
        <h6 class="text-success">(ผู้ปกครองคนที่ 1)</h6>
      </div>
      <div class="row">
        
        <div class="col-lg-6">
          <div class="form-group">
            <label for="namePrefix" class="text-success"
              ><span class="text-danger">*</span>คำนำหน้า</label
            >
            <select
              class="form-control"
              id="namePrefix"
              v-model="profile.parentNamePrefix"
            >
              <option disabled value="">เลือกคำนำหน้า</option>
              <option>นาย</option>
              <option>นาง</option>
              <option>นางสาว</option>
            </select>
          </div>
        </div>

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
              v-model.trim="profile.parentFirstName"
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
              v-model.trim="profile.parentLastName"
            />
            <!-- <span> : {{ profile.lastName }}</span> -->
          </div>
        </div>

        <div class="col-lg-6">
          <div class="form-group">
            <label for="telephone" class="text-success"><span class="text-danger">*</span>เกี่ยวข้องเป็น</label>
            <input
              type="text"
              class="form-control"
              placeholder="เกี่ยวข้องเป็น"
              id="telephone"
              v-model.trim="profile.parentAbout"
            />
          </div>
        </div>

        <div class="col-lg-6">
          <div class="form-group">
            <label for="email" class="text-success"><span class="text-danger">
              ***</span> อีเมล์ <span class="text-danger">(ใช้เป็น User เพื่อเข้าระบบ)</span>
            </label>
            <input
              type="email"
              class="form-control"
              placeholder="ใช้เป็น User เพื่อเข้าระบบ"
              id="อีเมล์"
              v-model.trim="profile.parentEmail"
            />
          </div>
        </div>

        <div class="col-lg-6">
          <div class="form-group">
            <label for="mobilephone" class="text-success"
              ><span class="text-danger">***</span> เบอร์มือถือ<span class="text-danger">(ใช้เป็น Password เพื่อเข้าระบบ)</span></label
            >
            <input
              type="text"
              class="form-control"
              placeholder="ใช้เป็น รหัสผ่าน เพื่อเข้าระบบ"
              id="mobilephone"
              v-model.trim="profile.parentMobilephone"
              maxlength="10"
            />
          </div>
        </div>
      </div>

      <hr />
      <div class="col-md-12 text-center mb-3">
        <h6 class="text-success">(ผู้ปกครองคนที่ 2)</h6>
      </div>
      <div class="row">
        
        <div class="col-lg-6">
          <div class="form-group">
            <label for="namePrefix" class="text-success"
              >คำนำหน้า</label
            >
            <select
              class="form-control"
              id="namePrefix"
              v-model="profile.parentNamePrefix2"
            >
              <option disabled value="">เลือกคำนำหน้า</option>
              <option>นาย</option>
              <option>นาง</option>
              <option>นางสาว</option>
            </select>
          </div>
        </div>

        <div class="col-lg-6">
          <div class="form-group">
            <label for="firstName" class="text-success"
              >ชื่อจริง</label
            >
            <input
              type="text"
              class="form-control"
              placeholder="กรอกชื่อจริง"
              id="firstName"
              v-model.trim="profile.parentFirstName2"
            />
            <!-- <span> : {{ profile.firstName }}</span> -->
          </div>
        </div>

        <div class="col-lg-6">
          <div class="form-group">
            <label for="lastName" class="text-success"
              >นามสกุล</label
            >
            <input
              type="text"
              class="form-control"
              placeholder="กรอกนามสกุล"
              id="lastName"
              v-model.trim="profile.parentLastName2"
            />
            <!-- <span> : {{ profile.lastName }}</span> -->
          </div>
        </div>

        <div class="col-lg-6">
          <div class="form-group">
            <label for="telephone" class="text-success">เกี่ยวข้องเป็น</label>
            <input
              type="text"
              class="form-control"
              placeholder="เกี่ยวข้องเป็น"
              id="telephone"
              v-model.trim="profile.parentAbout2"
            />
          </div>
        </div>

        <div class="col-lg-6">
          <div class="form-group">
            <label for="email" class="text-success">
              อีเมล์
            </label>
            <input
              type="email"
              class="form-control"
              placeholder="กรอก email มี @"
              id="อีเมล์"
              v-model.trim="profile.parentEmail2"
            />
          </div>
        </div>

        <div class="col-lg-6">
          <div class="form-group">
            <label for="mobilephone" class="text-success"
              >เบอร์มือถือ</label
            >
            <input
              type="text"
              class="form-control"
              placeholder="กรอกเบอร์มือถือ"
              id="mobilephone"
              v-model.trim="profile.parentMobilephone2"
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
              placeholder="ไม่มีปล่อยว่าง"
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
              placeholder="ไม่มีปล่อยว่าง"
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
              ><span class="text-danger">*</span>ข้อมูลการศึกษา</label
            >
            <select
              class="form-control"
              id="level"
              v-model="profile.graduated.degree"
            >
              <option disabled value="">เลือกระดับการศึกษา</option>
              <option>อนุบาล</option>
              <option>ประถมศึกษา</option>
              <option>มัธยม</option>
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
              placeholder="กรอกชื่อโรงเรียน / มหาวิทยาลัย"
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
              placeholder="กรอก ระดับชั้น / คณะ"
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
              placeholder="ไม่มีใส่ปล่อยว่าง"
              id="email"
              v-model="profile.graduated.major"
            />
          </div>
        </div>
      </div>

      <hr />
      <h5 class="text-left text-success my-3 font-weight-bold">
        ประสอบการณ์ในการเรียนดนตรี
      </h5>
      <div class="form-group">
        <!-- <label for="comment"></label> -->
        <textarea
          class="form-control"
          rows="5"
          id="comment"
          placeholder="กรอกข้อมูล เคย ไม่เคย วิชาที่เรียน ระยะเวลา  ระดับ โรงเรียน/สถานศึกษา เช่น
  -เรียนเปียโน ที่ โรงเรียนสอนดนตรี Melodious ปี 2563-2564         
  -เรียนกีต้าร์คลาสสิค ที่ โรงเรียนสอนดนตรี Melodious ปี 2564-ปัจจุบัน"
          v-model="profile.studyHis"
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
import { db, fb, functions } from "../../firebase.js";
import moment from "moment";
import firebase from "firebase/app";

export default {
  name: "profile",
  data() {
    return {
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
      monthList : ['01','02','03','04','05','06','07','08','09','10','11','12'],
      dBirth:'',
      mBirth:'',
      yBirth:'',
      profile: {
        uid: "",
        studentId: "",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuNfh5XEmL28p3fZftINhCjPR1g7V8IDWJ9-H58s0jyp4GMH_nWaRqFrRFu-6CJbaTdK0&usqp=CAU",
        addProfileAt: Date.now(),

        namePrefix: "",
        nickName: "",
        firstName: "",
        lastName: "",
        birthday: "",
        email: "",
        telephone: "",
        mobilephone: "",

        parentNamePrefix: "",
        parentFirstName: "",
        parentLastName: "",
        parentAbout: "",
        parentEmail: "",
        parentMobilephone: "",

        parentNamePrefix2: "",
        parentFirstName2: "",
        parentLastName2: "",
        parentAbout2: "",
        parentEmail2: "",
        parentMobilephone2: "",

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

        studyHis: "",
        role: { isInactive: true },
        profileType: "student",
      },
    };
  },

  methods: {
    fullBirthday()
    {
      this.profile.birthday = `${this.dBirth}/${this.mBirth}/${this.yBirth}`
      // console.log(this.profile.birthday);
    },
    uploadImage() {
      if (this.imageName != null) {
        this.$store.state.show = true;
        let file = this.imageName;
        var storageRef = fb
          .storage()
          .ref("studentImg/" + Math.random() + "_" + file.name);

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

    onFileChange(e) {
      const file = e.target.files[0];
      this.imageName = e.target.files[0];
      this.profile.image = URL.createObjectURL(file);
      // console.log(this.imageName);
    },

    async getStudentId() {
      try {
        this.$store.state.show = true;
        var ref = db.collection("studentId").doc("detail");
        let doc = await ref.get();
        if (!doc.exists) {
          await ref.set(
            {
              stdId: 1,
            },
            { merge: true }
          );
          location.reload();
          this.$store.state.show = false;
        }
        let str = doc.data().stdId.toString();
        this.profile.studentId = "MMS" + str.padStart(3, "0");
        console.log(this.profile.studentId);
        this.$store.state.show = false;
      } catch (err) {
        Swal.fire({
          title: "เกิดข้อผิดพลาด",
          text: "ไม่สามารถดึงรหัสนักเรียนได้ กรุณาลองใหม่อีกครั้ง",
          icon: "warning",
          confirmButtonColor: "#FF0000",
          confirmButtonText: "ตกลง",
        });
        this.$store.state.show = false;
      }
    },

    select(address) {
      this.profile.address.district = address.district;
      this.profile.address.amphoe = address.amphoe;
      this.profile.address.province = address.province;
      this.profile.address.zipcode = address.zipcode;
    },

    validateForm() {
      if (
        this.profile.studentId != "" &&
        this.profile.image != "" &&
        
        this.profile.namePrefix != "" &&
        this.profile.nickName != "" &&
        this.profile.firstName != "" &&
        this.profile.lastName != "" &&
        this.dBirth != "" &&
        this.mBirth != "" &&
        this.yBirth != "" &&
        this.profile.birthday != "" &&
        this.profile.email != "" &&
        this.profile.mobilephone != "" &&
        
        this.profile.parentNamePrefix != "" &&
        this.profile.parentFirstName != "" &&
        this.profile.parentLastName != "" &&
        this.profile.parentAbout != "" &&
        this.profile.parentEmail != "" &&
        this.profile.parentMobilephone != "" &&

        this.profile.address.addressNumber != "" &&
        this.profile.address.district != "" &&
        this.profile.address.amphoe != "" &&
        this.profile.address.province != "" &&
        this.profile.address.zipcode != "" &&
        this.profile.graduated.degree != "" &&
        this.profile.graduated.faculty != ""
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
      try {
        this.$store.state.show = true;
        this.profile.birthday = `${this.dBirth}/${this.mBirth}/${this.yBirth}`
        var data = await fb
          .auth()
          .createUserWithEmailAndPassword(
            this.profile.parentEmail,
            this.profile.parentMobilephone,
          );
        // console.log(data.user.uid);
        // this.$store.state.show = false;

        var ref = db.collection("studentId").doc("detail");
        let doc = await ref.get();
        let str = doc.data().stdId.toString();
        this.profile.studentId = "MMS" + str.padStart(3, "0");
        console.log(this.profile.studentId);

        this.profile.uid = data.user.uid;
        this.profile.addProfileAt = Date.now();

        await db
          .collection("studentId")
          .doc("detail")
          .update({ stdId: firebase.firestore.FieldValue.increment(1) });

        await db.collection("studentData").doc(data.user.uid).set(this.profile);

        Swal.fire({
          title: "ลงทะเบียนผู้ใช้งานเรียบร้อย",
          text: "สามารถดำเนินการอื่นๆ ได้ที่หน้าข้อมูลนักเรียน",
          icon: "success",
          confirmButtonColor: "#30855c",
          confirmButtonText: "ตกลง",
        });
        this.$router.push("/admin/student");
        this.$store.state.show = false;
      } catch (error) {
        let errorCode = error.code;
        console.log(errorCode);

        if (errorCode == "auth/email-already-in-use") {
          Swal.fire({
            title: "Email นี้ได้ทำการถูกลงทะเบียนไว้แล้ว",
            text: 'ทำการตรวจสอบหรือสมัครด้วย "Email" อื่น',
            icon: "error",
            confirmButtonColor: "#FF0000",
            confirmButtonText: "ตกลง",
          });
        } else if (errorCode == "auth/weak-password") {
          Swal.fire({
            title: "กรอกรหัสผ่าน 10 ตัวอักษร",
            text: "กรอกรหัสผ่าน 10 ตัวอักษร",
            confirmButtonColor: "#FF0000",
            icon: "error",
            confirmButtonText: "ตกลง",
          });
        } else if (errorCode == "auth/network-request-failed") {
          Swal.fire({
            title: "ไม่มีการเชื่อมต่อ INTERNET",
            text: "ทำการเชื่อมต่อ internet ของท่านให้เรียบร้อย",
            confirmButtonColor: "#FF0000",
            icon: "error",
            confirmButtonText: "ตกลง",
          });
        } else if (errorCode == "auth/invalid-email") {
          Swal.fire({
            title: "E-mail ไม่ถูกต้อง",
            text: "รูปแบบ email ไม่ถูกต้อง",
            confirmButtonColor: "#FF0000",
            icon: "error",
            confirmButtonText: "ตกลง",
          });
        } else {
          Swal.fire({
            title: "คุณใส่ข้อมูลไม่ถูกต้อง",
            text: "ทำการตรวจสอบอีกครั้ง",
            icon: "error",
            confirmButtonColor: "#FF0000",
            confirmButtonText: "ตกลง",
          });
        }
        this.$store.state.show = false
      }

      // var addFunctions = functions.httpsCallable("StudentData");
      // await addFunctions(this.profile)
      //   .then(() => {
      //     Swal.fire({
      //       title: "ลงทะเบียนผู้ใช้งานเรียบร้อย",
      //       text: "สามารถดำเนินการอื่นๆ ได้ที่หน้าข้อมูลนักเรียน",
      //       icon: "success",
      //       confirmButtonColor: "#30855c",
      //       confirmButtonText: "ตกลง",
      //     });
      //     this.$router.push("/admin/student");
      //     this.$store.state.show = false;
      //   })
      //   .catch((error) => {
      //     console.log("Transaction failed: ", error);
      //     Swal.fire({
      //       title: "เกิดข้อผิดพลาด",
      //       text: "เกิดข้อผิดพลาดที่ระบบ กรุณาลองใหม่อีกครั้ง",
      //       icon: "warning",
      //       confirmButtonColor: "#FF0000",
      //       confirmButtonText: "ตกลง",
      //     });
      //     this.$store.state.show = false;
      //   });
    },
    async chkStatus(){
      await fb.auth().onAuthStateChanged;
      var { claims } = await fb.auth().currentUser.getIdTokenResult();

      if(claims.isAdmin){
        let userStatus = 'isAdmin'
      }else if(claims.isRegisted){
        this.$router.replace("/");
      }else if(claims.isProfile){
        this.$router.replace("/");
      }else if(claims.isTeacher){
        this.$router.replace("/");
      }else if(claims.isStudent){
        this.$router.replace("/");
      }   
      console.log(claims);
    }
  },

  mounted() {
    window.scrollTo(0, 0);
  },

  created() {
    this.getStudentId();
    this.chkStatus();
  },
};
</script>

<style lang="scss" scoped>
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

#preview {
  display: flex;
  justify-content: center;
  align-items: center;
}

#preview img {
  max-width: 100%;
  max-height: 500px;
}
.btn-circle {
  width: 30px;
  height: 30px;
  text-align: center;
  padding: 6px 0;
  font-size: 12px;
  line-height: 1.428571429;
  border-radius: 15px;
}
.shipper-name {
  border-top: 3px #000000 solid;
}
.text-center {
  text-align: center;
}
table.table-border,
table.table-border th,
table.table-border td {
  border-collapse: collapse;
  border: 1px #000000 solid;
}
div.page {
  background: white;
  display: block;
  margin: 0 auto;
  // margin-bottom: 0.5 cm;
  box-shadow: 0 0 0.5cm rgba(0, 0, 0, 0.5);
}
div.page[size="A4"] {
  width: 21cm;
  height: 29.7cm;
  // height: 14.85cm;
}
@media print {
  div.page {
    margin: 0;
    box-shadow: 0;
  }
  .no-print,
  .no-print * {
    display: none !important;
  }
}
</style>
