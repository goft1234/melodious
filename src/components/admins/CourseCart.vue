<template>
  <div id="CourseCart">
    <!-- {{$route.params.uid}} -->
    <div class="container jumbotron shadow">
      <h4 class="text-center text-success mb-3">คอร์สเรียนทั้งหมด</h4>
      <div class="row">
        <div class="col-md-4" v-for="(item,index) in courses" :key="index" >
          <div class="card my-1 shadow">

            <div class="card-header bg-success text-white" style="border-radius:10px 10px 0 0">{{item.courseName}}</div>

            <div class="card-body">
                <h5 class="text-success text-center my-2">วิชา {{item.courseName}}</h5>
                <h5 class="text-success my-4">ประเภท :{{item.class}}</h5>
                <div class="form-group">
                    <label for="nickName" class="text-success"
                      >อัตราค่าเรียน</label
                    >
                    <select
                      class="form-control"
                      id="namePrefix"
                      v-model="item.selected"
                    >
                      <option disabled value="">เลือก อัตราค่าเรียน</option>
                      <option  >{{item.beginRate}}</option>
                      <option  >{{item.mediumRate}}</option>
                      <option  >{{item.topRate}}</option>
                      <option  >{{item.teacherRate}}</option>
                    </select>
                    <!-- <span>courseSelected: {{ item.selected }}</span> -->
                  </div>
            </div>

            <div class="card-footer bg-success text-white" style="border-radius:0 0 10px 10px">
                <button type="button" @click="test(item)" class="btn btn-secondary float-right">
                    เพิ่มคอร์ส
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "../../firebase";

export default {
  name: "CourseCart",

  data() {
    return {
        courses: [],
    };
  },

  methods: {

    test(test){
        console.log(test);
    },

    getcourses() {
      db.collection("courses").onSnapshot((querySnapshot) => {
        this.courses = [];
        querySnapshot.forEach((doc) => {
          let course = {
            courseName: doc.data().courseName,
            class: doc.data().class,
            beginRate: doc.data().beginRate,
            mediumRate: doc.data().mediumRate,
            topRate: doc.data().topRate,
            teacherRate: doc.data().teacherRate,
            couseId: doc.id,
            selected : "",
          };
          this.courses.push(course);
        });
      });
    },
  },

  mounted() {
    window.scrollTo(0, 0);
    this.getcourses();
  },
};
</script>

<style lang="scss" scoped>
</style>