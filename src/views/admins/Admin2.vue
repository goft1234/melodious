<template>
  <div class="user">
    <div class="page-wrapper chiller-theme toggled">
      <a id="show-sidebar" class="btn btn-sm btn-primary" href="#">
        <i class="fas fa-bars"></i>
      </a>
      <nav id="sidebar" class="sidebar-wrapper">
        <div class="sidebar-content">
          <div class="sidebar-brand">
            <a href="#" class="text-center">S H O P C H O B</a>
            <div id="close-sidebar">
              <i class="fas fa-times"></i>
            </div>
          </div>
          <div class="sidebar-header">
            <div class="user-pic">
              <img
                class="img-responsive img-rounded"
                src="https://raw.githubusercontent.com/azouaoui-med/pro-sidebar-template/gh-pages/src/img/user.jpg"
                alt="User picture"
              />
            </div>
            <div class="user-info">
              <span class="user-name"
                >
                <strong class="text-danger">{{email}}</strong>
              </span>
              <span class="user-role" v-if="status == 'nonePartner'">ระดับผู้ใช้งาน : USER ทั่วไป </span>
              <span class="user-role" v-else-if="status == 'isPartner'">ระดับผู้ใช้งาน :ผู้ร่วมลงทุน </span>
              <span class="user-status">
                <i class="fa fa-circle"></i>
                <span>Online</span>
              </span>
            </div>
          </div>
          <!-- sidebar-header  -->
          <!-- <div class="sidebar-search">
            <div>
              <div class="input-group">
                <input
                  type="text"
                  class="form-control search-menu"
                  placeholder="Search..."
                />
                <div class="input-group-append">
                  <span class="input-group-text">
                    <i class="fa fa-search" aria-hidden="true"></i>
                  </span>
                </div>
              </div>
            </div>
          </div> -->
          <!-- sidebar-search  -->
          <div class="sidebar-menu">
            <ul>
              <!-- <li class="header-menu">
                <span class="text-warning text-center ">สาย User <i class="fas fa-medal"></i></span>
              </li> -->
              <!-- <li @click="closeMenu()">
                      <router-link to="/user/buypartner">
                      <span class="my-text-info text-center ">ซื้อหุ้นเว็บไซต์</span>
                        <span class="badge badge-pill badge-success">หุ้นละ 200</span>
                      </router-link>
                    </li> -->
              <li>
                <router-link to="/user/dashboard">
                  <i class="fa fa-chart-line"></i>
                  <span @click="closeMenu()">Dashboard</span>
                </router-link>
              </li>
              <li>
                <router-link to="/">
                  <i class="fas fa-home"></i>
                  <span>หน้าแรก</span>
                </router-link>
              </li>
              <li id="close-sidebar">
                <router-link to="/admin/enroll">
                  <i class="fas fa-heart"></i>
                  <span @click="closeMenu()">สินค้าโดนใจ</span>
                </router-link>
              </li>
              <li>
                <router-link to="/user/affliliate2">
                    <i class="fab fa-affiliatetheme"></i>
                    <span>สมัคร Affliliate</span>
                    <span class="badge badge-pill badge-warning">Cool !!!</span>
                </router-link>
              </li>
              <!-- <li>
                <router-link to="/guideline">
                  <i class="fas fa-gift"></i>                  
                  <span @click="closeMenu()">แนวทางหาเงินจากเว็บ</span>
                </router-link>
              </li> -->
              <li class="sidebar-dropdown">
                <!-- <a href="#">
                  <i class="fas fa-money-bill-alt"></i>
                  <span>ตั้งค่าบัญชี</span>
                  <span class="badge badge-pill badge-danger">New</span>
                </a> -->
                <div class="sidebar-submenu">
                  <ul>
                    <li @click="closeMenu()">
                      <router-link to="/user/userProfile">ประวัติ
                        <span class="badge badge-pill badge-success"></span>
                      </router-link>
                    </li>
                    <li @click="closeMenu()">
                      <router-link to="/user/userBank">บัญชีธนาคาร
                        <!-- <span class="badge badge-pill badge-danger">มาแรง</span> -->
                      </router-link>
                    </li>
                    <li @click="closeMenu()">
                      <router-link to="/user/changePass">เปลี่ยนรหัสผ่าน
                      </router-link>                    
                    </li>
                  </ul>
                </div>
              </li>
              <li class="header-menu">
                <span class="text-center" style="color:#3b5998"><b>สร้างเว็บไซต์ เพจ <i class="fab fa-facebook-square" style="color:white"></i></b></span>
              </li>
              <li class="sidebar-dropdown">
                <a href="#">
                  <i class="fas fa-bullhorn"></i>
                  <span class="text-center fb"><b>เลือกประเภท</b></span>
                  <span class="badge badge-pill badge-danger">วันละ 1 บาท</span>
                </a>
                <div class="sidebar-submenu" style="background-color:black">
                  <ul>
                    <li @click="closeMenu()">
                      <router-link to="/user/promotepage">
                        <span class="fb text-center"><b>เว็บขายสินค้า</b></span>
                      </router-link>
                    </li>
                    <li @click="closeMenu()">
                      <router-link to="/user/promotepage">
                        <span class="fb text-center"><b>เว็บร้านอาหารและของกิน</b></span>
                      </router-link>
                    </li>
                    <li @click="closeMenu()">
                      <router-link to="/user/dividend">
                        <span class="fb text-center"><b>เว็บที่พักและการท่องเที่ยว</b></span>
                      </router-link>
                    </li>
                    <li @click="closeMenu()">
                      <router-link to="/user/dividend">
                        <span class="fb text-center"><b>เว็บธุรกิจ</b></span>
                      </router-link>
                    </li>
                  </ul>
                </div>
              </li>
              <li class="header-menu">
                <span class="text-warning text-center ">สาย ฟรี <i class="fas fa-medal"></i></span>
              </li>
              <!-- <li>
                <router-link to="/user/partner">
                  <i class="far fa-handshake"></i>
                  <span class="text-warning" @click="closeMenu()">ตัวแทนขายหุ้นเว็บ</span>
                  <span class="badge badge-pill badge-danger">มาแรง</span>
                </router-link>
              </li> -->
              <li id="close-sidebar">
                <router-link to="/user/affliliate2">
                  <i class="fab fa-affiliatetheme"></i>
                  <span class="text-warning">สมัคร Affliliate</span>
                  <span class="badge badge-pill badge-warning">Cool !!!</span>
                </router-link>
              </li>
              <li>
                <router-link to="/user/freeproduct">
                  <i class="fas fa-link"></i>
                  <span class="text-warning" @click="closeMenu()">ฝากลิงค์Affliliate</span>
                  <span class="badge badge-pill badge-success">ลงเลย</span>
                </router-link>
              </li>
              <!-- <li>
                <router-link to="/user/partner">
                  <i class="fas fa-user-secret"></i>
                  <span class="text-warning" @click="closeMenu()">ตัวแทนขายสินค้า</span>
                  <span class="badge badge-pill badge-danger">มาแรง</span>
                </router-link>
              </li> -->

              <!-- <li class="header-menu">
                <span class="text-success text-center">สาย โปรโมทและรีวิว <i class="fas fa-bullhorn"></i></span>
              </li>
              <li>
                <router-link to="/user/partner">
                  <i class="far fa-eye"></i>
                  <span class="text-success text-center" @click="closeMenu()"><b>สมัคร influencer</b></span>
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
                    <li @click="closeMenu()">
                      <router-link to="/user/buypartner">
                      <span class="my-text-info text-center ">ซื้อหุ้นเว็บไซต์</span>
                        <span class="badge badge-pill badge-success">หุ้นละ 200</span>
                      </router-link>
                    </li>
                    <li @click="closeMenu()">
                      <router-link to="/user/warning">
                      <span class="my-text-info text-center ">ขายหุ้นเว็บไซต์</span>
                      </router-link>
                    </li>
                    <li @click="closeMenu()">
                      <router-link to="/user/partner">
                      <span class="my-text-info text-center ">แนะนำเพื่อน ซื้อหุ้น</span>
                        <span class="badge badge-pill badge-danger">มาแรง</span>
                      </router-link>
                    </li>
                    <li @click="closeMenu()">
                      <router-link to="/user/affliliate">
                      <span class="my-text-info text-center ">แนะนำสินค้า Afliliate</span>
                      </router-link>
                    </li>
                    <li @click="closeMenu()">
                      <router-link to="/user/dividend">
                      <span class="my-text-info text-center ">เงินปันผลโฆษณา</span>
                      </router-link>
                    </li>
                    <li @click="closeMenu()">
                      <router-link to="/user/warning">
                      <span class="my-text-info text-center ">สร้างผู้ใช้ Platform</span>
                      </router-link>
                    </li>
                    <li @click="closeMenu()">
                      <router-link to="/user/myShare">
                      <span class="my-text-info text-center ">หุ้นของฉัน</span>
                      </router-link>
                    </li>
                  </ul>
                </div>
              </li> -->
              <li class="header-menu">
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
                    <li @click="closeMenu()">
                      <router-link to="/user/dividend">
                        <span class="text-danger text-center ">แบนเนอร์หน้าแรก</span>
                      </router-link>
                    </li>
                    <li @click="closeMenu()">
                      <router-link to="/user/dividend">
                        <span class="text-danger text-center ">แบนเนอร์หน้าแรก</span>
                      </router-link>
                    </li>
                    <li @click="closeMenu()">
                      <router-link to="/user/dividend">
                        <span class="text-danger text-center ">แบนเนอร์หน้าแรก</span>
                      </router-link>
                    </li>
                  </ul>
                </div>
              </li>
              <!-- <li class="sidebar-dropdown">
                <a href="#">
                  <i class="fas fa-bullhorn"></i>
                  <span class="text-danger text-center"><b>โปรโมท</b></span>
                  <span class="badge badge-pill badge-primary">วันละ 1 บาท</span>
                </a>
                <div class="sidebar-submenu">
                  <ul>
                    <li @click="closeMenu()">
                      <router-link to="/user/dividend">
                        <span class="text-danger text-center ">โปรโมทสินค้า</span>
                      </router-link>
                    </li>
                    <li @click="closeMenu()">
                      <router-link to="/user/promotepage">
                        <span class="text-danger text-center ">โปรโมทเพจ</span>
                      </router-link>
                    </li>
                    <li @click="closeMenu()">
                      <router-link to="/user/dividend">
                        <span class="text-danger text-center ">โปรโมทแบรนด์</span>
                      </router-link>
                    </li>
                    <li @click="closeMenu()">
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
                  <span class="text-danger" @click="closeMenu()"><b>หาคนรีวิวสินค้า</b></span>
                  <span class="badge badge-pill badge-danger">มาแรง</span>
                </router-link>
              </li> -->
              <!-- <li>
                <router-link to="/user/partner">
                  <i class="fas fa-user-tie"></i>
                  <span class="text-danger" @click="closeMenu()"><b>หาตัวแทนจำหน่าย</b></span>
                  <span class="badge badge-pill badge-warning">Cool</span>
                </router-link>
              </li> -->
              <li class="float-left">
                <a  @click="logout()">
                  <i class="fa fa-power-off"></i>
                  <span  style="cursor: pointer;">ออกจากระบบ</span>
                </a>
              </li>
            </ul>
          </div>
          <!-- sidebar-menu  -->
        </div>
        <!-- sidebar-content  -->
        <div class="sidebar-footer">
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
        </div>
      </nav>
      <!-- sidebar-wrapper  -->
      <!-- page-content" -->
      <div class="mx-auto d-block mt-5">
          
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { db, fb } from "../../firebase";
import jQuery from 'jquery'
export default {
  name: "user",
  data() {
    return {
      email: "",
      status:'',
    };
  },
  components: {
    // Point,
  },
  methods: {
    closeMenu() {
        $(".page-wrapper").removeClass("toggled");
    },
    logout() {
      fb.auth()
        .signOut()
        .then(() => {
          this.$router.push("/");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    fb.auth().onAuthStateChanged((user) =>{
      if (user) {
        // User is signed in.
        this.email = user.email;
        db.collection('users').doc(user.uid).get().then((doc)=>{
          this.status = doc.data().status
        })
      } else {
        // User is signed out.
        // ...
      }
    });
  },
  mounted() {
    jQuery(function ($) {
      $(".sidebar-dropdown > a").click(function () {
        $(".sidebar-submenu").slideUp(200);
        if ($(this).parent().hasClass("active")) {
          $(".sidebar-dropdown").removeClass("active");
          $(this).parent().removeClass("active");
        } else {
          $(".sidebar-dropdown").removeClass("active");
          $(this).next(".sidebar-submenu").slideDown(200);
          $(this).parent().addClass("active");
        }
      });
      $("#close-sidebar").click(function () {
        $(".page-wrapper").removeClass("toggled");
      });
      $("#show-sidebar").click(function () {
        $(".page-wrapper").addClass("toggled");
      });
    });
  },
};
</script>

<style scoped>
li {
  font-size: .86rem;
}
span {
  color: rgb(255, 255, 255);
}
.my-text-info{
  color:rgb(4, 106, 240)
}
.fb{
  color:#3b5998
}
</style>