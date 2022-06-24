<template>
  <div class="home">
    <!--wrapper Start  -->
    <div class="wrapper">
      <!--header Start  -->
      <div class="header">
        <div class="header-menu">
          <a class="navbar-brand" href="#">
            <img
              src="https://www.mmsmelodious.info/images/logo/medium-1594270995740.png"
              alt="Logo"
              style="width: 65px"
            />
          </a>
          <div class="my-sidebar-btn" @click="toggleSideBar()">
            <i class="fa-solid fa-bars"></i>
          </div>
          <ul>
            <li>
              <a href="">
                <i class="fa fa-search"></i>
              </a>
            </li>
            <li>
              <a href="">
                <i class="fa fa-bell"></i>
              </a>
            </li>
            <li>
              <a href="">
                <i class="fa fa-power-off"></i>
              </a>
            </li>
          </ul>
        </div>

        <div class="header-menu-mobile">
          <ul>
            <li>
              <router-link to="admin/enroll">
                <i class="fa fa-bell"></i>
              </router-link>
            </li>
            <li>
              <router-link to="admin/enroll">
                <i class="fa fa-power-off"></i>
              </router-link>
            </li>
            <li class="" @click="toggleSideBar">
              <router-link to="admin/enroll"><i class="fa fa-bars"></i></router-link>
            </li>
          </ul>
        </div>
      </div>
      <!--header End  -->

      <!-- sidebar start -->
      <div class="sidebar">
        <div class="sidebar-menu">
          <!-- <center class="profile">
            <img
              src="https://static1.srcdn.com/wordpress/wp-content/uploads/2022/04/One-Piece-Monkey-D-Luffy-Gear5.jpg?q=50&fit=crop&w=960&h=500&dpr=1.5"
              alt=""
            />
            <p>Monkey D. Luffy</p>
          </center> -->
          <li class="item">
            <router-link to="/admin/enroll" class="menu-btn">
              <i class="fas fa-desktop"></i><span>Dashboard</span>
            </router-link>
          </li>
          <li class="item">
            <router-link to="/admin/enroll" class="menu-btn">
              <i class="fas fa-desktop"></i><span>Dashboard</span>
            </router-link>
          </li>
          <li class="item">
            <router-link to="admin/enroll" class="menu-btn">
              <i class="fas fa-desktop"></i><span>Dashboard</span>
            </router-link>
          </li>
          <li class="item">
            <router-link to="admin/enroll" class="menu-btn">
              <i class="fas fa-desktop"></i><span>Dashboard</span>
            </router-link>
          </li>
          <li class="item">
            <router-link to="admin/enroll" class="menu-btn">
              <i class="fas fa-desktop"></i><span>Dashboard</span>
            </router-link>
          </li>
          <li class="item">
            <router-link to="admin/enroll" class="menu-btn">
              <i class="fas fa-desktop"></i><span>Dashboard</span>
            </router-link>
          </li>
          <li class="item">
            <router-link to="admin/enroll" class="menu-btn">
              <i class="fas fa-desktop"></i><span>Dashboard</span>
            </router-link>
          </li>
          <li class="item">
            <router-link to="admin/enroll" class="menu-btn">
              <i class="fas fa-desktop"></i><span>Dashboard</span>
            </router-link>
          </li>
          <li class="item">
            <router-link to="admin/enroll" class="menu-btn">
              <i class="fas fa-desktop"></i><span>Dashboard</span>
            </router-link>
          </li>
          <li class="item">
            <router-link to="admin/enroll" class="menu-btn">
              <i class="fas fa-desktop"></i><span>Dashboard</span>
            </router-link>
          </li>
          <li class="item">
            <router-link to="admin/enroll" class="menu-btn">
              <i class="fas fa-desktop"></i><span>Dashboard</span>
            </router-link>
          </li>
          <li class="item">
            <router-link to="admin/enroll" class="menu-btn">
              <i class="fas fa-desktop"></i><span>Dashboard</span>
            </router-link>
          </li>
          <!-- <li class="item" id="profile">
            <a href="#profile" class="menu-btn">
              <i class="fas fa-user-circle"></i
              ><span
                >Profile <i class="fas fa-chevron-down drop-down"></i
              ></span>
            </a>
            <div class="sub-menu">
              <router-link to="admin/enroll"><i class="fas fa-image"></i><span>Picture</span> </router-link>
              <router-link to="admin/enroll"
                ><i class="fas fa-address-card"></i><span>info</span>
              </router-link>
            </div>
          </li>
          <li class="item" id="message">
            <a href="#message" class="menu-btn">
              <i class="fas fa-envelope"></i
              ><span
                >message <i class="fas fa-chevron-down drop-down"></i
              ></span>
            </a>
            <div class="sub-menu">
              <router-link to="admin/enroll"><i class="fas fa-envelope"></i><span>new</span> </router-link>
              <router-link to="admin/enroll"
                ><i class="fas fa-envelope-square"></i><span>send</span>
              </router-link>
              <router-link to="admin/enroll"
                ><i class="fas fa-exclamation-circle"></i><span>spam</span>
              </router-link>
            </div>
          </li>
          <li class="item" id="setting">
            <a href="#setting" class="menu-btn">
              <i class="fas fa-cog"></i
              ><span
                >setting <i class="fas fa-chevron-down drop-down"></i
              ></span>
            </a>
            <div class="sub-menu">
              <router-link to="admin/enroll"><i class="fas fa-lock"></i><span>Password</span> </router-link>
              <router-link to="admin/enroll"
                ><i class="fas fa-language"></i><span>Language</span>
              </router-link>
            </div>
          </li> -->
          <li class="item">
            <a href="#about" class="menu-btn">
              <i class="fas fa-info-circle"></i><span>About</span>
            </a>
          </li>
        </div>
      </div>
      <!-- sidebar end -->
      <!-- main container start -->
      <div class="main-container">
        <router-view></router-view>
      </div>
      <!-- main container end -->
    </div>
    <!--wrapper End  -->
  </div>
