<template>
  <div>
    <navbar></navbar>
    <div class="container-fluid mt-5">
      <div class="row">
        <div class="col-md-12 col-lg-3"></div>
        <div class="col-md-12 col-lg-6">
          <div class="row p-2">
            <div class="col-md-2"></div>
            <div class="col-md-8 jumbotron rounded">
              <div class="card">
                <div class="card-header bg-success text-white">
                  สถานะผู้เข้าใช้
                </div>
                <div class="card-body">
                  <h5 class="card-title text-success text-center">
                    กำลังรอ Approve จากระบบ
                  </h5>
                  <p class="card-text text-danger mt-3">
                    สถานะผู้เข้าใช้ของคุณอยู่ระหว่างรอ Admin อนุมัติ
                    กรุณาเข้าใหม่อีกครั้งหลังได้รับการอนุมัติจากระบบ
                  </p>
                  <a
                    href="#"
                    class="btn btn-success float-right mt-3"
                    @click="logout"
                    >ออกจากระบบ</a
                  >
                </div>
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
import { fb } from "../firebase.js";

export default {
  methods: {
    logout() {
       this.$store.state.show = true;
      fb.auth()
        .signOut()
        .then(() => {
          this.$router.push("/");
           this.$store.state.show = false;
        })
        .catch((err) => {
          console.log(err);
           this.$store.state.show = false;
        });
    },

  },

  mounted() {
    window.scrollTo(0, 0);
  },
};
</script>

<style>
</style>