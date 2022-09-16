<template>
  <div>
    <!-- width="240px" -->
    <b-sidebar
      id="sidebar-no-header"
      title="M E N U"
      backdrop
      bg-variant="success"
      text-variant="success"
      width="240px"
    >
      <template #default="{ hide }">
        <div class="page-wrapper chiller-theme toggled">
          <a id="show-sidebar" class="btn btn-sm btn-success" href="#">
            <i class="fas fa-bars"></i>
          </a>
          <nav id="sidebar " class="sidebar-wrapper">
            <div class="sidebar-content">
              <div class="sidebar-brand">
                <router-link to="#" class="navbar-brand text-light">
                  <h5 class="text-center">
                    <span class="text-light">เมนูหลัก</span>
                  </h5>
                </router-link>
                <!-- <div id="close-sidebar">
                  <b-nav-item @click="hide">
                    <i class="fas fa-times"></i>
                  </b-nav-item>
                </div> -->
              </div>

              <div class="sidebar-menu">
                <ul class="mt-3">
                  <li class="bottom-line">
                    <router-link to="/student/schedule">
                      <i class="fas fa-arrow-circle-right"></i>
                      <span @click="hide">บันทึกการเข้าเรียน</span>
                    </router-link>
                  </li>
                  <!-- <li class="bottom-line">
                    <router-link to="/admin/student">
                      <i class="fas fa-user-graduate"></i>
                      <span @click="hide">ข้อมูลนักเรียนที่สอน</span>
                    </router-link>
                  </li> -->
                  <li class="bottom-line">
                    <router-link to="/student/profile">
                      <i class="fas fa-chalkboard-teacher"></i>
                      <span @click="hide">ประวัติส่วนตัว</span>
                    </router-link>
                  </li>
                  <!-- <li class="bottom-line">
                    <router-link to="/admin/course">
                      <i class="fas fa-table"></i>
                      <span @click="hide">ข้อมูลวิชาเรียน</span>
                    </router-link>
                  </li>
                  <li class="bottom-line">
                    <router-link to="/admin/teacher">
                      <i class="fas fa-paste"></i>
                      <span @click="hide">ระบบประเมินต่างๆ</span>
                    </router-link>
                  </li>
                  <li class="bottom-line">
                    <router-link to="/admin">
                      <i class="fas fa-paste"></i>
                      <span @click="hide">รายงาน (Report)</span>
                    </router-link>
                  </li>
                  <li class="bottom-line">
                    <router-link to="/admin/managetable">
                      <i class="fas fa-calendar-alt"></i>
                      <span @click="hide">ระบบจัดการหน้าปฏิทิน</span>
                    </router-link>
                  </li>
                  <li class="bottom-line">
                    <router-link to="/admin/account/overview">
                      <i class="fas fa-university"></i>
                      <span @click="hide">ระบบบัญชี</span>
                    </router-link>
                  </li> -->
                  <li class="bottom-line">
                    <router-link to="/" @click="signOut()">
                      <i class="fa fa-power-off"></i>
                      <span @click="hide">ออกจากระบบ</span>
                    </router-link>
                  </li>
                  <!-- <li class="sidebar-dropdown">
                    <div class="sidebar-submenu">
                      <ul>
                        <li @click="hide">
                          <router-link to="/user/userProfile">ประวัติ
                            <span class="badge badge-pill badge-success"></span>
                          </router-link>
                        </li>
                        <li @click="hide">
                          <router-link to="/user/userBank">บัญชีธนาคาร
                          </router-link>
                        </li>
                        <li @click="hide">
                          <router-link to="/user/changePass">เปลี่ยนรหัสผ่าน
                          </router-link>
                        </li>
                      </ul>
                    </div>
                  </li> -->
                  <!-- <li class="header-menu">
                    <span class="text-center" style="color:#3b5998"><b>สร้างเว็บไซต์ เพจ <i class="fab fa-facebook-square" style="color:white"></i></b></span>
                  </li>
                  <li class="sidebar-dropdown">
                    <a v-b-toggle href="#example-collapse" @click.prevent>
                      <i class="fas fa-bullhorn"></i>
                      <span class="text-center fb"><b>เลือกประเภท</b></span>
                      <span class="badge badge-pill badge-danger">วันละ 1 บาท</span>
                    </a>
                    <b-collapse class="" id="example-collapse" style="background-color:black">
                      <ul>
                        <li @click="hide">
                          <router-link to="/user/product-weble">
                            <span class="fb text-center"><b>เว็บขายสินค้า</b></span>
                          </router-link>
                        </li>
                        <li @click="hide">
                          <router-link to="/user/promotepage">
                            <span class="fb text-center"><b>เว็บร้านอาหารและของกิน</b></span>
                          </router-link>
                        </li>
                        <li @click="hide">
                          <router-link to="/user/dividend">
                            <span class="fb text-center"><b>เว็บที่พักและการท่องเที่ยว</b></span>
                          </router-link>
                        </li>
                        <li @click="hide">
                          <router-link to="/user/dividend">
                            <span class="fb text-center"><b>เว็บธุรกิจ</b></span>
                          </router-link>
                        </li>
                      </ul>
                    </b-collapse>
                  </li>
                  <li class="header-menu">
                    <span class="text-warning text-center ">สาย ฟรี <i class="fas fa-medal"></i></span>
                  </li> -->
                  <!-- <li>
                    <router-link to="/user/partner">
                      <i class="far fa-handshake"></i>
                      <span class="text-warning" @click="hide">ตัวแทนขายหุ้นเว็บ</span>
                      <span class="badge badge-pill badge-danger">มาแรง</span>
                    </router-link>
                  </li> -->
                  <!-- <li id="close-sidebar">
                    <router-link to="/user">
                      <i class="fab fa-affiliatetheme"></i>
                      <span class="text-warning">สมัคร Affliliate</span>
                      <span class="badge badge-pill badge-warning">Cool !!!</span>
                    </router-link>
                  </li>
                  <li>
                    <router-link to="/user/freeproduct">
                      <i class="fas fa-link"></i>
                      <span class="text-warning" @click="hide">ฝากลิงค์Affliliate</span>
                      <span class="badge badge-pill badge-success">ลงเลย</span>
                    </router-link>
                  </li> -->
                  <!-- <li>
                    <router-link to="/user/partner">
                      <i class="fas fa-user-secret"></i>
                      <span class="text-warning" @click="hide">ตัวแทนขายสินค้า</span>
                      <span class="badge badge-pill badge-danger">มาแรง</span>
                    </router-link>
                  </li> -->

                  <!-- <li class="header-menu">
                    <span class="text-success text-center">สาย โปรโมทและรีวิว <i class="fas fa-bullhorn"></i></span>
                  </li>
                  <li>
                    <router-link to="/user/partner">
                      <i class="far fa-eye"></i>
                      <span class="text-success text-center" @click="hide"><b>สมัคร influencer</b></span>
                    </router-link>
                  </li> -->

                  <!-- <li class="header-menu">
                    <span class="text-center" style="color:rgb(19, 117, 245)">สาย ลงทุน <i class="fas fa-hand-holding-usd"></i></span>
                  </li> -->
                  <!-- <li class="sidebar-dropdown">
                    <a href="#">
                      <i class="fas fa-money-bill-alt"></i>
                      <span class="my-text-info text-center "><b>หุ้นส่วนเว็บไซต์</b></span>
                      <span class="badge badge-pill badge-danger">Hot !!!</span>
                    </a>
                    <div class="sidebar-submenu">
                      <ul>
                        <li @click="hide">
                          <router-link to="/user/buypartner">
                          <span class="my-text-info text-center ">ซื้อหุ้นเว็บไซต์</span>
                            <span class="badge badge-pill badge-success">หุ้นละ 200</span>
                          </router-link>
                        </li>
                        <li @click="hide">
                          <router-link to="/user/warning">
                          <span class="my-text-info text-center ">ขายหุ้นเว็บไซต์</span>
                          </router-link>
                        </li>
                        <li @click="hide">
                          <router-link to="/user/partner">
                          <span class="my-text-info text-center ">แนะนำเพื่อน ซื้อหุ้น</span>
                            <span class="badge badge-pill badge-danger">มาแรง</span>
                          </router-link>
                        </li>
                        <li @click="hide">
                          <router-link to="/user/affliliate">
                          <span class="my-text-info text-center ">แนะนำสินค้า Afliliate</span>
                          </router-link>
                        </li>
                        <li @click="hide">
                          <router-link to="/user/dividend">
                          <span class="my-text-info text-center ">เงินปันผลโฆษณา</span>
                          </router-link>
                        </li>
                        <li @click="hide">
                          <router-link to="/user/warning">
                          <span class="my-text-info text-center ">สร้างผู้ใช้ Platform</span>
                          </router-link>
                        </li>
                        <li @click="hide">
                          <router-link to="/user/myShare">
                          <span class="my-text-info text-center ">หุ้นของฉัน</span>
                          </router-link>
                        </li>
                      </ul>
                    </div>
                  </li> -->
                  <!-- <li class="header-menu">
                    <span class="text-danger text-center">สาย การตลาด <i class="fas fa-ad"></i></span>
                  </li>
                  <li class="sidebar-dropdown">
                    <a href="#">
                      <i class="fas fa-ad"></i>
                      <span class="text-danger text-center"><b>ซื้อโฆษณา</b></span>
                      <span class="badge badge-pill badge-success">ถูกสุดๆ</span>
                    </a>
                    <div class="sidebar-submenu">
                      <ul>
                        <li @click="hide">
                          <router-link to="/user/dividend">
                            <span class="text-danger text-center ">แบนเนอร์หน้าแรก</span>
                          </router-link>
                        </li>
                        <li @click="hide">
                          <router-link to="/user/dividend">
                            <span class="text-danger text-center ">แบนเนอร์หน้าแรก</span>
                          </router-link>
                        </li>
                        <li @click="hide">
                          <router-link to="/user/dividend">
                            <span class="text-danger text-center ">แบนเนอร์หน้าแรก</span>
                          </router-link>
                        </li>
                      </ul>
                    </div>
                  </li> -->
                  <!-- <li class="sidebar-dropdown">
                    <a href="#">
                      <i class="fas fa-bullhorn"></i>
                      <span class="text-danger text-center"><b>โปรโมท</b></span>
                      <span class="badge badge-pill badge-primary">วันละ 1 บาท</span>
                    </a>
                    <div class="sidebar-submenu">
                      <ul>
                        <li @click="hide">
                          <router-link to="/user/dividend">
                            <span class="text-danger text-center ">โปรโมทสินค้า</span>
                          </router-link>
                        </li>
                        <li @click="hide">
                          <router-link to="/user/promotepage">
                            <span class="text-danger text-center ">โปรโมทเพจ</span>
                          </router-link>
                        </li>
                        <li @click="hide">
                          <router-link to="/user/dividend">
                            <span class="text-danger text-center ">โปรโมทแบรนด์</span>
                          </router-link>
                        </li>
                        <li @click="hide">
                          <router-link to="/user/dividend">
                            <span class="text-danger text-center ">โปรโมทแฟรนไชส์</span>
                          </router-link>
                        </li>
                      </ul>
                    </div>
                  </li> -->
                  <!-- <li>
                    <router-link to="/user/partner">
                      <i class="fa fa-folder"></i>
                      <span class="text-danger" @click="hide"><b>หาคนรีวิวสินค้า</b></span>
                      <span class="badge badge-pill badge-danger">มาแรง</span>
                    </router-link>
                  </li> -->
                  <!-- <li>
                    <router-link to="/user/partner">
                      <i class="fas fa-user-tie"></i>
                      <span class="text-danger" @click="hide"><b>หาตัวแทนจำหน่าย</b></span>
                      <span class="badge badge-pill badge-warning">Cool</span>
                    </router-link>
                  </li> -->
                  <!-- <li class="float-left">
                    <a  @click="logout()">
                      <i class="fa fa-power-off"></i>
                      <span  style="cursor: pointer;">ออกจากระบบ</span>
                    </a>
                  </li> -->
                </ul>
              </div>
              <!-- sidebar-menu  -->
            </div>
            <!-- sidebar-content  -->
            <!-- <div class="sidebar-footer">
              <a href="#">
                <i class="fa fa-bell"></i>
                <span class="badge badge-pill badge-warning notification">3</span>
              </a>
              <a href="#">
                <i class="fa fa-envelope"></i>
                <span class="badge badge-pill badge-success notification">7</span>
              </a>
              <a href="#">
                <i class="fa fa-cog"></i>
                <span class="badge-sonar"></span>
              </a>
              <a @click="logout()">
                <i class="fa fa-power-off"></i>
              </a>
            </div> -->
          </nav>
          <!-- sidebar-wrapper  -->
          <!-- page-content" -->
          <!-- <div class="mx-auto d-block mt-5">
            <Nuxt />
          </div> -->
        </div>
      </template>
    </b-sidebar>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  data() {
    return {
      email: "",
    };
  },
  asyncData() {
    // email : this.$store.state.authUser.email
  },
  computed: {},

  methods: {
    signOut() {
      fb.auth()
        .signOut()
        .then((user) => {
          this.$router.push("/");
        })
        .catch((error) => {
          error.message;
        });
    },
  },

  mounted() {},
  created() {},
};
</script>

<style lang="scss" scoped>
.bottom-line {
  border-bottom: 2px dotted rgba(253, 255, 254, 0.125);
}
.bottom-line:hover {
  border-bottom: 1px dotted rgba(255, 0, 0, 0.125);
}
</style>
