<template>
  <div id="studentCourse" class="shadow">
    <div class="container-fluid jumbotron">
      <div class="">
        <h4 class="text-center text-success mb-4">ประวัติการเข้าเรียน</h4>
        <div class="row">
          <div class="col-12">
            <router-link
              class="btn btn-success d-inline-block float-right px-3"
              to="/admin/student"
            >
              ย้อนกลับ
            </router-link>
          </div>
        </div>
        <div class="mt-3 shadow">
          <vue-good-table
            :columns="columns"
            :rows="courseActives"
            :line-numbers="true"
            styleClass="vgt-table striped bordered"
            :search-options="{
              enabled: true,
              placeholder: 'ค้นหา',
            }"
            :pagination-options="{
              enabled: true,
            }"
            compactMode
          >
            <template slot="table-row" slot-scope="props">
              <span v-if="props.column.field == 'attendance'">
                <div
                  class="btn btn-success"
                  data-toggle="modal"
                  data-target="#classroomDetailModal"
                  @click="detail(props.row.classId)"
                >
                  <i class="fas fa-table"></i>
                </div>
              </span>
              <span v-else>
                {{ props.formattedRow[props.column.field] }}
              </span>
            </template>
          </vue-good-table>
        </div>
      </div>
    </div>

    <!-- The Modal -->
    <div class="modal fade" id="classroomDetailModal">
      <div class="modal-dialog modal-dialog-scrollable modal-xl">
        <div class="modal-content">
          <!-- Modal Header -->
          <div class="modal-header">
            <h4 class="modal-title text-success w-100 text-center">
              บันทึกการเข้าเรียน
            </h4>
            <button type="button" class="close" data-dismiss="modal">
              &times;
            </button>
          </div>

          <!-- Modal body -->
          <div class="modal-body">
            <b-card-body>
              <div
                style="border: 1px solid green"
                class="card mb-2"
                v-for="(obj, index) in classHistory"
                :key="index"
              >
                <div class="card-body">
                  <h6 class="text-center text-success">
                    ครั้งที่{{ index + 1 }} วันที่ {{ obj.learningTime }}
                  </h6>
                  <div class="form-group row">
                    <label
                      for="name"
                      class="col-sm-3 col-form-label text-success"
                      >ครูผู้สอน</label
                    >
                    <div class="col-sm-9">
                      <input
                        type="text"
                        class="form-control"
                        id="name"
                        :value="obj.teacherAtclass.teacherName"
                        readonly
                      />
                    </div>
                  </div>
                  <div class="form-group row">
                    <label
                      for="description"
                      class="col-sm-3 col-form-label text-success"
                      >รายละเอียดการสอน</label
                    >
                    <div class="col-sm-9">
                      <textarea
                        class="form-control"
                        id="description"
                        rows="5"
                        disabled
                        :value="obj.commentClass"
                      ></textarea>
                    </div>
                  </div>

                  <div class="form-group row">
                    <div class="col-sm-7">
                      <div class="form-group row">
                        <label
                          for="description"
                          class="col-sm-5 col-form-label text-success"
                          >หมายเหตุ</label
                        >
                        <div class="col-sm-7">
                          <input
                            type="text"
                            class="form-control"
                            :value="obj.commentThisTime"
                            disabled
                          />
                        </div>
                      </div>
                      <div class="form-group row">
                        <label
                          for="description"
                          class="col-sm-5 col-form-label text-success"
                          >นักเรียนที่เข้าเรียน</label
                        >
                        <div class="col-sm-7">
                          <div v-for="(item, idx) in obj.studentYes" :key="idx">
                            <div class="input-group mb-3">
                              <input
                                type="text"
                                class="form-control"
                                placeholder="First Name"
                                :value="item.firstName"
                                disabled
                              />
                              <input
                                type="text"
                                class="form-control"
                                placeholder="Last Name"
                                :value="item.lastName"
                                disabled
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="form-group row">
                        <label
                          for="description"
                          class="col-sm-5 col-form-label text-success"
                          >นักเรียนทั้งหมด</label
                        >
                        <div class="col-sm-7">
                          <div
                            v-for="(item, idx) in obj.studentAtClass"
                            :key="idx"
                          >
                            <div class="input-group mb-3">
                              <input
                                type="text"
                                class="form-control"
                                placeholder="First Name"
                                :value="item.firstName"
                              />
                              <input
                                type="text"
                                class="form-control"
                                placeholder="Last Name"
                                :value="item.lastName"
                              />
                              <div class="input-group-append">
                                <button
                                  @click="studentChk(item, idx, obj)"
                                  class="btn btn-success"
                                  type="submit"
                                >
                                  <i class="fas fa-check-circle"></i>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="col-sm-5">
                      <div class="promotion-image-container text-center">
                        <img
                          :src="obj.attendancePic"
                          width="300"
                          height="300"
                          class="img-thumbnail"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </b-card-body>
          </div>

          <!-- Modal footer -->
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- End Modal -->
  </div>
