<template>
  <div id="studentData" class="shadow">
    <div class="container-fluid jumbotron">
      <div class="">
        <h4 class="text-center text-success mb-4">ข้อมูลนักเรียน</h4>
      </div>
      <div class="row">
        <div class="col-12">
          <router-link
            to="/admin/editinvoice"
            class="btn btn-success float-right px-2"
          >
            <i class="fa-sharp fa-solid fa-file-invoice-dollar"></i>
            ใบเสร็จทั้งหมด
          </router-link>
        </div>
      </div>
      <div class="mt-3 shadow">
        <vue-good-table
          :columns="columns"
          :rows="profiles"
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
          <!-- props.row คือ doc.data() -->
          <template slot="table-row" slot-scope="props">
            <span v-if="props.column.field == 'status'">
              <select
                @change="changeStatus(props.row.userId, $event)"
                class="custom-select"
              >
                <option :selected="props.row.role.isStudent" value="isStudent">
                  Active
                </option>
                <option
                  :selected="props.row.role.isInactive"
                  value="isInactive"
                >
                  Inactive
                </option>
                <option :selected="props.row.role.isDrop" value="isDrop">
                  Drop
                </option>
              </select>
            </span>
            <span v-else-if="props.column.field == 'fullProfile'">
              <div
                class="btn btn-secondary"
                data-toggle="modal"
                data-target="#profileModal"
                @click="fullProfile(props.row)"
              >
                <i class="fa-solid fa-user"></i>
              </div>
            </span>
            <span v-else-if="props.column.field == 'addcourse'">
              <div
                class="btn btn-success"
                data-toggle="modal"
                data-target="#addCourseModal"
                @click="addcourse(props.row)"
              >
                <i class="fa-solid fa-file-circle-plus"></i>
              </div>
            </span>
            <span v-else-if="props.column.field == 'Reneval'">
              <div
                class="btn btn-info"
                data-toggle="modal"
                data-target="#addCourseModal"
                @click="getReneval(props.row)"
              >
                <i class="fa-solid fa-user-plus"></i>
              </div>
            </span>
            <span v-else-if="props.column.field == 'otherData'">
              <div
                class="btn btn-dark dropdown-toggle"
                id="dropdownOtherData"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i class="fas fa-table"></i>
              </div>
              <div class="dropdown-menu" aria-labelledby="dropdownOtherData">
                <div
                  class="dropdown-item btn"
                  @click="studentCourse(props.row.userId)"
                >
                  คอร์สที่ลงเรียน
                </div>

                <div
                  class="dropdown-item btn"
                  @click="studentInvoice(props.row.userId)"
                >
                  ประวัติการชำระ
                </div>
              </div>
            </span>
            <span v-else-if="props.column.field == 'edit'">
              <div
                class="btn btn-warning dropdown-toggle"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i class="fas fa-edit"></i>
              </div>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <router-link
                  to="/admin/editinvoice"
                  class="dropdown-item"
                  href="#"
                  >ข้อมูลวิชาเรียนและใบเสร็จ</router-link
                >

                <div
                  class="dropdown-item btn"
                  @click="editprofile(props.row)"
                  data-toggle="modal"
                  data-target="#profileModal"
                >
                  ข้อมูลส่วนตัว
                </div>
              </div>
            </span>
            <span v-else-if="props.column.field == 'delete'">
              <div
                class="btn btn-danger"
                @click="deleteStudent(props.row.userId)"
              >
                <i class="fas fa-trash-alt"></i>
              </div>
            </span>
            <span v-else>
              {{ props.formattedRow[props.column.field] }}
            </span>
          </template>
        </vue-good-table>
      </div>
    </div>

    <!--Start profileModal -->
    <div class="modal fade" id="profileModal">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <!-- Modal Header -->
          <div class="modal-header">
            <h4
              v-if="profileModal == 'edit'"
              class="modal-title w-100 text-center text-warning"
            >
              แก้ไข ข้อมูลและประวัตินักเรียน
            </h4>
            <h4 v-else class="modal-title w-100 text-center text-success">
              ข้อมูลและประวัตินักเรียน
            </h4>
            <button type="button" class="close" data-dismiss="modal">
              &times;
            </button>
          </div>

          <!-- Modal body -->
          <div class="modal-body">
            <div class="row">
              <div class="col-lg-12">
                <div id="preview">
                  <img
                    v-if="profile.image"
                    :src="profile.image"
                    class="rounded-circle mx-auto d-block"
                    width="220"
                    height="220"
                    style="border: 5px solid white"
                  />
                </div>
              </div>
            </div>

            <h6 class="text-success text-right my-3">
              วัน-เวลา ที่สมัคร {{ profile.addProfileAt }}
            </h6>
            <div class="row">
              <div class="col-lg-6">
                <div class="form-group">
                  <label for="namePrefix" class="text-success">คำนำหน้า</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="กรอกชื่อเล่น"
                    id="namePrefix"
                    :value="profile.namePrefix"
                    :disabled="disabled == 1"
                  />
                </div>
              </div>

              <div class="col-lg-6">
                <div class="form-group">
                  <label for="nickName" class="text-success">ชื่อเล่น</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="กรอกชื่อเล่น"
                    id="nickName"
                    :value="profile.nickName"
                    :disabled="disabled == 1"
                  />
                  <!-- <span> : {{ profile.nickName }}</span> -->
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-lg-6">
                <div class="form-group">
                  <label for="firstName" class="text-success">ชื่อจริง</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="กรอกชื่อจริง"
                    id="firstName"
                    v-model.trim="profile.firstName"
                    :disabled="disabled == 1"
                  />
                </div>
              </div>
              <div class="col-lg-6">
                <div class="form-group">
                  <label for="lastName" class="text-success">นามสกุล</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="กรอกนามสกุล"
                    id="lastName"
                    v-model.trim="profile.lastName"
                    :disabled="disabled == 1"
                  />
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-lg-6">
                <div class="form-group">
                  <label for="birthday" class="text-success"
                    >วัน/เดือน/ปี เกิด</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    placeholder="กรอกนามสกุล"
                    id="lastName"
                    v-model.trim="profile.birthday"
                    :disabled="disabled == 1"
                  />
                </div>
              </div>
              <div class="col-lg-6">
                <div class="form-group">
                  <label for="email" class="text-success">อีเมล์ </label>
                  <input
                    type="email"
                    class="form-control"
                    placeholder="กรอกอีเมล์มี @"
                    id="อีเมล์"
                    v-model.trim="profile.email"
                    :disabled="disabled == 1"
                  />
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-lg-6">
                <div class="form-group">
                  <label for="telephone" class="text-success"
                    >โทรศัพท์บ้าน</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    placeholder="ไม่มีให้ใส่ - "
                    id="telephone"
                    v-model.trim="profile.telephone"
                    :disabled="disabled == 1"
                  />
                </div>
              </div>
              <div class="col-lg-6">
                <div class="form-group">
                  <label for="mobilephone" class="text-success"
                    >โทรศัพท์มือถือ</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    placeholder="กรอกนามสกุล"
                    id="mobilephone"
                    v-model.trim="profile.mobilephone"
                    :disabled="disabled == 1"
                  />
                </div>
              </div>
            </div>

            <hr />
            <h5 class="text-left text-success my-3 font-weight-bold">
              ข้อมูลผู้ปกครอง
            </h5>
            <div class="col-md-12 text-center mb-3">
              <h6 class="text-success">(ผู้ปกครองคนที่ 1)</h6>
            </div>
            <div class="row">
              <div class="col-lg-6">
                <div class="form-group">
                  <label for="firstName" class="text-success">ชื่อจริง</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="กรอกชื่อจริง"
                    id="firstName"
                    v-model.trim="profile.parentFirstName"
                    :disabled="disabled == 1"
                  />
                  <!-- <span> : {{ profile.firstName }}</span> -->
                </div>
              </div>
              <div class="col-lg-6">
                <div class="form-group">
                  <label for="lastName" class="text-success">นามสกุล</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="กรอกนามสกุล"
                    id="lastName"
                    v-model.trim="profile.parentLastName"
                    :disabled="disabled == 1"
                  />
                  <!-- <span> : {{ profile.lastName }}</span> -->
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-lg-6">
                <div class="form-group">
                  <label for="mobilephone" class="text-success"
                    >โทรศัพท์มือถือ</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    placeholder="กรอกนามสกุล"
                    id="mobilephone"
                    v-model.trim="profile.parentMobilephone"
                    maxlength="10"
                    :disabled="disabled == 1"
                  />
                </div>
              </div>
              <div class="col-lg-6">
                <div class="form-group">
                  <label for="email" class="text-success">อีเมล์ </label>
                  <input
                    type="email"
                    class="form-control"
                    placeholder="กรอกอีเมล์มี @"
                    id="อีเมล์"
                    v-model.trim="profile.parentEmail"
                    :disabled="disabled == 1"
                  />
                  <!-- <span> : {{ profile.email }}</span> -->
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-lg-6">
                <div class="form-group">
                  <label for="telephone" class="text-success"
                    >เกี่ยวข้องเป็น</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    placeholder="เกี่ยวข้องเป็น"
                    id="telephone"
                    v-model.trim="profile.parentAbout"
                    :disabled="disabled == 1"
                  />
                </div>
              </div>
              <div class="col-lg-6">
                <!-- <div class="form-group">
            <label for="mobilephone" class="text-success">โทรศัพท์มือถือ</label>
            <input
              type="text"
              class="form-control"
              placeholder="กรอกนามสกุล"
              id="mobilephone"
              v-model.trim="profile.mobilephone"
            />
          </div> -->
              </div>
            </div>

            <div class="col-md-12 text-center mb-3">
        <h6 class="text-success">(ผู้ปกครองคนที่ 2)</h6>
      </div>
      <div class="row">
        <div class="col-lg-6">
          <div class="form-group">
            <label for="firstName" class="text-success">ชื่อจริง</label>
            <input
              type="text"
              class="form-control"
              placeholder="กรอกชื่อจริง"
              id="firstName"
              v-model.trim="profile.parentFirstName2"
              :disabled="disabled == 1"
            />
            <!-- <span> : {{ profile.firstName }}</span> -->
          </div>
        </div>
        <div class="col-lg-6">
          <div class="form-group">
            <label for="lastName" class="text-success">นามสกุล</label>
            <input
              type="text"
              class="form-control"
              placeholder="กรอกนามสกุล"
              id="lastName"
              v-model.trim="profile.parentLastName2"
              :disabled="disabled == 1"
            />
            <!-- <span> : {{ profile.lastName }}</span> -->
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-6">
          <div class="form-group">
            <label for="mobilephone" class="text-success">โทรศัพท์มือถือ</label>
            <input
              type="text"
              class="form-control"
              placeholder="กรอกนามสกุล"
              id="mobilephone"
              v-model.trim="profile.parentMobilephone2"
              maxlength="10"
              :disabled="disabled == 1"
            />
          </div>
        </div>
        <div class="col-lg-6">
          <div class="form-group">
            <label for="email" class="text-success">อีเมล์ </label>
            <input
              type="email"
              class="form-control"
              placeholder="กรอกอีเมล์มี @"
              id="อีเมล์"
              v-model.trim="profile.parentEmail2"
              :disabled="disabled == 1"
            />
            <!-- <span> : {{ profile.email }}</span> -->
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-6">
          <div class="form-group">
            <label for="telephone" class="text-success">เกี่ยวข้องเป็น</label>
            <input
              type="text"
              class="form-control"
              placeholder="เกี่ยวข้องเป็น"
              id="telephone"
              v-model.trim="profile.parentAbout2"
              :disabled="disabled == 1"
            />
          </div>
        </div>
        <div class="col-lg-6">
          <!-- <div class="form-group">
            <label for="mobilephone" class="text-success">โทรศัพท์มือถือ</label>
            <input
              type="text"
              class="form-control"
              placeholder="กรอกนามสกุล"
              id="mobilephone"
              v-model.trim="profile.mobilephone"
            />
          </div> -->
        </div>
      </div>

            <hr />
            <h5 class="text-left text-success my-3 font-weight-bold">
              รายละเอียดที่อยู่
            </h5>
            <div class="row mt-3">
              <div class="col-lg-6">
                <div class="form-group">
                  <label for="addressNumber" class="text-success"
                    >บ้านเลขที่
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="กรอกบ้านเลขที่ ตัวอย่าง 99/99 หมู่ 9"
                    id="อีเมล์"
                    v-model.trim="profile.address.addressNumber"
                    :disabled="disabled == 1"
                  />
                </div>
              </div>
              <div class="col-lg-6">
                <div class="form-group">
                  <label for="location" class="text-success"
                    >หมู่บ้าน/ร้าน/บริษัท/อาคาร
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="ไม่มีใส่ - "
                    id="location"
                    v-model.trim="profile.address.location"
                    :disabled="disabled == 1"
                  />
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-lg-6">
                <div class="form-group">
                  <label for="email" class="text-success">ตรอก/ซอย </label>
                  <input
                    type="email"
                    class="form-control"
                    placeholder="ไม่มีใส่ - "
                    id="อีเมล์"
                    v-model.trim="profile.address.soi"
                    :disabled="disabled == 1"
                  />
                </div>
              </div>
              <div class="col-lg-6">
                <div class="form-group">
                  <label for="email" class="text-success">ถนน </label>
                  <input
                    type="email"
                    class="form-control"
                    placeholder="กรอกชื่อ ถนน"
                    id="อีเมล์"
                    v-model.trim="profile.address.road"
                    :disabled="disabled == 1"
                  />
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-lg-6">
                <div class="form-group">
                  <label for="email" class="text-success">แขวง/ตำบล</label>
                  <input
                    type="email"
                    class="form-control"
                    placeholder="ไม่มีใส่ - "
                    id="อีเมล์"
                    v-model.trim="profile.address.district"
                    :disabled="disabled == 1"
                  />
                </div>
              </div>
              <div class="col-lg-6">
                <div class="form-group">
                  <label for="email" class="text-success">เขต/อำเภอ </label>
                  <input
                    type="email"
                    class="form-control"
                    placeholder="กรอกชื่อ ถนน"
                    id="อีเมล์"
                    v-model.trim="profile.address.amphoe"
                    :disabled="disabled == 1"
                  />
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-lg-6">
                <div class="form-group">
                  <label for="email" class="text-success">จังหวัด</label>
                  <input
                    type="email"
                    class="form-control"
                    placeholder="ไม่มีใส่ - "
                    id="อีเมล์"
                    v-model.trim="profile.address.province"
                    :disabled="disabled == 1"
                  />
                </div>
              </div>
              <div class="col-lg-6">
                <div class="form-group">
                  <label for="email" class="text-success">รหัสไปรษณีย์ </label>
                  <input
                    type="email"
                    class="form-control"
                    placeholder="กรอกชื่อ ถนน"
                    id="อีเมล์"
                    v-model.trim="profile.address.zipcode"
                    :disabled="disabled == 1"
                  />
                </div>
              </div>
            </div>
            <hr />
            <h5 class="text-left text-success my-3 font-weight-bold">
              ประวัติการศึกษา
            </h5>
            <div class="row">
              <div class="col-lg-6">
                <div class="form-group">
                  <label for="level" class="text-success"> ระดับการศึกษา</label>
                  <input
                    type="email"
                    class="form-control"
                    placeholder="กรอกชื่อมหาวิทยาลัย"
                    id="email"
                    v-model.trim="profile.graduated.degree"
                    :disabled="disabled == 1"
                  />
                </div>
              </div>
              <div class="col-lg-6">
                <div class="form-group">
                  <label for="email" class="text-success"
                    >โรงเรียน / มหาวิทยาลัย</label
                  >
                  <input
                    type="email"
                    class="form-control"
                    placeholder="กรอกชื่อมหาวิทยาลัย"
                    id="email"
                    v-model.trim="profile.graduated.university"
                    :disabled="disabled == 1"
                  />
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-lg-6">
                <div class="form-group">
                  <label for="email" class="text-success"
                    >ระดับชั้น / คณะ</label
                  >
                  <input
                    type="email"
                    class="form-control"
                    placeholder="กรอกคณะที่จบ"
                    id="email"
                    v-model.trim="profile.graduated.faculty"
                    :disabled="disabled == 1"
                  />
                </div>
              </div>
              <div class="col-lg-6">
                <div class="form-group">
                  <label for="email" class="text-success">เอก/สาขาวิชา</label>
                  <input
                    type="email"
                    class="form-control"
                    placeholder="กรอกเอก/สาขาวิชา"
                    id="email"
                    v-model.trim="profile.graduated.major"
                    :disabled="disabled == 1"
                  />
                </div>
              </div>
            </div>

            <hr />

            <h5 class="text-left text-success my-3 font-weight-bold">
              ประวัติการเรียน
            </h5>
            <div class="form-group">
              <textarea
                class="form-control"
                rows="5"
                id="comment"
                v-model="profile.studyHis"
                :disabled="disabled == 1"
              ></textarea>
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

            <button
              @click="updateProfile(profile.userId)"
              type="button"
              class="btn btn-warning text-dark"
              v-if="profileModal == 'edit'"
            >
              แก้ไข
            </button>
          </div>
        </div>
      </div>
    </div>
    <!--End Modal เพิ่มเติม -->

    <!--Start Modal AddCourse -->
    <div class="modal fade" id="addCourseModal">
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <!-- Modal Header -->
          <div class="modal-header text-center">
            <h4 class="modal-title w-100 text-center text-success">
              เพิ่มคอร์สเรียน
            </h4>
            <button type="button" class="close" data-dismiss="modal">
              &times;
            </button>
          </div>

          <!-- Modal body -->
          <div class="modal-body">
            <div class="accordion" role="tablist" style="padding: 0">
              <b-card no-body class="mb-1">
                <b-card-header header-tag="header" class="p-1" role="tab">
                  <b-button block v-b-toggle.accordion-1 variant="success"
                    >วิชาเรียน</b-button
                  >
                </b-card-header>
                <b-collapse
                  id="accordion-1"
                  visible
                  accordion="my-accordion"
                  role="tabpanel"
                >
                  <b-card-body>
                    <div class="row mb-2">
                      <div class="col-md-12">
                        <a
                          href="/admin/attendance"
                          target="_blank"
                          class="btn btn-info float-right"
                          >สร้างห้องเรียน</a
                        >
                      </div>
                    </div>
                    <vue-good-table
                      :columns="classRoomColumns"
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
                        <span v-if="props.column.field == 'classQty'">
                          <input
                            type="number"
                            class="form-control"
                            placeholder="กรอกเป็นตัวเลข"
                            min="0"
                            v-model.trim="props.row.classQty"
                          />
                        </span>
                        <span v-else-if="props.column.field == 'classTime'">
                          <h6>
                            {{ props.row.startTime }} -
                            {{ props.row.finishTime }}
                          </h6>
                        </span>

                        <span v-else-if="props.column.field == 'classDiscount'">
                          <div class="form-group">
                            <input
                              type="number"
                              class="form-control"
                              placeholder="กรอกเป็นตัวเลข"
                              min="0"
                              v-model.trim="props.row.classDiscount"
                            />
                          </div>
                        </span>
                        <span v-else-if="props.column.field == 'classTotal'">
                          <h6>
                            {{
                              props.row.classQty * props.row.rate -
                              props.row.classDiscount
                            }}
                          </h6>
                        </span>
                        <span v-else-if="props.column.field == 'cart'">
                          <div class="form-group">
                            <div
                              class="btn btn-info"
                              @click="buyCourse(props.row)"
                            >
                              <i class="fas fa-cart-arrow-down"></i>
                            </div>
                          </div>
                        </span>
                        <span v-else>
                          {{ props.formattedRow[props.column.field] }}
                        </span>
                      </template>
                    </vue-good-table>
                  </b-card-body>
                </b-collapse>
              </b-card>

              <b-card no-body class="mb-1">
                <b-card-header header-tag="header" class="p-1" role="tab">
                  <b-button block v-b-toggle.accordion-2 variant="success"
                    >หนังสือ - อุปกรณ์</b-button
                  >
                </b-card-header>
                <b-collapse
                  id="accordion-2"
                  accordion="my-accordion"
                  role="tabpanel"
                >
                  <b-card-body>
                    <vue-good-table
                      :columns="pColumns"
                      :rows="products"
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
                        <span v-if="props.column.field == 'quantity'">
                          <h6>
                            {{ props.row.quantity - props.row.buyAmount }}
                          </h6>
                        </span>
                        <span
                          v-else-if="
                            props.column.field == 'price' &&
                            props.row.pMode == 'อื่นๆ'
                          "
                        >
                          <div class="form-group">
                            <input
                              type="number"
                              class="form-control"
                              placeholder="กรอกเป็นตัวเลข"
                              min="0"
                              v-model.trim="props.row.price"
                            />
                          </div>
                        </span>
                        <span v-else-if="props.column.field == 'buy'">
                          <div class="form-group">
                            <input
                              type="number"
                              class="form-control"
                              placeholder="กรอกเป็นตัวเลข"
                              min="0"
                              v-model.trim="props.row.buyAmount"
                            />
                          </div>
                        </span>
                        <span v-else-if="props.column.field == 'pDiscount'">
                          <div class="form-group">
                            <input
                              type="number"
                              class="form-control"
                              placeholder="กรอกเป็นตัวเลข"
                              min="0"
                              v-model.trim="props.row.pDiscount"
                            />
                          </div>
                        </span>
                        <span v-else-if="props.column.field == 'total'">
                          <h6>
                            {{
                              props.row.buyAmount * props.row.price -
                              props.row.pDiscount
                            }}
                          </h6>
                        </span>
                        <span v-else-if="props.column.field == 'cart'">
                          <div class="form-group">
                            <div
                              class="btn btn-info"
                              @click="addToCart(props.row)"
                            >
                              <i class="fas fa-cart-arrow-down"></i>
                            </div>
                          </div>
                        </span>
                        <span v-else>
                          {{ props.formattedRow[props.column.field] }}
                        </span>
                      </template>
                    </vue-good-table>
                  </b-card-body>
                </b-collapse>
              </b-card>

              <b-card no-body class="mb-1">
                <b-card-header header-tag="header" class="p-1" role="tab">
                  <b-button block v-b-toggle.accordion-3 variant="success"
                    >Invoice</b-button
                  >
                </b-card-header>
                <b-collapse
                  id="accordion-3"
                  accordion="my-accordion"
                  role="tabpanel"
                >
                  <b-card-body>
                    <div class="py-3" style="border: 1px solid green">
                      <h5 class="text-center text-success mt-3">วิชาเรียน</h5>
                      <h6 class="ml-3 mt-3 text-success">
                        เพื่อชำระค่าเรียน (Payment for tuition)
                      </h6>
                      <div class="form-check-inline ml-3">
                        <label class="form-check-label" for="">
                          <input
                            type="radio"
                            class="form-check-input"
                            id=""
                            name=""
                            value="ลงทะเบียนใหม่"
                            checked
                            v-model.trim="paymentType"
                          />ลงทะเบียนใหม่
                        </label>
                      </div>
                      <div class="form-check-inline">
                        <label class="form-check-label" for="radio2">
                          <input
                            type="radio"
                            class="form-check-input"
                            id=""
                            name=""
                            value="ต่อคอร์ส"
                            v-model.trim="paymentType"
                          />ต่อคอร์สเรียน
                        </label>
                      </div>
                      <div class="table-responsive">
                        <table
                          class="table table-bordered table-striped text-center"
                        >
                          <thead class="thead-light">
                            <tr>
                              <th>วิชา</th>
                              <th>จำนวน</th>
                              <th>ค่าเรียน/คอร์ส</th>
                              <th>ส่วนลด</th>
                              <th>รวม</th>
                              <th>ลบ</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr
                              v-for="(course, index) in courseReserv"
                              :key="index"
                              class="text-center"
                            >
                              <td>{{ course.courseName }}</td>
                              <td>{{ course.classQty }}</td>
                              <td>{{ course.rate }}</td>
                              <td>{{ course.classDiscount }}</td>
                              <td>
                                {{
                                  course.classQty * course.rate -
                                  course.classDiscount
                                }}
                              </td>
                              <td>
                                <button
                                  type="button"
                                  @click="deleteCourse(index)"
                                  class="btn btn-danger btn-sm"
                                >
                                  <i class="fas fa-times text-light"></i>
                                </button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div class="py-3 my-2" style="border: 1px solid green">
                      <h5 class="text-center text-success mt-3">
                        หนังสือ - อุปกรณ์
                      </h5>
                      <h6 class="ml-3 mt-3 text-success">
                        เพื่อชำระ (Payment for)
                      </h6>
                      <div class="row mx-auto">
                        <div class="col-md-3">
                          <div class="form-check-inline">
                            <label class="form-check-label">
                              <input
                                type="checkbox"
                                class="form-check-input"
                                value="หนังสือเรียน"
                                v-model.trim="selected"
                              />หนังสือเรียน
                            </label>
                          </div>
                        </div>
                        <div class="col-md-3">
                          <div class="form-check-inline">
                            <label class="form-check-label">
                              <input
                                type="checkbox"
                                class="form-check-input"
                                value="อุปกรณ์การเรียน"
                                v-model.trim="selected"
                              />อุปกรณ์การเรียน
                            </label>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="input-group mb-3">
                            <div class="input-group-prepend">
                              <div class="input-group-text">
                                <input
                                  type="checkbox"
                                  value="อื่นๆ"
                                  v-model.trim="selected"
                                />
                              </div>
                            </div>
                            <input
                              type="text"
                              class="form-control"
                              placeholder="กรอกรายการชำระ"
                              v-model.trim="payforDetail"
                            />
                          </div>
                        </div>
                      </div>

                      <div class="table-responsive">
                        <table
                          class="table table-bordered table-striped text-center"
                        >
                          <thead class="thead-light">
                            <tr>
                              <th>สินค้า</th>
                              <th>จำนวน</th>
                              <th>ราคา/หน่วย</th>
                              <th>ส่วนลด</th>
                              <th>รวม</th>
                              <th>ลบ</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="(item, index) in carts" :key="index">
                              <td>{{ item.pName }}</td>
                              <td>{{ item.buyAmount }}</td>
                              <td>{{ item.price }}</td>
                              <td>{{ item.pDiscount }}</td>
                              <td>
                                {{
                                  item.buyAmount * item.price - item.pDiscount
                                }}
                              </td>
                              <td>
                                <button
                                  type="button"
                                  @click="deleteProduct(index)"
                                  class="btn btn-danger btn-sm"
                                >
                                  <i class="fas fa-times text-light"></i>
                                </button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div class="py-3" style="border: 1px solid green">
                      <h5 class="text-center text-success mt-3">สรุปยอด</h5>
                      <div class="row mx-auto">
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="usr" class="text-success"
                              >ค่าแรกเข้า (Enrollment fee)
                            </label>
                            <input
                              type="number"
                              class="form-control"
                              id="usr"
                              min="0"
                              v-model.trim="fee"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="table-responsive">
                        <table
                          class="table table-bordered table-striped text-center"
                        >
                          <thead class="thead-light">
                            <tr>
                              <th>(1)รวมค่าเรียน</th>
                              <th>(2)ค่าหนังสือหรืออุปกรณ์</th>
                              <th>ค่าแรกเข้า</th>
                              <th>รวมจำนวนเงินทั้งสิ้น</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>{{ subTotal }}</td>
                              <td>{{ pSubtotal }}</td>
                              <td>{{ fee }}</td>
                              <td>{{ grandTotal }}</td>
                            </tr>
                          </tbody>
                        </table>

                        <div class="col-md-6 mt-3">
                          <div class="form-group">
                            <label for="usr" class="text-success"
                              >หมายเหตุ
                            </label>
                            <input
                              type="text"
                              class="form-control"
                              placeholder="กรอกรายการโปรโมชั่น"
                              v-model.trim="note"
                            />
                          </div>
                        </div>
                      </div>

                      <div class="row text-center">
                        <div class="col-md-12">
                          <button
                            class="btn btn-primary no-print"
                            @click="submitInvoice()"
                          >
                            <i class="fas fa-check-circle"></i> ยืนยัน
                          </button>
                          <button
                            class="btn btn-danger no-print ml-3"
                            @click="reset"
                          >
                            <i class="fas fa-redo"></i> Reset/ยกเลิก
                          </button>
                          <button
                            v-if="confirm"
                            class="btn btn-warning no-print ml-3"
                            @click="print"
                          >
                            <i class="fas fa-print"></i> Print
                          </button>
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
            <button class="btn btn-danger no-print ml-3" @click="reset">
              <i class="fas fa-redo"></i> Reset
            </button>
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
    <!--End Modal AddCourse -->
  </div>
