<template>
  <div id="profile">
    <navbar></navbar>
    <!-- {{JSON.stringify(teacherProfile)}} -->
    <div class="container">
      <div class="row ">
        <div class="col-lg-1"></div>
        <div class="col-lg-10 mb-5">
          <div class="jumbotron">
            <select
                class="form-control"
                id="namePrefix"
                v-model="profileType"
              >
                <option disabled value="">เลือกการลงข้อมูลและประวัติ</option>
                <option value="teacher">ข้อมูลและประวัติครูผู้สอน</option>
                <option value="employee">ข้อมูลและประวัติพนักงาน</option>
              </select>
                            <!-- <span>Selected: {{profileType }}</span> -->

          
            <div v-if="profileType == 'teacher'" class="">
              <TeacherProfileForm></TeacherProfileForm>
            </div>
            <div v-if="profileType == 'employee'">
              <EmployeeProfileForm></EmployeeProfileForm>
            </div>
            

            
          </div>
        </div>
        <div class="col-lg-1"></div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import  TeacherProfileForm  from "@/components/teacherProfileForm";
import  EmployeeProfileForm  from "@/components/employeeProfileForm";

export default {

  name: "profile",
  components:{
    TeacherProfileForm,
    EmployeeProfileForm,
  },
  data() {
    return {
      profileType: "",
    }
  },
  methods: {
   
  },
};
</script>

<style>
</style>