</template>

<script>
import { db } from "../../firebase";
import moment from "moment";
export default {
  name: "studentCourse",

  data() {
    return {
      columns: [
        {
          label: "ครู",
          field: "teacherAtclass.teacherName",
          type: "text",
        },
        {
          label: "วิชา",
          field: "courseName",
          type: "text",
        },
        {
          label: "ประเภท",
          field: "classType",
          type: "text",
        },
        {
          label: "ระดับ",
          field: "level",
          type: "text",
        },
        {
          label: "วันเรียน",
          field: "dayAttend.item",
          type: "text",
        },
        {
          label: "เวลาเรียน",
          field: "classTime",
          type: "text",
        },
        {
          label: "ชม.คงเหลือ",
          field: "remain",
          type: "text",
        },
        {
          label: "ข้อมูล",
          field: "attendance",
          type: "text",
        },
      ],
      courseActives: [],
      classHistory: {},
    };
  },

  methods: {
    detail(classId) {
      console.log(classId);
      this.classHistory = classId;

      db.collection("AttendanceHistory")
        .where("classId", "==",classId)
        // .orderBy()
        .onSnapshot((querySnapshot) => {
          this.classHistory = [];
          querySnapshot.forEach((doc) => {
            let classHis = {
              docId: doc.id,
              studentAtClass: doc.data().studentAtClass,
              learningTime: moment(doc.data().learningTime)
                .add(543, "year")
                .format("DD/MM/YYYY"),
              commentThisTime: doc.data().commentThisTime,
              commentClass: doc.data().commentClass,
              attendancePic: doc.data().attendancePic,
              teacherAtclass: doc.data().teacherAtclass,
              studentYes: doc.data().studentYes,
            };
            this.classHistory.push(classHis);
            // this.classHistory.reverse();
          });
        });
    },
    getStudentCourse() {
      try {
        this.$store.state.show = true;
        db.collection("courseActive")
          .where("userId", "==", this.$route.params.uid)
          .onSnapshot((querySnapshot) => {
            this.courseActives = [];
            querySnapshot.forEach((doc) => {
              let courseActive = {
                nowDate: moment().format("ll"),
                classId: doc.data().classId,
                remain: doc.data().remain,
                amount: doc.data().amount,
                classType: doc.data().classType,
                courseName: doc.data().courseName,
                dayAttend: doc.data().dayAttend,
                endDate: doc.data().endDate,
                finishTime: moment(doc.data().finishTime, "HH:mm:ss").format(
                  "HH:mm"
                ),
                level: doc.data().level,
                rate: doc.data().rate,
                startDate: doc.data().startDate,
                startTime: moment(doc.data().startTime, "HH:mm:ss").format(
                  "HH:mm"
                ),
                studentId: doc.data().studentId,
                teacherAtclass: doc.data().teacherAtclass,
                wages: doc.data().wages,
                classQty: 0,
                classDiscount: 0,
              };
              courseActive.classTime = `${courseActive.startTime} - ${courseActive.finishTime}`;
              this.courseActives.push(courseActive);
            });
            this.$store.state.show = false;
          });
      } catch (err) {
        console.log(err);
        this.$store.state.show = false;
      }
    },
  },
  mounted() {
    this.getStudentCourse();
    window.scrollTo(0, 0);
  },
};
</script>

<style lang="scss" scoped></style>