</template>

<script>
export default {
  name: "HomeView",
  methods: {
    toggleSideBar() {
      $(".wrapper").toggleClass("collapse");
      // alert('click')
    },
  },
};
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  list-style: none;
  text-decoration: none;
  box-sizing: border-box;
  // font-family: "Roboto", sans-serif;
}

body {
  background: #fff;
}

.wrapper .header {
  z-index: 1;
  background: #30855c;
  position: fixed;
  width: calc(100% - 0%);
  height: 70px;
  display: flex;
  top: 0;
}

.wrapper .header .header-menu {
  width: calc(100% - 0%);
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

.wrapper .header .header-menu .title {
  color: #fff;
  font-size: 25px;
  text-transform: uppercase;
  font-weight: 900;
}

.wrapper .header .header-menu .title span {
  color: #4ccee8;
}

.wrapper .header .header-menu .my-sidebar-btn {
  color: #fff;
  position: absolute;
  margin-left: 240px;
  font-size: 22px;
  font-weight: 900;
  cursor: pointer;
  transition: 0.3s;
  transition-property: color;
}

.wrapper .header .header-menu .my-sidebar-btn:hover {
  color: #4ccee8;
}

.wrapper .header .header-menu ul {
  display: flex;
}

.wrapper .header .header-menu ul li a {
  background: #fff;
  color: #000;
  display: block;
  margin: 0 10px;
  font-size: 18px;
  width: 34px;
  height: 34px;
  line-height: 35px;
  text-align: center;
  border-radius: 50%;
  transition: 0.3s;
  transition-property: background, color;
}

.wrapper .header .header-menu ul li a:hover {
  background: #4ccee8;
  color: #fff;
}

// Mobile header Start
.wrapper .header .header-menu-mobile {
  width: calc(100% - 0%);
  height: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
  padding: 0 20px;
}
// .wrapper .header .header-menu-mobile .my-sidebar-btn {
//   color: #fff;
//   position: absolute;
//   margin-left: 240px;
//   font-size: 22px;
//   font-weight: 900;
//   cursor: pointer;
//   transition: 0.3s;
//   transition-property: color;
// }

.wrapper .header .header-menu-mobile .my-sidebar-btn:hover {
  color: #4ccee8;
}

.wrapper .header .header-menu-mobile ul {
  display: flex;
}

.wrapper .header .header-menu-mobile ul li a {
  background: #fff;
  color: #000;
  display: block;
  margin: 0 10px;
  font-size: 18px;
  width: 34px;
  height: 34px;
  line-height: 35px;
  text-align: center;
  border-radius: 50%;
  transition: 0.3s;
  transition-property: background, color;
}

.wrapper .header .header-menu-mobile ul li a:hover {
  background: #4ccee8;
  color: #fff;
}
// Mobile header end

.wrapper .sidebar {
  z-index: 1;
  background: #2f323a;
  position: fixed;
  top: 70px;
  width: 250px;
  height: calc(100% - 9%);
  transition: 0.3s;
  transition-property: width;
  overflow-y: auto;
}
/* Hide scrollbar for Chrome, Safari and Opera */
.wrapper .sidebar::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.wrapper .sidebar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.wrapper .sidebar .sidebar-menu {
  overflow: hidden;
}

.wrapper .sidebar .sidebar-menu .profile img {
  margin: 20px 0;
  width: 100px;
  height: 100px;
  border-radius: 50%;
}

.wrapper .sidebar .sidebar-menu .profile p {
  color: #bbb;
  font-weight: 700;
  margin-bottom: 10px;
}

.wrapper .sidebar .sidebar-menu .item {
  width: 250px;
  overflow: hidden;
}

.wrapper .sidebar .sidebar-menu .item .menu-btn {
  display: block;
  color: #fff;
  position: relative;
  padding: 25px 20px;
  transition: 0.3s;
  transition-property: color;
}

.wrapper .sidebar .sidebar-menu .item .menu-btn:hover {
  color: #4ccee8;
}

.wrapper .sidebar .sidebar-menu .item .menu-btn i {
  margin-right: 20px;
}

.wrapper .sidebar .sidebar-menu .item .menu-btn .drop-down {
  float: right;
  font-size: 12px;
  margin-top: 3px;
}

.wrapper .sidebar .sidebar-menu .item .sub-menu {
  background: #3498db;
  overflow: hidden;
  max-height: 0;
  transition: 0.3s;
  transition-property: background, max-height;
}

.wrapper .sidebar .sidebar-menu .item .sub-menu a {
  display: block;
  position: relative;
  color: #fff;
  white-space: nowrap;
  font-size: 15px;
  padding: 20px;
  transition: 0.3s;
  transition-property: background;
}

.wrapper .sidebar .sidebar-menu .item .sub-menu a:hover {
  background: #55b1f0;
}

.wrapper .sidebar .sidebar-menu .item .sub-menu a:not(last-child) {
  border-bottom: 1px solid #8fc5e9;
}

.wrapper .sidebar .sidebar-menu .item .sub-menu i {
  padding-right: 20px;
  font-size: 10px;
}

.wrapper .sidebar .sidebar-menu .item:target .sub-menu {
  max-height: 500px;
}

.wrapper .main-container {
  width: calc(100% - 250px);
  margin-top: 70px;
  margin-left: 250px;
  padding: 15px;
  background: url("@/assets/monogram3.png")no-repeat;
  background-size: cover;
  height: 100vh;
  transition: 0.3s;
}

.wrapper.collapse .sidebar {
  width: 70px;
}

.wrapper.collapse .sidebar .profile img,
.wrapper.collapse .sidebar .profile p,
.wrapper.collapse .sidebar a span {
  display: none;
}

.wrapper.collapse .sidebar .sidebar-menu .item .menu-btn {
  font-size: 23px;
}

.wrapper.collapse .sidebar .sidebar-menu .item .sub-menu i {
  font-size: 18px;
  padding-left: 3px;
}

.wrapper.collapse .main-container {
  width: calc(100% - 70px);
  margin-left: 70px;
}

.wrapper .main-container .card {
  background: #fff;
  padding: 15px;
  margin-bottom: 10px;
  font-size: 14px;
}

@media screen and (max-width: 720px) {
  .wrapper .header .header-menu {
    display: none;
  }
  .wrapper .sidebar {
    width: 0px;
  }
  .wrapper.collapse .sidebar {
    width: 200px;
  }
  // .wrapper.collapse .sidebar .profile img,
  // .wrapper.collapse .sidebar .profile p,
  .wrapper.collapse .sidebar a span {
    display: inline-block;
  }

  .wrapper.collapse .sidebar .sidebar-menu .item .menu-btn {
    font-size: 16px;
  }

  .wrapper .main-container {
    width: calc(100%);
    margin-top: 70px;
    margin-left: 0px;
    padding: 15px;
    // background-image: url("@/assets/monogram3.png") no-repeat;
    // background-size: cover;
    height: 100vh;
    transition: 0.3s;
  }
}
@media screen and (min-width: 721px) {
  .wrapper .header .header-menu-mobile {
    display: none;
  }
}
</style>
