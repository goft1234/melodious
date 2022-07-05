<template>
  <div>
    <navbar></navbar>
    <div class="container-fluid mt-2">
      <div class="row">
        <div class="col-md-12 col-lg-3"></div>

        <div class="col-md-12 col-lg-6">
          <div class="row p-2">
            <div class="col-md-2"></div>

            <div class="col-md-8 jumbotron rounded">
              <h5 class="mb-5 text-success font-weight-bolder text-center">
                สมัครสมาชิก
              </h5>

              <form v-on:submit.prevent>
                <h6 class="float-left text-success">ชื่อผู้ใช้</h6>
                <div class="input-group mt-2">
                  <div class="input-group-prepend">
                    <span class="input-group-text">
                      <i class="fas fa-envelope"></i>
                    </span>
                  </div>
                  <input
                    type="text"
                    v-model.trim="email"
                    class="form-control"
                    placeholder="สร้างชื่อผู้ใช้งาน"
                  />
                </div>

                <h6 class="float-left text-success mt-3">
                  รหัสผ่าน (หมายเลขโทรศัพท์)
                </h6>
                <div
                  class="input-group mb-2"
                  :class="{ 'form-group--error': $v.password.$error }"
                >
                  <div class="input-group-prepend">
                    <span class="input-group-text">
                      <i class="fas fa-lock"></i>
                    </span>
                  </div>
                  <!-- minlength="6" -->
                  <input
                    type="password"
                    v-model.trim="$v.password.$model"
                    class="form-control"
                    placeholder="ตั้งรหัสผ่านเป็นหมายเลขโทรศัพท์"
                  />
                </div>

                <div v-if="!$v.password.minLength">
                  <span class="text-danger">
                    กรอกรหัสผ่าน {{ $v.password.$params.minLength.min }} อักษร.
                  </span>
                </div>

                <h6 class="float-left text-success mt-3">ยืนยันรหัสผ่าน</h6>
                <div class="input-group mb-2">
                  <div class="input-group-prepend">
                    <span class="input-group-text"
                      ><i class="fas fa-key"></i
                    ></span>
                  </div>
                  <input
                    type="password"
                    v-model.trim="$v.passwordConfirm.$model"
                    :rules="[comparePasswords]"
                    class="form-control"
                    placeholder="ยืนยันรหัสผ่าน"
                  />
                </div>

                <div v-if="chkPass == false" class="text-center">
                  <span class="text-danger">รหัสผ่านยังไม่ตรงกัน</span>
                </div>
                <div v-if="chkPass" class="text-center">
                  <span class="text-success">รหัสผ่านตรงกัน</span>
                </div>

                <button
                  type="submit"
                  @click="onRegister"
                  class="btn btn-success btn-block mt-4"
                >
                 <!-- <b-spinner small label="Spinner" class="float-left" v-if="spinshow"></b-spinner> -->
                  ลงทะเบียน
                </button>
              </form>
              <hr />
              <div class="text-success mt-3 nav-item">
                <router-link to="/" class="nav-link text-center text-success"
                  ><h6 class="text-success mt-1">
                    ลงทะเบียนแล้ว? เข้าสู่ระบบ
                  </h6></router-link
                >
              </div>
            </div>

            <div class="col-md-2"></div>
          </div>
        </div>

        <div class="col-md-12 col-lg-3"></div>
      </div>
    </div>

    <Footer></Footer>
  </div>
</template>

<script>
import { db, fb } from "../firebase.js";
import { required, minLength } from "vuelidate/lib/validators";

export default {
  name: "register",
  components: {},
  data() {
    return {
      show: true,
      // spinshow:true,
      email: "",
      password: null,
      passwordConfirm: null,
      chkPass: null,
    };
  },

  validations: {
    password: {
      required,
      minLength: minLength(10),
    },
    passwordConfirm: {
      required,
      minLength: minLength(10),
    },
  },

  methods: {
    onRegister() {
      if (this.chkPass && !this.$v.$invalid) {
        this.createUser();
      }
    },

    async createUser() {
      try {
        this.email = `${this.email}@gmail.com`;
        console.log(this.email);
        // var user = await fb
        //   .auth()
        //   .createUserWithEmailAndPassword(this.email, this.passwordConfirm);

        // fb.auth()
        //   .signOut()
        //   .then((user) => {
        //     this.$router.push("/");
        //   });
        // console.log("signOut");
        // Swal.fire({
        //   title: "ลงทะเบียนเรียบร้อยแล้ว",
        //   text: "เข้าสู่ระบบด้วย 'อีเมล์' และ 'รหัสผ่าน' ที่ได้กำหนดไว้ ",
        //   icon: "success",
        //   confirmButtonColor: "#30855c",
        //   confirmButtonText: "ตกลง",
        // });
      } catch (error) {
        let errorCode = error.code;
        let errorMessage = error.message;
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
            title: "กรอกรหัสผ่านอย่างน้อย 6 ตัวอักษร",
            text: "กรอกรหัสผ่านอย่างน้อย 6 ตัวอักษร",
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
      }
    },
  },

  computed: {
    comparePasswords() {
      if (this.passwordConfirm != "")
        return this.password === this.passwordConfirm
          ? (this.chkPass = true)
          : (this.chkPass = false);
    },
  },

  mounted() {
    window.scrollTo(0, 0);
  },
};
</script>

<style>
</style>