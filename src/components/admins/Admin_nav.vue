<template>
  <div
    class="
      
      p-2
      navbar-dark
      bg-success
      fixed-top
      shadow
      navbar navbar-expand-xl
    "
    role="navigation"
    style="border-buttom: 2px solid black"
  >
    <div class="logo">
      <b-navbar variant="faded" type="light">
        <b-navbar-brand href="#">
          <img
            src="https://www.mmsmelodious.info/images/logo/medium-1594270995740.png"
            class="d-inline-block align-top"
            alt=""
            style="width: 35px"
          />
          Melodious Music School
        </b-navbar-brand>
      </b-navbar>
    </div>

    <div>
      <b-button variant="primary" v-b-toggle.sidebar-no-header class="my-bar"
        ><i class="fas fa-bars"></i>
      </b-button>
    </div>
    <ul class="navbar-nav ml-auto my-scope">
        
        <li class="nav-item dropdown">
          <h4 class="nav-link" data-toggle="dropdown" href="#">
            <i class="far fa-bell"></i>
            <span class="badge badge-warning navbar-badge ">15</span>
          </h4>
          <!-- <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
            <span class="dropdown-item dropdown-header">15 Notifications</span>
            <div class="dropdown-divider"></div>
            <a href="#" class="dropdown-item">
              <i class="fas fa-envelope mr-2"></i> 4 new messages
              <span class="float-right text-muted text-sm">3 mins</span>
            </a>
            <div class="dropdown-divider"></div>
            <a href="#" class="dropdown-item">
              <i class="fas fa-users mr-2"></i> 8 friend requests
              <span class="float-right text-muted text-sm">12 hours</span>
            </a>
            <div class="dropdown-divider"></div>
            <a href="#" class="dropdown-item">
              <i class="fas fa-file mr-2"></i> 3 new reports
              <span class="float-right text-muted text-sm">2 days</span>
            </a>
            <div class="dropdown-divider"></div>
            <a href="#" class="dropdown-item dropdown-footer"
              >See All Notifications</a
            >
          </div> -->
        </li>
        <!-- <li class="nav-item">
          <a class="nav-link" data-widget="fullscreen" href="#" role="button">
            <i class="fas fa-expand-arrows-alt"></i>
          </a>
        </li> -->
        <!-- <li class="nav-item">
          <span
            class="nav-link"
            data-widget="control-sidebar"
            data-slide="true"
            href="#"
            role="button"
          >
             <i class="fa fa-power-off"></i>
          </span>
        </li> -->
      </ul>
  </div>
</template>

<style lang="scss" scoped>
.my-bar {
  margin-left: 20px;
}
@media (min-width: 721px){
  .my-scope{
    
    margin-right:50px;
    cursor: pointer;
    color: white;
  }
}
@media (max-width : 720px){
  .logo{
    display: none;
  }
  .my-bar{
    display: flex;
    justify-content: end;
    
  }
  .my-scope{
    
    margin-right:10px;
    cursor: pointer;
    color: white;
  }
}
</style>

</style>
