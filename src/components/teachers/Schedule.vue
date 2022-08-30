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

        <div class="row">
          <div class="col-12">
            <button
              @click="getClassroomThisDay()"
              class="btn btn-success d-inline-block float-right px-3"
              data-toggle="modal"
              data-target="#classroomFormModal"
            >
              แบบบันทึกการสอน
            </button>
          </div>
        </div>
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
          <template slot="table-row" slot-scope="props">
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

    <!--  classroomDetailModal -->
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
                      class="row mb-3"
                      v-for="(item, index) in classroom.studentAtClass"
                      :key="index.userId"
                      style="background: #e9ecef"
                    >
                      <div class="col-md-6">
                        <img
                          :src="item.image"
                          class="rounded-circle mx-auto d-block mt-4"
                          width="160"
                          height="160"
                          style="border: 5px solid white"
                        />
                      </div>
                      <div class="col-md-6">
                        <div class="card-body">
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
                            <span class="text-success">{{
                              item.nickName
                            }}</span>
                          </p>
                          <p class="card-text">
                            รหัสนักเรียน
                            <span class="text-success">{{
                              item.studentId
                            }}</span>
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
                              v-model="obj.commentClass"
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
                          </div>

                          <div class="col-sm-5">
                            <div class="promotion-image-container text-center">
                              <img
                                :src="obj.attendancePic"
                                class="img-thumbnail"
                                width="300"
                                height="220"
                              />
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

    <!--  StudentInClassModal -->
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
                        <span class="text-success">{{ item.remain }}</span>
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
                        <span class="text-success">{{ item.stdMobile }}</span>
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

    <!-- classroomFormModal -->
    <div class="modal fade" id="classroomFormModal">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <!-- Modal Header -->
          <div class="modal-header">
            <h4 class="modal-title text-success w-100 text-center">
              บันทึกการเข้าสอน
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
                v-for="(obj, index) in classToday"
                :key="index"
              >
                <div class="card-body">
                  <h6 class="text-center text-success">
                    วิชา {{ obj.courseName }} {{ obj.classType }}({{
                      obj.level
                    }}) - วันที่ {{ obj.learningTime }}
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
                        v-model="commentClass"
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
                    </div>

                    <div class="col-sm-5">
                      <div class="promotion-image-container text-center">
                        <div id="preview ">
                          <!-- v-if="profile.image" -->
                          <img
                            v-if="license.attendancePic"
                            :src="license.attendancePic"
                            class="img-thumbnail"
                            width="200"
                            height="25%"
                            style="border: 5px solid white"
                          />
                        </div>
                        <div class="text-center">
                          <input
                            type="file"
                            class="mt-3 form-control-file bg-white p-1"
                            @change="onFileChange"
                          />
                          <button
                            v-if="submitBtn == true"
                            class="btn btn-success mt-3"
                            @click="sendData(obj)"
                          >
                            ส่งข้อมูลการสอน
                          </button>
                          <button
                            v-else
                            class="btn btn-warning mt-3"
                            @click="uploadImage()"
                          >
                            อัพโหลดรูปภาพ
                          </button>
                        </div>
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
          label: "ข้อมูล",
          field: "attendance",
          type: "text",
        },
        {
          label: "delete",
          field: "delete",
          type: "text",
        },
      ],
      profiles: [],
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

      userId: null,

      modal: null,
      classrooms: [],
      disabled: 0,
      canEdit: false,
      commentThisTime: "",
      classToday: [],
      classHistory: [],
      stdInClass: [],
      setDaySelect: "",
      // https://via.placeholder.com/300x200

      imageName: null,
      submitBtn: false,
      license: {
        attendancePic:
          "https://media.istockphoto.com/vectors/attendance-concept-vector-flat-design-vector-id1198430065?k=20&m=1198430065&s=170667a&w=0&h=Ah8_cY025T_GPNeASpti9X95K7eAWBzq2IwWCA0oQtI=",
      },
      commentClass: "",
    };
  },

  methods: {
    async sendData(classToday) {
      console.log(classToday.docId);
      // console.log(this.license.attendancePic);
      // console.log(this.commentClass);
      try {
        this.$store.state.show = true;
        await db.collection("AttendanceHistory").doc(classToday.docId).update({
          commentClass: this.commentClass,
          attendancePic: this.license.attendancePic,
        });
        Swal.fire({
          title: "SUCCESS",
          text: "ส่งข้อมูลเรียบร้อย",
          icon: "success",
          confirmButtonColor: "#30855c",
          confirmButtonText: "ตกลง",
        });
        this.$store.state.show = false;
      } catch (err) {
        console.log(err);
        Swal.fire({
          title: "เกิดข้อผิดพลาด",
          text: "ไม่สามารถส่งข้อมูลได้ กรุณาลองใหม่อีกครั้ง",
          icon: "warning",
          confirmButtonColor: "#FF0000",
          confirmButtonText: "ตกลง",
        });
        this.$store.state.show = false;
      }
    },
    onFileChange(e) {
      const file = e.target.files[0];
      this.imageName = e.target.files[0];
      this.license.attendancePic = URL.createObjectURL(file);
    },
    uploadImage() {
      if (this.imageName != null) {
        this.$store.state.show = true;
        let file = this.imageName;
        var storageRef = fb
          .storage()
          .ref("attentedImg/" + Math.random() + "_" + file.name);

        let uploadTask = storageRef.put(file);

        uploadTask.on(
          "state_changed",
          (snapshot) => {},
          (error) => {
            // Handle unsuccessful uploads
            Swal.fire({
              title: "เกิดข้อผิดพลาด",
              text: "ไม่สามารถอัพโหลดรูปภาพได้ กรุณาลองใหม่อีกครั้ง",
              icon: "warning",
              confirmButtonColor: "#FF0000",
              confirmButtonText: "ตกลง",
            });
            this.$store.state.show = false;
          },
          () => {
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
              this.license.attendancePic = downloadURL;
              Swal.fire({
                title: "SUCCESS",
                text: "อัพโหลดรูปภาพเรียบร้อย",
                icon: "success",
                confirmButtonColor: "#30855c",
                confirmButtonText: "ตกลง",
              });
              this.$store.state.show = false;
              this.submitBtn = true;
              console.log(this.license.attendancePic);
            });
          }
        );
      } else {
        Swal.fire({
          title: "เกิดข้อผิดพลาด",
          text: "ไม่สามารถอัพโหลดรูปภาพได้ กรุณาลองใหม่อีกครั้ง",
          icon: "warning",
          confirmButtonColor: "#FF0000",
          confirmButtonText: "ตกลง",
        });
      }
    },

    setDay() {
      console.log(this.setDaySelect);
      try {
        this.$store.state.show = true;
        let day = parseInt(this.setDaySelect);
        let refDay;
        if (day == 0) {
          refDay = db
            .collection("classroom")
            .orderBy("dayAttend.dayNum", "desc");
        } else {
          refDay = db
            .collection("classroom")
            .where("dayAttend.dayNum", "==", day)
            .where("amount", ">=", 1);
        }
        // var date = moment().isoWeekday();
        // console.log(date);

        refDay.onSnapshot((querySnapshot) => {
          this.classrooms = [];
          querySnapshot.forEach((doc) => {
            if (doc.data().teacherAtclass.teacherId == this.userId) {
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
            }
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
              stdMobile: doc.data().stdMobile,
              nickName: doc.data().nickName,
              startDate: moment(doc.data().startDate)
                .add(543, "year")
                .format("LL"),
              startTime: doc.data().startTime,
              remain : doc.data().remain,
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

    getClassroomThisDay() {
      // console.log(this.userId);
      let thisDay = moment().format("ll");
      console.log(thisDay);
      // alert(profile.firstName);
      // console.log(detail.classId);
      // this.classroom = detail;
      // this.disabled = 1;

      db.collection("AttendanceHistory")
        .where("nowDate", "==", thisDay)
        .where("teacherAtclass.teacherId", "==", this.userId)
        .onSnapshot((querySnapshot) => {
          this.classToday = [];
          querySnapshot.forEach((doc) => {
            let classHis = {
              docId: doc.id,
              studentAtClass: doc.data().studentAtClass,
              learningTime: moment(doc.data().learningTime)
                .add(543, "year")
                .format("DD/MM/YYYY"),
              commentThisTime: doc.data().commentThisTime,
              teacherAtclass: doc.data().teacherAtclass,
              studentYes: doc.data().studentYes,
              courseName: doc.data().courseName,
              classType: doc.data().classType,
              level: doc.data().level,
              commentClass: doc.data().commentClass,
              attendancePic: doc.data().attendancePic,
            };
            this.classToday.push(classHis);
            // this.classHistory.reverse();
          });
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
              teacherAtclass: doc.data().teacherAtclass,
              studentYes: doc.data().studentYes,
              commentClass: doc.data().commentClass,
              attendancePic: doc.data().attendancePic,
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
              if (doc.data().teacherAtclass.teacherId == this.userId) {
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
              }
            });
            this.$store.state.show = false;
          });
      } catch (err) {
        console.log(err);
        this.$store.state.show = false;
      }
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
  },
  mounted() {
    this.getClassroom();
    this.getCourseTemplate();
    window.scrollTo(0, 0);
    // this.getData();
  },

  created() {
    fb.auth().onAuthStateChanged((user) => {
      if (user) {
        this.userId = user.uid;
      } else {
      }
    });
  },
};
</script>

<style scoped></style>
