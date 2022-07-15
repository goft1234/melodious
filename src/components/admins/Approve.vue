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

export default {
  name:'approve',
  components: {
    ApproveTeacher,
    ApproveEmployee,
  },
  
  data(){
    return {
     
    }
  },

  mounted(){
    window.scrollTo(0, 0);
  }


};
</script>

<style scoped>

</style>

