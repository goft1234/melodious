<template>
  <div id="login">
    <navbar></navbar>
    <div class="container-fluid mt-5">
      <div class="row">
        <div class="col-md-12 col-lg-3"></div>

        <div class="col-md-12 col-lg-6">
          <div class="row p-2">
            <div class="col-md-2"></div>
            <div
              class="
                col-md-8
                jumbotron
                border border-white
                rounded-lg
                shadow
                my-auto
              "
            >
              <h5 class="mb-3 text-success font-weight-bolder text-center">
                เข้าสู่ระบบ
              </h5>
              <form v-on:submit.prevent>
                <h6 class="float-left text-success">ที่อยู่อีเมล์</h6>
                <div class="input-group mb-2">
                  <div class="input-group-prepend">
                    <span class="input-group-text">
                      <i class="fas fa-envelope"></i>
                    </span>
                  </div>
                  <input
                    type="text"
                    v-model.trim="email"
                    class="form-control"
                    placeholder="ระบุที่อยู่ email มี @"
                  />
                </div>
                <h6 class="float-left text-success mt-4">รหัสผ่าน</h6>
                <div class="input-group mb-2">
                  <div class="input-group-prepend">
                    <span class="input-group-text">
                      <i class="fas fa-lock"></i>
                    </span>
                  </div>
                  <input
                    type="password"
                    v-model.trim="password"
                    minlength="6"
                    class="form-control"
                    placeholder="รหัสผ่านเป็นหมายเลขโทรศัพท์"
                    maxlength="10"
                  />
                </div>
                <button
                  type="submit"
                  @click="onLogin"
                  class="btn btn-success btn-block mt-5"
                >
                  เข้าสู่ระบบ
                </button>
              </form>

              <!-- <div class="float-right">
                  <router-link to="/register" class="nav-link float-right"
                    ><h6 class="text-success mt-3">
                      ยังไม่ได้ลงทะเบียน? ลงทะเบียน
                    </h6></router-link
                  >
                </div> -->
              <hr />
              <!-- <social></social> -->
              <div class="text-success mt-3 nav-item">
                <router-link
                  to="/register"
                  class="nav-link text-center text-success"
                  ><h6 class="text-success mt-1">
                    ยังไม่ได้สมัคร ?ลงทะเบียน
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
import { fb, db } from "../firebase";

export default {
  name: "login",
  data() {
    return {
      email: "",
      password: "",
    };
  },

  methods: {
    async onLogin() {
      try {
        this.$store.state.show = true;
        var user = await fb
          .auth()
          .signInWithEmailAndPassword(this.email, this.password);
        if (user) {
          await fb.auth().onAuthStateChanged;
          var { claims } = await fb.auth().currentUser.getIdTokenResult();
          console.log(claims);
          if (claims.isRegisted) {
            this.$router.replace("/profile");
            // alert('isRegisted')
          } else if (claims.isProfile) {
            this.$router.replace("/pending");
            // alert('isProfile')
          } else if (claims.isAdmin) {
            this.$router.replace("/admin/approve");
            // alert('admin')
          }else if (claims.isTeacher) {
            this.$router.replace("/teacher/schedule");
            // alert('admin')
          }else if (claims.isStudent) {
            this.$router.replace("/student/schedule");
            // alert('student')
          }
          else{
            this.$router.replace("/");
          }
          this.$store.state.show = false;
        }
        // var user = await fb.auth().currentUser;
        // var doc = await db.collection("teacher").doc(user.uid).get();
        // console.log(doc.data().profileDetial);
        // if (doc.data().profileDetail) {
        //   alert("Home");
        // } else {
        //   this.$router.replace('/profile');
        // }
        // console.log(user.uid);
      } catch (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === "auth/wrong-password") {
          Swal.fire({
            title: "email หรือ password ผิด",
            text: "ทำการตรวจสอบ email หรือ password อีกครั้ง",
            icon: "error",
            confirmButtonColor: "#FF0000",
            confirmButtonText: "ตกลง",
          });
        } else {
          Swal.fire({
            title: "email หรือ password ผิด",
            text: "ทำการตรวจสอบ email หรือ password อีกครั้ง",
            icon: "error",
            confirmButtonColor: "#FF0000",
            confirmButtonText: "ตกลง",
          });
        }
        this.$store.state.show = false;
      }
    },

    async chkStatus() {
      // try {
      //   this.$store.state.show = true;
      //   let user = await fb.auth().onAuthStateChanged;
      //   console.log(user);
      //   if (user) {
      //     let { claims } = await fb.auth().currentUser.getIdTokenResult();
      //     console.log(claims);
      //     if (claims.isRegisted) {
      //       this.$router.replace("/profile");
      //       // alert('isRegisted')
      //     } else if (claims.isProfile) {
      //       this.$router.replace("/pending");
      //       // alert('isProfile')
      //     } else if (claims.isAdmin) {
      //       this.$router.replace("/admin/approve");
      //       // alert('admin')
      //     }
      //     else{
      //       this.$router.replace("/");
      //     }
      //     this.$store.state.show = false;
      //   }
      // } catch (error) {
      //   this.$router.replace("/");
      //   this.$store.state.show = false;
      // }
    },
  },

  mounted() {
    // this.chkStatus();
    window.scrollTo(0, 0);
  },
};
</script>

<style>
</style>