</template>

<script>
import { db, functions, fb } from "../../firebase.js";
import firebase from "firebase/app";
import moment from "moment";
export default {
  name: "studentData",

  data() {
    return {
      classRoomColumns: [
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
          label: "ราคา/คอร์ส",
          field: "rate",
          type: "text",
        },
        {
          label: "จำนวนคอร์ส",
          field: "classQty",
          type: "number",
        },
        {
          label: "ส่วนลด",
          field: "classDiscount",
          type: "number",
        },
        {
          label: "รวม",
          field: "classTotal",
          type: "number",
        },
        {
          label: "cart",
          field: "cart",
          type: "number",
        },
      ],
      pColumns: [
        {
          label: "ชื่อสินค้า",
          field: "pName",
          type: "text",
        },
        {
          label: "รหัสสินค้า",
          field: "pCode",
          type: "text",
        },
        {
          label: "ราคาทุน",
          field: "cost",
          type: "text",
        },
        {
          label: "ราคาขาย",
          field: "price",
          type: "text",
        },
        {
          label: "คงเหลือ",
          field: "quantity",
          type: "text",
        },
        {
          label: "จำนวนสั่งซื้อ",
          field: "buy",
          type: "number",
        },
        {
          label: "ส่วนลด",
          field: "pDiscount",
          type: "number",
        },
        {
          label: "รวม",
          field: "total",
          type: "number",
        },
        {
          label: "cart",
          field: "cart",
          type: "number",
        },
      ],
      columns: [
        {
          label: "รหัส",
          field: "studentId",
          type: "text",
        },
        {
          label: "ชื่อ",
          field: "firstName",
          type: "text",
        },
        {
          label: "นามสกุล",
          field: "lastName",
          type: "text",
        },
        {
          label: "ชื่อเล่น",
          field: "nickName",
          type: "text",
        },
        {
          label: "เบอร์โทร",
          field: "mobilephone",
          type: "text",
        },
        {
          label: "สถานะ",
          field: "status",
          type: "text",
        },
        {
          label: "โปร์ไฟล์",
          field: "fullProfile",
          type: "text",
        },
        {
          label: "เพิ่มคอร์ส",
          field: "addcourse",
          type: "text",
        },
        {
          label: "ต่อคอร์ส",
          field: "Reneval",
          type: "text",
        },
        {
          label: "ข้อมูลอื่นๆ",
          field: "otherData",
          type: "text",
        },
        {
          label: "แก้ไข",
          field: "edit",
          type: "text",
        },
        {
          label: "delete",
          field: "delete",
          type: "text",
        },
      ],
      profiles: [],
      profileModal: null,
      profile: {
        userId: "",
        addProfileAt: "",
        image: null,

        namePrefix: "",
        nickName: "",
        firstName: "",
        lastName: "",
        birthday: null,
        email: "",
        telephone: "",
        mobilephone: "",

        parentFirstName2: "",
        parentLastName2: "",
        parentEmail2: "",
        parentMobilephone2: "",
        parentAbout2: "",


        address: {
          addressNumber: "",
          location: "",
          soi: "",
          road: "",
          district: "",
          amphoe: "",
          province: "",
          zipcode: "",
        },

        graduated: {
          degree: "",
          university: "",
          faculty: "",
          major: "",
        },
        subject: "",
        studyHis: "",
        profileType: "student",
      },
      disabled: 0,
      stdProfile: {},
      userIdToReneval: "",
      connectCourse: false,
      fee: 0,

      products: [],
      courses: [],
      carts: [],
      cartsInfo : [] ,
      courseReserv: [],
      classrooms: [],

      payforDetail: "",
      selected: [],
      confirm: false,
      paymentType: "",
      other: null,
      note: '',
      
      userStatus : null,
    };
  },

  methods: {
    studentCourse(userId) {
      console.log(userId);
      this.$router.push("/admin/studentcourse/" + userId);
    },
    studentInvoice(userId) {
      this.$router.push("/admin/studentinvoice/" + userId);
    },
    addToCart(product) {
      this.carts.push(product);
      Swal.fire({
        title: "Add To Cart",
        text: "เพิ่มสินค้าลงตระกร้าเรียบร้อยแล้ว",
        icon: "success",
        confirmButtonColor: "#30855c",
        confirmButtonText: "ตกลง",
      });
    },

    deleteProduct(index) {
      this.carts.splice(index, 1);
      Swal.fire({
        title: "SUCCESS",
        text: "ยกเลิกสินค้าเรียบร้อย",
        icon: "success",
        confirmButtonColor: "#30855c",
        confirmButtonText: "ตกลง",
      });
    },

    buyCourse(data) {
      console.log(data.startDate);
      this.courseReserv.push(data);
      Swal.fire({
        title: "SUCCESS",
        text: "เพิ่มคอร์สเรียนแล้วเรียบร้อย",
        icon: "success",
        confirmButtonColor: "#30855c",
        confirmButtonText: "ตกลง",
      });
    },

    deleteCourse(index) {
      this.courseReserv.splice(index, 1);
      Swal.fire({
        title: "SUCCESS",
        text: "ยกเลิกคอร์สเรียนแล้วเรียบร้อย",
        icon: "success",
        confirmButtonColor: "#30855c",
        confirmButtonText: "ตกลง",
      });
    },

    editprofile(profile) {
      this.profileModal = "edit";
      this.profile = profile;
      this.disabled = 0;
    },

    submitInvoice() {
      this.getInvoiceId();
    },

    async getInvoiceId() {
      try {
        this.$store.state.show = true;
        var ref = db.collection("invoiceId").doc("detail");
        let doc = await ref.get();
        if (!doc.exists) {
          await ref.set(
            {
              invoiceNo: 1,
            },
            { merge: true }
          );
          location.reload();
          this.$store.state.show = false;
        }
        let str = doc.data().invoiceNo.toString();
        this.invoiceNo = str.padStart(3, "0");

        this.addInvoice();

        this.$store.state.show = false;
      } catch (err) {
        Swal.fire({
          title: "เกิดข้อผิดพลาด",
          text: "ไม่สามารถดึงรหัสนักเรียนได้ กรุณาลองใหม่อีกครั้ง",
          icon: "warning",
          confirmButtonColor: "#FF0000",
          confirmButtonText: "ตกลง",
        });
        this.$store.state.show = false;
      }
    },

    async addInvoice() {
      try {
        this.courseInfo = [];
        this.courseReserv.forEach((item) => {
          let remain = item.amount * item.classQty;
          let data = {
            classId: item.classId,
            userId: this.stdProfile.userId,
            invoiceNo: this.invoiceNo,

            image: this.stdProfile.image,
            studentId: this.stdProfile.studentId,
            firstName: this.stdProfile.firstName,
            lastName: this.stdProfile.lastName,
            nickName: this.stdProfile.nickName,
            stdMobile: this.stdProfile.mobilephone,
            courseName: item.courseName,
            amount: item.amount,
            classType: item.classType,
            dayAttend: item.dayAttend,

            classDiscount: item.classDiscount,
            endDate: moment(item.endDate).format("x"),
            finishTime: item.finishTime,
            level: item.level,
            rate: item.rate,
            classQty: item.classQty,
            startDate: moment(item.startDate).format("x"),
            startTime: item.startTime,
            wages: item.wages,
            teacherAtclass: item.teacherAtclass,
            
            remain: remain,
          };

          this.courseInfo.push(data);
        });

        this.cartsInfo = [];
        this.carts.forEach((item)=>{
        let  data = {
            buyAmount : item.buyAmount,
            cost : item.cost,
            pCode : item.pCode,
            pDiscount : item.pDiscount,
            pID : item.pID,
            pMode : item.pMode,
            pName : item.pName,
            price : item.price,
            quantity : item.quantity,
            invoiceNo: this.invoiceNo,
          }
          this.cartsInfo.push(data)
        })

        let invoiceData = {
          userId: this.stdProfile.userId,
          studentId: this.stdProfile.studentId,
          firstName: this.stdProfile.firstName,
          lastName: this.stdProfile.lastName,
          nickName: this.stdProfile.nickName,
          image: this.stdProfile.image,
          payBy: [],
          payforDetail: this.payforDetail,
          bankDetail: "",
          invoiceNo: this.invoiceNo,
          paymentType: this.paymentType,

          courseDetail: this.courseInfo,
          productDetail: this.cartsInfo,

          pSubtotal: this.pSubtotal,
          subTotal: this.subTotal,
          grandTotal: this.grandTotal,
          fee: this.fee,

          paymentFor: this.selected,
          other: this.other,
          note: this.note,
          transactionTime: "",
          invoiceTime: moment().format("DD/MM/YYYY"),
          invoiceTimestamp: moment().format("x"),
          invDayOfWeek: moment().isoWeekday(),
          invDayOfMonth: moment().date(),
          invMonth: moment().month() + 1,
          invYear: moment().year(),

          canUpdate: 0,
          paid: false,
          confirm: 0,
          print: true,
          summarize: false,
          stdMobile: this.stdProfile.mobilephone,
        };

        await db.collection("invoiceData").add(invoiceData);
        Swal.fire({
          title: "เรียบร้อย",
          text: "ทำการบันทึกฉบับร่างแล้วเรียบร้อย",
          icon: "success",
          confirmButtonColor: "#30855c",
          confirmButtonText: "ตกลง",
        });
        this.updateInvoiceId();
        this.$router.push("/admin/editinvoice");
        $("#addCourseModal").modal("hide");
      } catch (err) {
        console.log(err);
        Swal.fire({
          title: "add Invoice เกิดข้อผิดพลาด",
          text: "เกิดข้อผิดพลาดบางอย่าง กรุณารอและทำรายการใหม่",
          icon: "error",
          confirmButtonColor: "#FF0000",
          confirmButtonText: "ตกลง",
        });
      }
    },

    async updateInvoiceId() {
      await db
        .collection("invoiceId")
        .doc("detail")
        .update({ invoiceNo: firebase.firestore.FieldValue.increment(1) });
      this.confirm = true;
      console.log("จบการทำงาน");
    },

    updateProfile(userId) {
      db.collection("studentData")
        .doc(userId)
        .update(this.profile)
        .then(() => {
          Swal.fire({
            title: "อัพเดทข้อมูล",
            text: "ได้ทำการupdateสินค้าเรียบร้อย",
            icon: "success",
            confirmButtonColor: "#30855c",
            confirmButtonText: "ตกลง",
          });
        });
    },

    reset() {
      location.reload();
    },

    fullProfile(profile) {
      this.profileModal = null;
      this.profile = profile;
      this.disabled = 1;
    },

    deleteStudent(uid) {
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
            var del = functions.httpsCallable("deleteStudent");
            var data = { uid: uid };
             db.collection("studentData")
            .doc(uid)
            .delete()

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
          console.log("Transaction failed: ", error);
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

    addcourse(stdProfile) {
      this.stdProfile = stdProfile;
      this.paymentType = "ลงทะเบียนใหม่";
      this.getClassroom();
    },

    changeStatus(uid, event) {
      // console.log(event.target.value);
      var addMessage = functions.httpsCallable("ApproveStudent");
      var data = { uid: uid, role: { [event.target.value]: true } };
      // console.log(data);
      addMessage(data)
        .then((result) => {
          console.log(result);
          if (result) {
            Swal.fire({
              title: "ทำการปรับสถานะเรียบร้อย",
              text: "Admin ได้ทำการปรับสถานะ นักเรียน แล้วเรียบร้อย",
              icon: "success",
              confirmButtonColor: "#30855c",
              confirmButtonText: "ตกลง",
            });
            this.$store.state.show = false;
          }
        })
        .catch((error) => {
          console.log(error);
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

    getReneval(stdProfile) {
      try {
        this.stdProfile = stdProfile;
        this.userIdToReneval = stdProfile.userId;
        this.connectCourse = true;
        this.paymentType = "ต่อคอร์ส";
        this.$store.state.show = true;
        db.collection("courseActive")
          .where("userId", "==", this.userIdToReneval)
          // .orderBy("createdAt", "desc")
          .onSnapshot((querySnapshot) => {
            this.classrooms = [];
            querySnapshot.forEach((doc) => {
              let classroom = {
                nowDate: moment().format("ll"),
                classId: doc.id,
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
                studentAtclass: doc.data().student,
                teacherAtclass: doc.data().teacherAtclass,
                wages: doc.data().wages,
                classQty: 0,
                classDiscount: 0,
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

    getStudentData() {
      try {
        this.$store.state.show = true;
        db.collection("studentData")
          .orderBy("studentId", "desc")
          .onSnapshot((querySnapshot) => {
            this.profiles = [];
            querySnapshot.forEach((doc) => {
              // console.log(doc.data());
              let profile = {
                userId: doc.id,
                studentId: doc.data().studentId,
                addProfileAt: moment(doc.data().addProfileAt).format(
                  "DD/MM/YYYY HH:mm:ss"
                ),
                image: doc.data().image,

                namePrefix: doc.data().namePrefix,
                nickName: doc.data().nickName,
                firstName: doc.data().firstName,
                lastName: doc.data().lastName,
                birthday: doc.data().birthday,
                email: doc.data().email,
                telephone: doc.data().telephone,
                mobilephone: doc.data().mobilephone,

                parentFirstName: doc.data().parentFirstName,
                parentLastName: doc.data().parentLastName,
                parentEmail: doc.data().parentEmail,
                parentMobilephone: doc.data().parentMobilephone,
                parentAbout: doc.data().parentAbout,

                parentFirstName2: doc.data().parentFirstName2,
                parentLastName2: doc.data().parentLastName2,
                parentEmail2: doc.data().parentEmail2,
                parentMobilephone2: doc.data().parentMobilephone2,
                parentAbout2: doc.data().parentAbout2,
                profileType: "student",

                address: {
                  addressNumber: doc.data().address.addressNumber,
                  location: doc.data().address.location,
                  soi: doc.data().address.soi,
                  road: doc.data().address.road,
                  district: doc.data().address.district,
                  amphoe: doc.data().address.amphoe,
                  province: doc.data().address.province,
                  zipcode: doc.data().address.zipcode,
                },

                graduated: {
                  degree: doc.data().graduated.degree,
                  university: doc.data().graduated.university,
                  faculty: doc.data().graduated.faculty,
                  major: doc.data().graduated.major,
                },

                role: doc.data().role,
                studyHis: doc.data().studyHis,
                commited: "นักเรียน",
              };
              this.profiles.push(profile);
            });
            this.$store.state.show = false;
          });
      } catch (err) {
        console.log(err);
        this.$store.state.show = false;
      }
    },

    getClassroom() {
      try {
        this.$store.state.show = true;
        var date = moment().isoWeekday();
        db.collection("classroom")
          // .where("day.dayNum", "==", date)
          .orderBy("createdAt", "desc")
          .onSnapshot((querySnapshot) => {
            this.classrooms = [];
            querySnapshot.forEach((doc) => {
              let classroom = {
                nowDate: moment().format("ll"),
                classId: doc.id,
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
                studentAtclass: doc.data().student,
                teacherAtclass: doc.data().teacherAtclass,
                wages: doc.data().wages,
                classQty: 0,
                classDiscount: 0,
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

    async getProducts() {
      try {
        this.$store.state.show = true;
        db.collection("products").onSnapshot((querySnapshot) => {
          this.products = [];
          querySnapshot.forEach((doc) => {
            let product = {
              pName: doc.data().pName,
              pMode: doc.data().pMode,
              pCode: doc.data().pCode,
              cost: doc.data().cost,
              price: doc.data().price,
              quantity: doc.data().quantity,
              buyAmount: 0,
              pDiscount: 0,
              pID: doc.id,
            };
            this.products.push(product);
          });
        });
        this.$store.state.show = false;
      } catch (err) {
        Swal.fire({
          title: "เกิดข้อผิดพลาดที่ระบบ",
          text: "ไม่สามารถดึงข้อมูลสินค้าได้ กรุณาลองใหม่อีกครั้ง",
          icon: "warning",
          confirmButtonColor: "#FF0000",
          confirmButtonText: "ตกลง",
        });
        this.$store.state.show = false;
      }
    },
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

  created() {
    this.getStudentData();
    this.getProducts();
    this.chkStatus();
  },

  computed: {
    subTotal() {
      var total = this.courseReserv.reduce((accumulator, item) => {
        return accumulator + item.rate * item.classQty - item.classDiscount;
      }, 0);
      return total;
    },

    pSubtotal() {
      var ptotal = this.carts.reduce((accumulator, item) => {
        return accumulator + item.price * item.buyAmount - item.pDiscount;
      }, 0);
      return ptotal;
    },

    grandTotal() {
      var total = this.subTotal + this.pSubtotal + parseInt(this.fee);
      return total;
    },
  },
};
</script>

<style lang="scss" scoped></style>
