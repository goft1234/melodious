<template>
  <div id="approve" class="shadow">
    
    <div class="container-fluid bg-light py-5">
      
      <h4 class="text-center text-success">อนุมัติผู้ใช้งาน</h4>
      <br />
      <!-- Nav tabs -->
      <ul class="nav nav-tabs" role="tablist">
        <li class="nav-item">
          <a class="nav-link active text-success" data-toggle="tab" href="#home">ครูผู้สอน 
            <!-- <span class="badge badge-pill badge-danger">{{$store.state.teacherApproveCount}}</span> -->
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link text-success" data-toggle="tab" href="#menu1">พนักงาน 
            <!-- <span class="badge badge-pill badge-danger">{{$store.state.employeeApproveCount}}</span> -->
          </a>
        </li>
        
      </ul>

      <!-- Tab panes -->
      <div class="tab-content">
        <div id="home" class="container-fluid tab-pane active">
          <br />
          <ApproveTeacher></ApproveTeacher>
        </div>
        <div id="menu1" class="container-fluid tab-pane fade">
          <br />
          <ApproveEmployee></ApproveEmployee>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
import ApproveTeacher from "@/components/admins/ApproveTeacher.vue";
import ApproveEmployee from "@/components/admins/ApproveEmployee.vue";
import { fb, db } from "../../firebase";

export default {
  name:'approve',
  components: {
    ApproveTeacher,
    ApproveEmployee,
  },
  
  data(){
    return {
     userStatus : null,
    }
  },

  methods:{
    async chkStatus(){
      await fb.auth().onAuthStateChanged;
      var { claims } = await fb.auth().currentUser.getIdTokenResult();

      if(claims.isAdmin){
        this.userStatus = 'isAdmin'
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

  mounted(){
    window.scrollTo(0, 0);
  },
  created(){
    this.chkStatus();
  },


};
</script>

<style scoped>

</style>

