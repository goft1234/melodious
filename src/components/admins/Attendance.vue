<template>
  <div id="teacher" class="shadow">
    <div class="container-fluid jumbotron">
      <div class="">
        <h4 class="text-center text-success mb-4">บันทึกการเข้าเรียน</h4>
        <div class="row mb-2">
          <div class="col-md-3"></div>
          <div class="col-md-6">
            <select
              class="form-control"
              id="namePrefix"
              v-model="setDaySelect"
              @change="setDay()"
            >
              <option disabled value="">
                เลือกเพื่อดูตารางเรียน - สอนรายวัน
              </option>
              <option value="0">ทั้งหมด (Everyday)</option>
              <option value="1">วันจันทร์ (Monday)</option>
              <option value="2">วันอังคาร (Tuesday)</option>
              <option value="3">วันพุธ (Wednesday)</option>
              <option value="4">วันพฤหัสบดี (Thursday)</option>
              <option value="5">วันศุกร์ (Friday )</option>
              <option value="6">วันเสาร์ (Saturday)</option>
              <option value="7">วันอาทิตย์ (Sunday)</option>
            </select>
          </div>
          <div class="col-md-3"></div>
        </div>
        <button
          class="btn btn-info d-inline-block px-2"
          data-toggle="modal"
          data-target="#courseTemplate"
        >
          สร้างแม่แบบ
        </button>
        <button
          @click="addNew"
          class="btn btn-success d-inline-block float-right px-3"
          data-toggle="modal"
          data-target="#addClassroomModal"
        >
          สร้างห้องเรียน
        </button>
      </div>
      <!-- <pre>{{JSON.stringify(groupData, null, 2)}}</pre> -->
      <div class="mt-3 shadow">
        <vue-good-table
          :columns="columns"
          :rows="classrooms"
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
          <!-- props.row คือ profiles -->
          <template slot="table-row" slot-scope="props">
            <!-- <span v-if="props.column.field == 'role'">
          <select @change="changeRole(props.row.uid, $event)" class="custom-select">
            <option :selected="props.row.role.isprofile" value="isprofile">profile</option>
            <option :selected="props.row.role.isAgent" value="isAgent">AGENT</option>
            <option :selected="props.row.role.isAdmin" value="isAdmin">ADMIN</option>
          </select>
      </span> -->
            <!-- @click="fullProfile(props.row)" -->
            <span v-if="props.column.field == 'attendance'">
              <div
                class="btn btn-warning"
                data-toggle="modal"
                data-target="#classroomDetailModal"
                @click="fullProfile(props.row)"
              >
                <i class="fas fa-table"></i>
              </div>
            </span>
            <span v-else-if="props.column.field == 'studentAtClass'">
              <div
                v-for="(item, index) in props.row.studentAtClass"
                :key="index"
              >
                <h6>{{ item.firstName }}</h6>
              </div>
            </span>
            <span v-else-if="props.column.field == 'studentId'">
              <div
                v-for="(item, index) in props.row.studentAtClass"
                :key="index"
              >
                <h6>{{ item.studentId }}</h6>
              </div>
            </span>
            <span v-else-if="props.column.field == 'check'">
              <div class="btn btn-success" @click="stdAttend(props.row)">
                <i class="fas fa-check-circle"></i>
              </div>
            </span>
            <span v-else-if="props.column.field == 'delete'">
              <div class="btn btn-danger" @click="deleteTeacher(props.row.uid)">
                <i class="fas fa-trash-alt"></i>
              </div>
            </span>
            <!-- <span v-else>
        {{props.formattedRow[props.column.field]}}
      </span>       -->
          </template>
        </vue-good-table>
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
            <div class="accordion" role="tablist">
              <b-card no-body class="mb-1">
                <b-card-header header-tag="header" class="p-1" role="tab">
                  <b-button block v-b-toggle.accordion-1 variant="success"
                    >รายละเอียดวิชาเรียน</b-button
                  >
                </b-card-header>
                <b-collapse
                  id="accordion-1"
                  accordion="my-accordion"
                  role="tabpanel"
                >
                  <div class="row mt-2">
                    <div class="col-md-12">
                      <h5 class="text-center text-success">ผู้เรียน</h5>
                    </div>
                  </div>
                  <b-card-body>
                    <div
                      v-for="(item, index) in classroom.studentAtClass"
                      :key="index.userId"
                      class="mb-3"
                    >
                      <div class="card-body" style="background: #e9ecef">
                        <h6 class="card-title text-center text-success">
                          INVOICE NUMBER (INV.No.) {{ item.invoiceNo }}
                        </h6>
                        <p class="card-text">
                          ชื่อ - นามสกุล
                          <span class="text-success"
                            >{{ item.firstName }} {{ item.lastName }}</span
                          >
                        </p>
                        <p class="card-text">
                          ชื่อเล่น
                          <span class="text-success">{{ item.nickName }}</span>
                        </p>
                        <p class="card-text">
                          รหัสนักเรียน
                          <span class="text-success">{{ item.studentId }}</span>
                        </p>
                        <div class="row justify-content-center">
                          <div class="col text-center">
                            <button
                              @click="stdInClassDetail(item)"
                              class="btn btn-primary"
                              data-toggle="modal"
                              data-target="#StudentInClassModal"
                            >
                              รายละเอียด
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <form v-on:submit.prevent class="mt-3">
                      <div class="p-3" style="background: #f2f2f2">
                        <div class="row">
                          <div class="col-lg-6">
                            <div class="form-group">
                              <label for="nickName" class="text-success"
                                >วิชาเรียน</label
                              >
                              <select
                                class="form-control"
                                id="namePrefix"
                                v-model="classroom.courseName"
                                :disabled="disabled == 1"
                              >
                                <option disabled value="">
                                  เลือก วิชาเรียน
                                </option>
                                <option
                                  v-for="(item, index) in courseNameTemplate"
                                  :value="item"
                                  :key="index"
                                >
                                  {{ item }}
                                </option>
                              </select>
                            </div>
                          </div>

                          <div class="col-lg-6">
                            <div class="form-group">
                              <label for="nickName" class="text-success"
                                >รูปแบบการเรียน</label
                              >
                              <select
                                class="form-control"
                                id="namePrefix"
                                v-model="classroom.classType"
                                :disabled="disabled == 1"
                              >
                                <option disabled value="">
                                  เลือก รูปแบบการเรียน
                                </option>
                                <option
                                  v-for="(item, index) in courseTypeTemplate"
                                  :value="item"
                                  :key="index"
                                >
                                  {{ item }}
                                </option>
                              </select>
                            </div>
                          </div>

                          <div class="col-lg-6">
                            <div class="form-group">
                              <label for="nickName" class="text-success"
                                >ระดับการเรียน</label
                              >
                              <select
                                class="form-control"
                                id="namePrefix"
                                v-model="classroom.level"
                                :disabled="disabled == 1"
                              >
                                <option disabled value="">
                                  เลือก ระดับการเรียน
                                </option>
                                <option
                                  v-for="(item, index) in levelTemplate"
                                  :value="item"
                                  :key="index"
                                >
                                  {{ item }}
                                </option>
                              </select>
                            </div>
                          </div>

                          <div class="col-lg-6">
                            <div class="form-group">
                              <label for="nickName" class="text-success"
                                >อาจารย์รายวิชา</label
                              >
                              <select
                                class="form-control"
                                id="namePrefix"
                                v-model="classroom.teacherAtclass"
                                :disabled="disabled == 1"
                              >
                                <option disabled value="">
                                  เลือก อาจารย์รายวิชา
                                </option>
                                <option
                                  v-for="(item, index) in teacherTemplate"
                                  :value="{
                                    teacherId: item.uid,
                                    teacherName: item.fullName,
                                    teacherTel: item.mobilephone,
                                  }"
                                  :key="index"
                                >
                                  {{ item.fullName }}
                                </option>
                              </select>
                              <!-- <span
                              >courseSelected:
                              {{ classroom.teacherAtclass }}</span
                            > -->
                            </div>
                          </div>

                          <div class="col-lg-6">
                            <div class="form-group">
                              <label for="" class="text-success"
                                >เริ่มเรียน เวลา</label
                              >
                              <div>
                                <b-form-timepicker
                                  v-model="classroom.startTime"
                                  locale="th"
                                  placeholder="เลือก-เวลาเริ่มเรียน"
                                  :disabled="disabled == 1"
                                ></b-form-timepicker>
                                <!-- <div class="mt-2">Value: '{{ value }}'</div> -->
                              </div>
                            </div>
                          </div>

                          <div class="col-lg-6">
                            <div class="form-group">
                              <label for="" class="text-success"
                                >เลิกเรียน เวลา</label
                              >
                              <div>
                                <b-form-timepicker
                                  v-model="classroom.finishTime"
                                  locale="th"
                                  placeholder="เลือก-เวลาเลิกเรียน"
                                  :disabled="disabled == 1"
                                ></b-form-timepicker>
                                <!-- <div class="mt-2">Value: '{{ value }}'</div> -->
                              </div>
                            </div>
                          </div>

                          <div class="col-lg-6">
                            <div class="form-group">
                              <label for="" class="text-success"
                                >วันที่เริ่มเรียน</label
                              >
                              <div>
                                <b-form-datepicker
                                  v-model="classroom.startDate"
                                  locale="th"
                                  placeholder="เลือก-วันที่เริ่มเรียน"
                                  :disabled="disabled == 1"
                                ></b-form-datepicker>
                                <!-- <div class="mt-2">Value: '{{ value }}'</div> -->
                              </div>
                            </div>
                          </div>

                          <div class="col-lg-6">
                            <div class="form-group">
                              <label for="" class="text-success"
                                >วันที่เรียนจบ โดยประมาณ</label
                              >
                              <div>
                                <b-form-datepicker
                                  v-model="classroom.endDate"
                                  locale="th"
                                  placeholder="เลือก-วันที่เรียนจบ"
                                  :disabled="disabled == 1"
                                ></b-form-datepicker>
                                <!-- <div class="mt-2">Value: '{{ value }}'</div> -->
                              </div>
                            </div>
                          </div>

                          <div class="col-lg-6">
                            <div class="form-group">
                              <label for="namePrefix" class="text-success"
                                >วันที่เลือกเรียน</label
                              >
                              <select
                                class="form-control"
                                id="namePrefix"
                                v-model="classroom.dayAttend"
                                :disabled="disabled == 1"
                              >
                                <option disabled value="">
                                  วันที่เลือกเรียน
                                </option>
                                <option
                                  v-for="(item, index) in dayTemplate"
                                  :key="index"
                                  :value="{ dayNum: index + 1, item }"
                                  :disabled="disabled == 1"
                                >
                                  {{ item }}
                                </option>
                              </select>
                              <!-- <span>courseSelected: {{ course.daySelected }}</span> -->
                            </div>
                          </div>

                          <div class="col-lg-6">
                            <div class="form-group">
                              <label for="" class="text-success"
                                >จำนวนครั้ง / คอร์ส</label
                              >
                              <div class="form-group">
                                <input
                                  type="number"
                                  class="form-control"
                                  placeholder="กรอกเป็นตัวเลข"
                                  v-model.trim="classroom.amount"
                                  :disabled="disabled == 1"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </b-card-body>
                  <div class="row float-right mb-2">
                    <!-- bug*** -->
                    <div class="col mr-3 text-center">
                      <button
                        @click="editClassroom(classroom)"
                        class="btn btn-warning"
                        v-if="canEdit == false"
                      >
                        แก้ไข
                      </button>
                      <button
                        v-else
                        @click="updateClassroom(classroom.classId)"
                        class="btn btn-success"
                      >
                        บันทึก
                      </button>
                    </div>
                  </div>
                </b-collapse>
              </b-card>

              <b-card no-body class="mb-1">
                <b-card-header header-tag="header" class="p-1" role="tab">
                  <b-button block v-b-toggle.accordion-2 variant="success"
                    >บันทึกการสอน - การเข้าเรียน</b-button
                  >
                </b-card-header>
                <b-collapse
                  id="accordion-2"
                  accordion="my-accordion"
                  role="tabpanel"
                >
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
                                <div
                                  v-for="(item, idx) in obj.studentYes"
                                  :key="idx"
                                >
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
                              <img :src="obj.attendancePic" width="300" height="300" class="img-thumbnail" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- <div class="table-responsive">
                      <table class="table table-bordered">
                        <thead class="thead-light">
                          <tr class="text-center">
                            <th>วันที่</th>
                            <th>นักเรียนทั้งหมด</th>
                            <th>นักเรียนที่มา</th>
                            <th>อาจารย์</th>
                            <th>รายละเอียดการสอน</th>
                            <th>ลายเซนต์</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(obj, index) in classHistory" :key="index">
                            <td>
                              ครั้งที่{{ index + 1 }} <br />{{
                                obj.learningTime
                              }}
                            </td>
                            <td>
                              <p
                                v-for="(item, idx) in obj.studentAtClass"
                                :key="idx"
                              >
                                {{ item.firstName }} {{ item.lastName }}
                                <button
                                  @click="studentChk(item, idx, obj)"
                                  class="btn btn-success"
                                >
                                  <i class="fas fa-check-circle"></i>
                                </button>
                              </p>
                            </td>
                            <td>
                              <p
                                v-for="(item, idx) in obj.studentYes"
                                :key="idx"
                              >
                                {{ item.firstName }} {{ item.lastName }}
                              </p>
                            </td>
                            <td>{{ obj.teacherAtclass.teacherName }}</td>
                            <td>
                              <div class="form-group">
                                <label for="comment">Comment:</label>
                                <textarea
                                  class="form-control"
                                  rows="5"
                                  id="comment"
                                ></textarea>
                              </div>
                            </td>
                            <td></td>
                          </tr>
                        </tbody>
                      </table>
                    </div> -->
                    <!-- <pre>
                      <div v-for="(obj,index) in classHistory" :key="index">
                        {{obj.learningTime}}
                      </div>
                      
                    </pre> -->
                  </b-card-body>
                </b-collapse>
              </b-card>

              <b-card no-body class="mb-1">
                <b-card-header header-tag="header" class="p-1" role="tab">
                  <b-button block v-b-toggle.accordion-3 variant="success"
                    >สร้างชั่วโมงเรียน</b-button
                  >
                </b-card-header>
                <b-collapse
                  id="accordion-3"
                  visible
                  accordion="my-accordion"
                  role="tabpanel"
                >
                  <b-card-body>
                    <div class="row">
                      <div class="col-lg-6">
                        <div class="form-group">
                          <label for="" class="text-success">วันที่</label>
                          <div>
                            <b-form-datepicker
                              v-model="classroom.learningTime"
                              locale="th"
                              placeholder="เลือก-วันที่"
                            ></b-form-datepicker>
                            <!-- <div class="mt-2">Value: '{{ value }}'</div> -->
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <div class="form-group">
                          <label for="nickName" class="text-success"
                            >อาจารย์รายวิชา</label
                          >
                          <select
                            class="form-control"
                            id="namePrefix"
                            v-model="classroom.teacherAtclass"
                          >
                            <option disabled value="">
                              เลือก อาจารย์รายวิชา
                            </option>
                            <option
                              v-for="(item, index) in teacherTemplate"
                              :value="{
                                teacherId: item.uid,
                                teacherName: item.fullName,
                                teacherTel: item.mobilephone,
                              }"
                              :key="index"
                            >
                              {{ item.fullName }}
                            </option>
                          </select>
                          <!-- <span
                              >courseSelected:
                              {{ classroom.teacherAtclass }}</span
                            > -->
                        </div>
                      </div>

                      <div class="col-lg-6">
                        <div class="form-group">
                          <label for="nickName" class="text-success"
                            >หมายเหตุ</label
                          >
                          <textarea
                            class="form-control"
                            id="exampleFormControlTextarea1"
                            rows="5"
                            placeholder="ใส่รายละเอียดเมื่อมีการแก้ไข ย้ายวัน-เวลา หรือเปลี่ยนครูเข้าสอนแทน"
                            v-model.trim="classroom.commentThisTime"
                          ></textarea>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col text-center">
                        <div
                          @click="addClassroomHis(classroom)"
                          class="btn btn-success px-3"
                        >
                          เพิ่มข้อมูล
                        </div>
                      </div>
                    </div>
                  </b-card-body>
                </b-collapse>
              </b-card>
            </div>
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
    <!-- </b-overlay> -->

    <!--Start The Classroom Modal -->
    <div class="modal fade" id="addClassroomModal">
      <div class="modal-dialog modal-dialog-scrollable modal-xl">
        <div class="modal-content">
          <!-- Modal Header -->
          <div class="modal-header">
            <h4
              v-if="modal == 'new'"
              class="modal-title w-100 text-center text-success"
            >
              สร้างห้องเรียน
            </h4>
            <h4
              v-if="modal == 'edit'"
              class="modal-title w-100 text-center text-warning"
            >
              แก้ไขวิชาเรียน
            </h4>
            <button type="button" class="close" data-dismiss="modal">
              &times;
            </button>
          </div>

          <!-- Modal body -->
          <div class="modal-body">
            <form v-on:submit.prevent>
              <!-- <h6 class="float-left text-success mb-2">ชื่อวิชาเรียน/หลักสูตร</h6> -->
              <div class="p-3" style="background: #e9ecef">
                <div class="row">
                  <div class="col-lg-6">
                    <div class="form-group">
                      <label for="nickName" class="text-success"
                        >วิชาเรียน</label
                      >
                      <select
                        class="form-control"
                        id="namePrefix"
                        v-model="classroom.courseName"
                      >
                        <option disabled value="">เลือก วิชาเรียน</option>
                        <option
                          v-for="(item, index) in courseNameTemplate"
                          :value="item"
                          :key="index"
                        >
                          {{ item }}
                        </option>
                      </select>
                    </div>
                  </div>

                  <div class="col-lg-6">
                    <div class="form-group">
                      <label for="nickName" class="text-success"
                        >รูปแบบการเรียน</label
                      >
                      <select
                        class="form-control"
                        id="namePrefix"
                        v-model="classroom.classType"
                      >
                        <option disabled value="">เลือก รูปแบบการเรียน</option>
                        <option
                          v-for="(item, index) in courseTypeTemplate"
                          :value="item"
                          :key="index"
                        >
                          {{ item }}
                        </option>
                      </select>
                    </div>
                  </div>

                  <div class="col-lg-6">
                    <div class="form-group">
                      <label for="nickName" class="text-success"
                        >ระดับการเรียน</label
                      >
                      <select
                        class="form-control"
                        id="namePrefix"
                        v-model="classroom.level"
                      >
                        <option disabled value="">เลือก ระดับการเรียน</option>
                        <option
                          v-for="(item, index) in levelTemplate"
                          :value="item"
                          :key="index"
                        >
                          {{ item }}
                        </option>
                      </select>
                    </div>
                  </div>

                  <div class="col-lg-6">
                    <div class="form-group">
                      <label for="nickName" class="text-success"
                        >อัตราค่าเรียน</label
                      >
                      <select
                        class="form-control"
                        id="namePrefix"
                        v-model="classroom.rate"
                      >
                        <option disabled value="">เลือก อัตราค่าเรียน</option>
                        <option
                          v-for="(item, index) in rateTemplate"
                          :value="item"
                          :key="index"
                        >
                          {{ item }}
                        </option>
                      </select>
                    </div>
                  </div>

                  <!-- <div class="col-lg-6">
                    <div class="form-group">
                      <label for="namePrefix" class="text-success"
                        >ส่วนลด โปรโมชั่น</label
                      >
                      <div class="form-group">
                        <input
                          type="number"
                          class="form-control"
                          placeholder="กรอกเป็นตัวเลข"
                          min="0"
                          v-model.trim="classroom.discount"
                        />
                      </div>
                    </div>
                  </div> -->

                  <div class="col-lg-6">
                    <div class="form-group">
                      <label for="nickName" class="text-success"
                        >อาจารย์รายวิชา</label
                      >
                      <select
                        class="form-control"
                        id="namePrefix"
                        v-model="classroom.teacherAtclass"
                      >
                        <option disabled value="">เลือก อาจารย์รายวิชา</option>
                        <option
                          v-for="(item, index) in teacherTemplate"
                          :value="{
                            teacherId: item.uid,
                            teacherName: item.fullName,
                            teacherTel: item.mobilephone,
                          }"
                          :key="index"
                        >
                          {{ item.fullName }}
                        </option>
                      </select>
                      <!-- <span
                              >courseSelected:
                              {{ course.teacherAtclass }}</span
                            > -->
                    </div>
                  </div>

                  <div class="col-lg-6">
                    <div class="form-group">
                      <label for="namePrefix" class="text-success"
                        >ค่าสอนของครู</label
                      >
                      <div class="form-group">
                        <input
                          type="number"
                          class="form-control"
                          placeholder="กรอกเป็นตัวเลข"
                          min="0"
                          v-model.trim="classroom.wages"
                        />
                      </div>
                    </div>
                  </div>

                  <div class="col-lg-6">
                    <div class="form-group">
                      <label for="" class="text-success">เริ่มเรียน เวลา</label>
                      <div>
                        <b-form-timepicker
                          v-model="classroom.startTime"
                          locale="th"
                          placeholder="เลือก-เวลาเริ่มเรียน"
                        ></b-form-timepicker>
                        <!-- <div class="mt-2">Value: '{{ value }}'</div> -->
                      </div>
                    </div>
                  </div>

                  <div class="col-lg-6">
                    <div class="form-group">
                      <label for="" class="text-success">เลิกเรียน เวลา</label>
                      <div>
                        <b-form-timepicker
                          v-model="classroom.finishTime"
                          locale="th"
                          placeholder="เลือก-เวลาเลิกเรียน"
                        ></b-form-timepicker>
                        <!-- <div class="mt-2">Value: '{{ value }}'</div> -->
                      </div>
                    </div>
                  </div>

                  <div class="col-lg-6">
                    <div class="form-group">
                      <label for="" class="text-success"
                        >วันที่เริ่มเรียน</label
                      >
                      <div>
                        <b-form-datepicker
                          v-model="classroom.startDate"
                          locale="th"
                          placeholder="เลือก-วันที่เริ่มเรียน"
                        ></b-form-datepicker>
                        <!-- <div class="mt-2">Value: '{{ value }}'</div> -->
                      </div>
                    </div>
                  </div>

                  <div class="col-lg-6">
                    <div class="form-group">
                      <label for="" class="text-success"
                        >วันที่เรียนจบ โดยประมาณ</label
                      >
                      <div>
                        <b-form-datepicker
                          v-model="classroom.endDate"
                          locale="th"
                          placeholder="เลือก-วันที่เรียนจบ"
                        ></b-form-datepicker>
                        <!-- <div class="mt-2">Value: '{{ value }}'</div> -->
                      </div>
                    </div>
                  </div>

                  <div class="col-lg-6">
                    <div class="form-group">
                      <label for="namePrefix" class="text-success"
                        >วันที่เลือกเรียน</label
                      >
                      <select
                        class="form-control"
                        id="namePrefix"
                        v-model="classroom.dayAttend"
                      >
                        <option disabled value="">วันที่เลือกเรียน</option>
                        <option
                          v-for="(item, index) in dayTemplate"
                          :key="index"
                          :value="{ dayNum: index + 1, item }"
                        >
                          {{ item }}
                        </option>
                      </select>
                      <!-- <span>courseSelected: {{ course.daySelected }}</span> -->
                    </div>
                  </div>

                  <div class="col-lg-6">
                    <div class="form-group">
                      <label for="" class="text-success"
                        >จำนวนครั้ง / คอร์ส</label
                      >
                      <div class="form-group">
                        <input
                          type="number"
                          class="form-control"
                          placeholder="กรอกเป็นตัวเลข"
                          v-model.trim="classroom.amount"
                        />
                      </div>
                    </div>
                  </div>

                  <!-- <div class="col-lg-6">
                    <div class="form-group">
                      <label for="" class="text-success">จำนวนคอร์ส</label>
                      <div class="form-group">
                        <input
                          type="number"
                          class="form-control"
                          placeholder="กรอกเป็นตัวเลข"
                          min="1"
                          v-model.trim="classroom.qty"
                        />
                      </div>
                    </div>
                  </div> -->
                </div>
              </div>
            </form>
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
            <button
              @click="addClassroom()"
              type="button"
              class="btn btn-success"
              v-if="modal == 'new'"
            >
              สร้างห้องเรียน
            </button>
            <button
              @click="updatecourse(course.couseId)"
              type="button"
              class="btn btn-warning"
              v-if="modal == 'edit'"
            >
              แก้ไข
            </button>
          </div>
        </div>
      </div>
    </div>
    <!--End The Modal -->

    <!-- The Modal -->
    <div class="modal fade" id="StudentInClassModal">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <!-- Modal Header -->
          <!-- <div class="modal-header">
            <h4 class="modal-title">รายละเอียดในคอร์สเรียน</h4>
            <button type="button" class="close" data-dismiss="modal">
              &times;
            </button>
          </div> -->

          <!-- Modal body -->
          <div class="modal-body">
            <div class="p-3" style="background: #f2f2f2">
              <div class="row" v-for="(item, index) in stdInClass" :key="index">
                <div class="mt-3">
                  <div class="row text-left">
                    <div class="col-lg-4 col-md-6">
                      <div>
                        ชม.คงเหลือ
                        <span class="text-success">{{ item.amount }}</span>
                      </div>
                    </div>
                    <div class="col-lg-4 col-md-6">
                      <div>
                        วิชา
                        <span class="text-success">{{ item.courseName }}</span>
                      </div>
                    </div>
                    <div class="col-lg-4 col-md-6">
                      <div>
                        ชั้นเรียน
                        <span class="text-success">{{ item.classType }}</span>
                      </div>
                    </div>
                    <div class="col-lg-4 col-md-6">
                      <div>
                        ชั้นเรียน
                        <span class="text-success">{{ item.level }}</span>
                      </div>
                    </div>

                    <!-- <div class="col-lg-4 col-md-6">
                          <div>
                            ชื่อเล่น
                            <span class="text-success">{{
                              item.nickName
                            }}</span>
                          </div>
                        </div> -->

                    <div class="col-lg-4 col-md-6">
                      <div>
                        วันเรียน
                        <span class="text-success">{{
                          item.dayAttend.item
                        }}</span>
                      </div>
                    </div>
                    <!-- <div class="col-lg-4 col-md-6">
                          <div>
                            เวลาเรียน
                            <span class="text-success"
                              >{{ item.startTime }}-{{
                                item.finishTime
                              }}</span
                            >
                          </div>
                        </div> -->
                    <div class="col-lg-4 col-md-6">
                      <div>
                        เบอร์โทร
                        <span class="text-success">{{ item.mobilephone }}</span>
                      </div>
                    </div>

                    <!-- <div class="col-lg-4 col-md-6">
                          <div>
                            โปรโมชั่น
                            <span class="text-success"
                              >เซตเสือน้อย5%แถมฟรี1ครั้ง</span
                            >
                          </div>
                        </div> -->
                    <!-- <div class="col-lg-4 col-md-6">
                          <div>
                            วันที่เริ่มเรียน
                            <span class="text-success">{{
                              item.startDate
                            }}</span>
                          </div>
                        </div>
                        <div class="col-lg-4 col-md-6">
                          <div>
                            วันที่เรียนจบ
                            <span class="text-success">{{
                              item.endDate
                            }}</span>
                          </div>
                        </div> -->
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Modal footer -->
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-dismiss="modal">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db, functions, fb } from "../../firebase.js";
import moment from "moment";
import firebase from "firebase/app";

export default {
  name: "",
  data() {
    return {
      columns: [
        {
          label: "ครู",
          field: "teacherAtclass.teacherName",
          type: "text",
        },
        {
          label: "นักเรียน",
          field: "studentAtClass",
          type: "text",
        },
        {
          label: "รหัสนักเรียน",
          field: "studentId",
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
          field: "startTime",
          type: "text",
        },
        {
          label: "บันทึก",
          field: "attendance",
          type: "text",
        },
        // {
        //   label: "เช็คชื่อเข้าเรียน",
        //   field: "check",
        //   type: "text",
        // },
        {
          label: "delete",
          field: "delete",
          type: "text",
        },
      ],
      profiles: [],

      profile: {
        // amount: "",
        // addProfileAt: "",
        // image: null,
        // namePrefix: "",
        // nickName: "",
        // firstName: "",
        // lastName: "",
        // birthday: null,
        // email: "",
        // telephone: "",
        // mobilephone: "",
        // address: {
        //   addressNumber: "",
        //   location: "",
        //   soi: "",
        //   road: "",
        //   district: "",
        //   amphoe: "",
        //   province: "",
        //   zipcode: "",
        // },
        // graduated: {
        //   degree: "",
        //   university: "",
        //   faculty: "",
        //   major: "",
        // },
        // subject: "",
        // workingProfile: "",
        // profileType: "teacher",
      },

      classroom: {
        classId: "",
        amount: 12,
        classType: "",
        courseName: "",
        createdAt: "",
        dayAttend: "",
        endDate: "",
        finishTime: "",
        level: "",
        rate: 0,
        startDate: "",
        startTime: "",
        studentAtClass: [],
        teacherAtclass: "",
        wages: 0,

        nowDate: Date.now(),
      },

      courseNameTemplate: [],
      courseTypeTemplate: [],
      levelTemplate: [],
      rateTemplate: [],
      teacherTemplate: [],
      dayTemplate: [
        "จันทร์",
        "อังคาร",
        "พุธ",
        "พฤหัส",
        "ศุกร์",
        "เสาร์",
        "อาทิตย์",
      ],

      modal: null,
      classrooms: [],
      disabled: 0,
      canEdit: false,
      commentThisTime: "",

      classHistory: [],
      stdInClass: [],
      setDaySelect: "",
      // https://via.placeholder.com/300x200
      attendancePic: "https://via.placeholder.com/300x200",
    };
  },

  methods: {
    setDay() {
      console.log(this.setDaySelect);
      try {
        this.$store.state.show = true;
        let day = parseInt(this.setDaySelect)
        let refDay;
        if(day == 0){
          refDay = db.collection("classroom").orderBy("dayAttend.dayNum","desc")
        }
        else{
          refDay = db.collection("classroom")
          .where("dayAttend.dayNum", "==", day)
          .where("amount", ">=", 1)
        }
        // var date = moment().isoWeekday();
        // console.log(date);

          refDay.onSnapshot((querySnapshot) => {
            this.classrooms = [];
            querySnapshot.forEach((doc) => {
              // if(!doc.data().role.isAdmin)
              // {
              // console.log(doc.data());
              let classroom = {
                nowDate: moment().format("ll"),
                classId: doc.id,

                amount: doc.data().amount,
                classType: doc.data().classType,
                courseName: doc.data().courseName,
                createdAt: doc.data().createdAt,
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
                studentAtClass: doc.data().student,
                teacherAtclass: doc.data().teacherAtclass,
                wages: doc.data().wages,
              };
              this.classrooms.push(classroom);
              console.log(this.classrooms);
              this.$store.state.show = false;
            });
            this.$store.state.show = false;
          });
      } catch (err) {
        console.log(err);
        this.$store.state.show = false;
      }
    },

    stdInClassDetail(item) {
      console.log(item);
      // $('#StudentInClassModal').modal('show')
      var docRef = db
        .collection("courseActive")
        .where("classId", "==", item.classId)
        .where("userId", "==", item.userId);

      docRef
        .get()
        .then((querySnapshot) => {
          this.stdInClass = [];
          querySnapshot.forEach((doc) => {
            let detail = {
              docId: doc.id,
              amount: doc.data().amount,
              classQty: doc.data().classQty,
              classType: doc.data().classType,
              courseName: doc.data().courseName,
              dayAttend: doc.data().dayAttend,
              endDate: moment(doc.data().endDate).add(543, "year").format("LL"),
              finishTime: doc.data().finishTime,
              invoiceNo: doc.data().invoiceNo,
              level: doc.data().level,
              mobilephone: doc.data().mobilephone,
              nickName: doc.data().nickName,
              startDate: moment(doc.data().startDate)
                .add(543, "year")
                .format("LL"),
              startTime: doc.data().startTime,
            };
            this.stdInClass.push(detail);
          });
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    },
    async studentChk(item, idx, obj) {
      // console.log(item);
      // console.log(idx);
      // console.log(obj);
      // console.log((item["chk"] = true));
      // console.log(item);
      Swal.fire({
        title: "ยืนยันการเข้าเรียน",
        text: "ยืนยันการเข้าเรียน",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#30855c",
        cancelButtonColor: "#d33",
        confirmButtonText: "ยืนยัน",
      }).then((result) => {
        this.$store.state.show = true;
        if (result.value) {
          this.stdChkProcess(item, idx, obj);
        } else {
          this.$store.state.show = false;
        }
      });
    },

    async stdChkProcess(item, idx, obj) {
      await db
        .collection("AttendanceHistory")
        .doc(obj.docId)
        .update({
          studentYes: firebase.firestore.FieldValue.arrayUnion(item),
        });

      var docRef = db
        .collection("courseActive")
        .where("classId", "==", item.classId)
        .where("userId", "==", item.userId);

      docRef
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data().amount);
            let newAmount = doc.data().amount - 1;
            db.collection("courseActive")
              .doc(doc.id)
              .update({ amount: newAmount })
              .then(() => {
                Swal.fire({
                  title: "เพิ่มข้อมูลเรียบร้อย",
                  text: "ได้ทำการเพิ่มข้อมูลการเข้าเรียนแล้ว",
                  icon: "success",
                  confirmButtonColor: "#30855c",
                  confirmButtonText: "ตกลง",
                });
                this.$store.state.show = false;
              });
          });
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
          this.$store.state.show = false;
        });
    },
    async addClassroomHis(classroom) {
      
      classroom.attendancePic = 'https://media.istockphoto.com/vectors/attendance-concept-vector-flat-design-vector-id1198430065?k=20&m=1198430065&s=170667a&w=0&h=Ah8_cY025T_GPNeASpti9X95K7eAWBzq2IwWCA0oQtI='
      classroom.commentClass = '';
      console.log(classroom);
      try {
        await db.collection("AttendanceHistory").add(classroom);
        Swal.fire({
          title: "เพิ่มข้อมูลเรียบร้อย",
          text: "ได้ทำการเพิ่มข้อมูลแล้วเรียบร้อย",
          icon: "success",
          confirmButtonColor: "#30855c",
          confirmButtonText: "ตกลง",
        });
        classroom.commentThisTime = null;
        classroom.learningTime = null;
      } catch (err) {
        Swal.fire({
          title: "เกิดข้อผิดพลาด",
          text: "เกิดข้อผิดพลาดบางอย่าง กรุณารอและทำรายการใหม่",
          icon: "error",
          confirmButtonColor: "#FF0000",
          confirmButtonText: "ตกลง",
        });
      }
    },

    stdAttend(attend) {
      Swal.fire({
        title: "ยืนยันการเข้าเรียน",
        text: "ยืนยันการอนุมัติ การเข้าเรียน",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#30855c",
        cancelButtonColor: "#d33",
        confirmButtonText: "ยืนยัน",
      }).then(async (result) => {
        if (result.value) {
          this.$store.state.show = true;
          var batch = db.batch();

          var newAmount = attend.amount - 1;
          var attendRef = db.collection("courseActive").doc(attend.courseId);
          batch.set(attendRef, { amount: newAmount }, { merge: true });

          var attendDataRef = db.collection("attendData").doc();
          batch.set(attendDataRef, attend, { merge: true });

          await batch.commit().then(() => {
            Swal.fire({
              title: "Success",
              text: "ทำการลงชื่อเข้าเรียนเรียบร้อย",
              icon: "success",
              confirmButtonColor: "#30855c",
              confirmButtonText: "ตกลง",
            });
            this.$store.state.show = false;
          });
        } else {
          this.$store.state.show = false;
        }
      });
    },

    editClassroom(detail) {
      console.log(detail);
      // this.profileModal = "edit";
      // this.profile = profile;
      this.canEdit = true;
      this.disabled = 0;
    },

    updateClassroom(classId) {
      db.collection("classroom")
        .doc(classId)
        .update(this.classroom)
        .then(() => {
          Swal.fire({
            title: "อัพเดทข้อมูล",
            text: "ได้ทำการupdateสินค้าเรียบร้อย",
            icon: "success",
            confirmButtonColor: "#30855c",
            confirmButtonText: "ตกลง",
          });
          // $("#product").modal("hide");
          this.disabled = 1;
          this.canEdit = false;
        });
    },

    reset() {
      this.classroom = {
        classId: "",
        amount: 12,
        classType: "",
        courseName: "",
        createdAt: "",
        dayAttend: "",
        endDate: "",
        finishTime: "",
        level: "",
        rate: 0,
        startDate: "",
        startTime: "",
        studentAtClass: [],
        teacherAtclass: "",
        wages: 0,

        nowDate: Date.now(),
      };
    },

    async addClassroom() {
      try {
        await db.collection("classroom").add(this.classroom);
        Swal.fire({
          title: "เพิ่มข้อมูลเรียบร้อย",
          text: "ได้ทำการเพิ่มข้อมูลแล้วเรียบร้อย",
          icon: "success",
          confirmButtonColor: "#30855c",
          confirmButtonText: "ตกลง",
        });
        $("#course").modal("hide");
        this.reset();
      } catch (err) {
        Swal.fire({
          title: "เกิดข้อผิดพลาด",
          text: "เกิดข้อผิดพลาดบางอย่าง กรุณารอและทำรายการใหม่",
          icon: "error",
          confirmButtonColor: "#FF0000",
          confirmButtonText: "ตกลง",
        });
      }
    },
    addNew() {
      this.modal = "new";
      this.reset();
    },
    deleteTeacher(uid) {
      Swal.fire({
        title: "ต้องการลบ?",
        text: "ทำการลบแล้วไม่สามารถย้อนกลับได้",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#30855c",
        cancelButtonColor: "#d33",
        confirmButtonText: "ตกลง ลบข้อมูล",
      })
        .then((result) => {
          if (result.value) {
            this.$store.state.show = true;
            var del = functions.httpsCallable("deleteTeacher");
            var data = { uid: uid };

            del(data).then(() => {
              Swal.fire({
                title: "ทำการลบเรียบร้อย",
                text: "ได้ทำการลบผู้ใช้งานนี้เรียบร้อย",
                icon: "success",
                confirmButtonColor: "#30855c",
                confirmButtonText: "ตกลง",
              });
              this.$store.state.show = false;
            });
          }
        })
        .catch((error) => {
          // console.log("Transaction failed: ", error);
          Swal.fire({
            title: "เกิดข้อผิดพลาด",
            text: "เกิดข้อผิดพลาดที่ระบบ กรุณาลองใหม่อีกครั้ง",
            icon: "warning",
            confirmButtonColor: "#FF0000",
            confirmButtonText: "ตกลง",
          });
          this.$store.state.show = false;
        });
    },

    fullProfile(detail) {
      // alert(profile.firstName);
      // console.log(detail.classId);
      this.classroom = detail;
      this.disabled = 1;

      db.collection("AttendanceHistory")
        .where("classId", "==", detail.classId)
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
              commentClass : doc.data().commentClass,
              attendancePic : doc.data().attendancePic,
              teacherAtclass: doc.data().teacherAtclass,
              studentYes: doc.data().studentYes,
            };
            this.classHistory.push(classHis);
            // this.classHistory.reverse();
          });
        });
    },
    getDate() {
      var date = moment(Date.now()).day();
      // console.log(date);
    },

    async getCourseTemplate() {
      try {
        this.$store.state.show = true;
        const doc = await db.collection("courseTemplate").doc("detail").get();
        if (doc.empty) {
          console.log("No matching documents.");
          return;
        }
        this.courseNameTemplate = doc.data().courseName;
        this.courseTypeTemplate = doc.data().courseType;
        this.levelTemplate = doc.data().level;
        this.rateTemplate = doc.data().rate;
        this.teacherTemplate = doc.data().teacher;

        console.log(this.teacherTemplate);
        // this.addNewItem();
        this.$store.state.show = false;
      } catch (err) {
        Swal.fire({
          title: "เกิดข้อผิดพลาดที่ระบบ",
          text: "ไม่สามารถดึงข้อมูล course เรียนได้ กรุณาลองใหม่อีกครั้ง",
          icon: "warning",
          confirmButtonColor: "#FF0000",
          confirmButtonText: "ตกลง",
        });
        this.$store.state.show = false;
      }
    },

    getClassroom() {
      try {
        this.$store.state.show = true;
        var date = moment().isoWeekday();
        // console.log(date);
        db.collection("classroom")
          // .where("day.dayNum", "==", date)
          // .where("amount", ">=", 1)
          .onSnapshot((querySnapshot) => {
            this.classrooms = [];
            querySnapshot.forEach((doc) => {
              // if(!doc.data().role.isAdmin)
              // {
              // console.log(doc.data());
              let classroom = {
                nowDate: moment().format("ll"),
                classId: doc.id,

                amount: doc.data().amount,
                classType: doc.data().classType,
                courseName: doc.data().courseName,
                createdAt: doc.data().createdAt,
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
                studentAtClass: doc.data().student,
                teacherAtclass: doc.data().teacherAtclass,
                wages: doc.data().wages,
              };
              this.classrooms.push(classroom);
              console.log(this.classrooms);
            });
            this.$store.state.show = false;
          });
      } catch (err) {
        console.log(err);
        this.$store.state.show = false;
      }
    },
  },

  computed: {
    groupData() {
      const groupByCategory = this.profiles.reduce((group, product) => {
        const { invoiceNo } = product;
        console.log({ invoiceNo });
        group[invoiceNo] = group[invoiceNo] ?? [];
        group[invoiceNo].push(product);
        // console.log(group[invoiceNo]);
        // console.log(JSON.stringify(groupByCategory, null, 2));
        // console.log(group);
        return group;
      }, {});
      return groupByCategory;
    },
  },

  mounted() {
    this.getCourseTemplate();
    this.getClassroom();
    window.scrollTo(0, 0);
    // this.getData();
  },
};
</script>

<style scoped></style>
