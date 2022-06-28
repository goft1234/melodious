<template>
  <div class="container jumbotron" id="printMe">
    <div class="accordion" role="tablist">
      <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button block v-b-toggle.accordion-1 variant="success"
            >ข้อมูลทั่วไป</b-button
          >
        </b-card-header>
        <b-collapse
          id="accordion-1"
          visible
          accordion="my-accordion"
          role="tabpanel"
        >
          <b-card-body>
            <!-- <b-card-text>I start opened because <code>visible</code> is <code>true</code></b-card-text>
          <b-card-text>{{ text }}</b-card-text> -->
            <h4 class="text-center text-success mb-3">
              ข้อมูลและประวัตินักเรียน
            </h4>
            <!-- <p class="text-left text-danger my-3">*** รูปแบบยังไม่สมบูรณ์ ***</p> -->

            <h5 class="text-left text-success my-3 font-weight-bold">
              ข้อมูลส่วนตัวนักเรียน
            </h5>
            <form v-on:submit.prevent>
              <div class="row">
                <div class="col-lg-6">
                  <div class="form-group">
                    <label for="namePrefix" class="text-success"
                      >คำนำหน้า</label
                    >
                    <select
                      class="form-control"
                      id="namePrefix"
                      v-model="profile.namePrefix"
                    >
                      <option disabled value="">เลือกคำนำหน้า</option>
                      <option>เด็กชาย</option>
                      <option>เด็กหญิง</option>
                      <option>นาย</option>
                      <option>นางสาว</option>
                      <option>นาง</option>
                    </select>
                    <!-- <span>courseSelected: {{ profile.namePrefix }}</span> -->
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
                      v-model.trim="profile.nickName"
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
                      v-model.trim="profile.lastName"
                    />
                    <!-- <span> : {{ profile.lastName }}</span> -->
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-lg-6">
                  <div class="form-group">
                    <label for="birthday" class="text-success"
                      >วัน/เดือน/ปี เกิด</label
                    >
                    <date-picker
                      name="birthday"
                      v-model="profile.birthday"
                      :config="options"
                    ></date-picker>
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
                    />
                    <!-- <span> : {{ profile.email }}</span> -->
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
                      placeholder="กรอกเบอร์มือถือ"
                      id="mobilephone"
                      v-model.trim="profile.mobilephone"
                    />
                  </div>
                </div>
              </div>

              <hr />
              <h5 class="text-left text-success my-3 font-weight-bold">
                ข้อมูลผู้ปกครอง
              </h5>

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
                      v-model.trim="profile.lastName"
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
                      v-model.trim="profile.mobilephone"
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
                      v-model.trim="profile.telephone"
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
                ที่อยู่ที่ติดต่อได้สะดวก
              </h5>

              <div class="row mt-3 p-3">
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
                    />
                  </div>
                </div>
              </div>

              <div class="row mt-2">
                <div class="col-lg-6">
                  <ThailandAutoComplete
                    v-model="profile.address.district"
                    type="district"
                    @select="select"
                    size=""
                    label="แขวง/ตำบล"
                    placeholder="ตำบล"
                  />
                </div>
                <div class="col-lg-6">
                  <ThailandAutoComplete
                    v-model="profile.address.amphoe"
                    type="amphoe"
                    @select="select"
                    size=""
                    label="เขต/อำเภอ"
                    placeholder="อำเภอ"
                  />
                </div>
              </div>

              <div class="row mt-2">
                <div class="col-lg-6">
                  <ThailandAutoComplete
                    v-model="profile.address.province"
                    type="province"
                    @select="select"
                    size=""
                    label="จังหวัด"
                    placeholder="จังหวัด"
                  />
                </div>
                <div class="col-lg-6">
                  <ThailandAutoComplete
                    v-model="profile.address.zipcode"
                    type="zipcode"
                    @select="select"
                    size=""
                    label="รหัสไปรษณีย์"
                    placeholder="รหัสไปรษณีย์"
                  />
                </div>
              </div>

              <hr />
              <h5 class="text-left text-success my-3 font-weight-bold">
                ประวัติการศึกษา
              </h5>

              <div class="row">
                <div class="col-lg-6">
                  <div class="form-group">
                    <label for="level" class="text-success"
                      >ข้อมูลการศึกษา</label
                    >
                    <select
                      class="form-control"
                      id="level"
                      v-model="profile.graduated.degree"
                    >
                      <option disabled value="">เลือกระดับการศึกษา</option>
                      <option>อนุบาล</option>
                      <option>ประถมศึกษา</option>
                      <option>มัธยม</option>
                      <option>ปริญญาตรี</option>
                      <option>ปริญญาโท</option>
                      <option>ปริญญาเอก</option>
                    </select>
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
                      v-model="profile.graduated.university"
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
                      placeholder="กรอกคณะ / ระดับชั้น"
                      id="email"
                      v-model="profile.graduated.faculty"
                    />
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="form-group">
                    <label for="email" class="text-success">เอก/สาขาวิชา</label>
                    <input
                      type="email"
                      class="form-control"
                      placeholder="ไม่มีใส่ - "
                      id="email"
                      v-model="profile.graduated.major"
                    />
                  </div>
                </div>
              </div>

              <hr />
              <h5 class="text-left text-success my-3 font-weight-bold">
                ประสอบการณ์ในการเรียนดนตรี
              </h5>
              <div class="form-group">
                <!-- <label for="comment"></label> -->
                <textarea
                  class="form-control"
                  rows="5"
                  id="comment"
                  placeholder="กรอกข้อมูล เคย ไม่เคย วิชาที่เรียน ระยะเวลา  ระดับ โรงเรียน/สถานศึกษา เช่น
  -เรียนเปียโน ที่ โรงเรียนสอนดนตรี Melodious ปี 2563-2564         
  -เรียนกีต้าร์คลาสสิค ที่ โรงเรียนสอนดนตรี Melodious ปี 2564-ปัจจุบัน"
                  v-model="profile.workingProfile"
                ></textarea>
              </div>

              <!-- <div
        class="p-3 my-3"
        style="background: #f0f2f5"
        v-for="(item, index) in subjectDetail"
        :key="index"
        >
        <div class="row">
          <div class="col-md-12 col-lg-6">
            <div class="form-group">
              <label for="email" class="text-success">วิชาที่สอน</label>
              <input
                type="email"
                class="form-control"
                placeholder="กรอกวิชาที่สอน เช่น เปียโนPop"
                id="email"
                v-model="item.subject"
              />
            </div>
          </div>
        </div>

        <div>
          <label class="form-check-label text-success mb-2"
            >ช่วงอายุที่สอนได้</label
          >
          <br />
          <div class="form-check-inline mx-3">
            <label class="form-check-label">
              <input
                type="checkbox"
                class="form-check-input"
                value="4-8"
                v-model="item.ageRange"
              />4-8
            </label>
          </div>
          <div class="form-check-inline mx-3">
            <label class="form-check-label">
              <input
                type="checkbox"
                class="form-check-input"
                value="9-12"
                v-model="item.ageRange"
              />9-12
            </label>
          </div>
          <div class="form-check-inline mx-3">
            <label class="form-check-label">
              <input
                type="checkbox"
                class="form-check-input"
                value="13-15"
                v-model="item.ageRange"
              />13-15
            </label>
          </div>
          <div class="form-check-inline mx-3">
            <label class="form-check-label">
              <input
                type="checkbox"
                class="form-check-input"
                value="16-19"
                v-model="item.ageRange"
              />16-19
            </label>
          </div>
          <div class="form-check-inline mx-3">
            <label class="form-check-label">
              <input
                type="checkbox"
                class="form-check-input"
                value="20-25"
                v-model="item.ageRange"
              />20-25
            </label>
          </div>
        </div>

        <div>
          <label class="form-check-label text-success my-2"
            >ระดับชั้นที่สอน</label
          >
          <br />
          <div class="form-check-inline mx-3">
            <label class="form-check-label">
              <input
                type="checkbox"
                class="form-check-input"
                value="ระดับต้น"
                v-model="item.level"
              />ระดับต้น
            </label>
          </div>
          <div class="form-check-inline mx-3">
            <label class="form-check-label">
              <input
                type="checkbox"
                class="form-check-input"
                value="ระดับกลาง"
                v-model="item.level"
              />ระดับกลาง
            </label>
          </div>
          <div class="form-check-inline mx-3">
            <label class="form-check-label">
              <input
                type="checkbox"
                class="form-check-input"
                value="ระดับสูง"
                v-model="item.level"
              />ระดับสูง
            </label>
          </div>
          <div class="form-check-inline mx-3">
            <label class="form-check-label">
              <input
                type="checkbox"
                class="form-check-input"
                value="ครูพิเศษ"
                v-model="item.level"
              />ครูพิเศษ
            </label>
          </div>
        </div>

        <div>
          <label class="form-check-label text-success my-2">ประเภทการสอน</label>
          <br />
          <div class="form-check-inline mx-3">
            <label class="form-check-label">
              <input
                type="checkbox"
                class="form-check-input"
                value="เดี่ยว"
                v-model="item.classType"
              />เดี่ยว
            </label>
          </div>
          <div class="form-check-inline mx-3">
            <label class="form-check-label">
              <input
                type="checkbox"
                class="form-check-input"
                value="กลุ่ม"
                v-model="item.classType"
              />กลุ่ม
            </label>
          </div>

          
          <p><br /></p>
        </div>
      </div> -->
              <!-- <div class="row justify-content-center">
                <div class="btn btn-success text-center px-5" @click="test">
                  เพิ่มข้อมูล
                </div>
              </div> -->
            </form>
          </b-card-body>
        </b-collapse>
      </b-card>

      <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button block v-b-toggle.accordion-2 variant="success"
            >วิชาที่ลงเรียน</b-button
          >
        </b-card-header>
        <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
          <b-card-body>
            <div
              class="mt-3 p-3"
              style="background: #e9ecef"
              v-for="(course, index) in courses"
              :key="index"
            >
              <!-- <div class="text-danger mt-3 nav-item" style="border-radius:50%;backgreound:white">
               <h4 class="text-danger text-right mt-1">
                    X
                  </h4>
              </div> -->

              <div class="mb-1 float-right">
                <button
                  type="button"
                  @click="deleteItem(index)"
                  class="btn btn-secondary btn-circle btn-lg"
                >
                  <i class="fas fa-times text-light"></i>
                </button>
              </div>
              <br />
              <br />
              <div class="row">
                <div class="col-lg-6">
                  <div class="form-group">
                    <label for="namePrefix" class="text-success"
                      >วิชาเรียน</label
                    >
                    <select
                      class="form-control"
                      id="namePrefix"
                      v-model="course.courseSelected"
                    >
                      <option disabled value="">เลือกวิชาที่เรียน</option>
                      <option
                        v-for="(item, index) in course.subjects"
                        :key="index"
                      >
                        {{ item }}
                      </option>
                    </select>
                    <span>courseSelected: {{ course.courseSelected }}</span>
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
                      v-model="course.classTypeSelected"
                    >
                      <option disabled value="">เลือกรูปแบบการเรียน</option>
                      <option
                        v-for="(item, index) in course.classType"
                        :key="index"
                      >
                        {{ item }}
                      </option>
                    </select>
                    <span>courseSelected: {{ course.classTypeSelected }}</span>
                  </div>
                </div>

                <div class="col-lg-6">
                  <div class="form-group">
                    <label for="namePrefix" class="text-success"
                      >Level ที่ลงเรียน</label
                    >
                    <select
                      class="form-control"
                      id="namePrefix"
                      v-model="course.levelSelected"
                    >
                      <option disabled value="">เลือกระดับที่เรียน</option>
                      <option
                        v-for="(item, index) in course.level"
                        :key="index"
                      >
                        {{ item }}
                      </option>
                    </select>
                    <span>courseSelected: {{ course.levelSelected }}</span>
                  </div>
                </div>

                <div class="col-lg-6">
                  <div class="form-group">
                    <label for="nickName" class="text-success"
                      >ราคา/คอร์ส</label
                    >
                    <select
                      class="form-control"
                      id="namePrefix"
                      v-model="course.priceSelected"
                    >
                      <option disabled value="">เลือก ราคา/คอร์ส</option>
                      <option
                        v-for="(item, index) in course.price"
                        :key="index"
                      >
                        {{ item }}
                      </option>
                    </select>
                    <span>courseSelected: {{ course.priceSelected }}</span>
                  </div>
                </div>

                <div class="col-lg-6">
                  <div class="form-group">
                    <label for="namePrefix" class="text-success"
                      >ส่วนลด โปรโมชั่น</label
                    >
                    <select
                      class="form-control"
                      id="namePrefix"
                      v-model="course.levelSelected"
                    >
                      <option disabled value="">เลือกส่วนลด โปรโมชั่น</option>
                      <option
                        v-for="(item, index) in course.level"
                        :key="index"
                      >
                        {{ item }}
                      </option>
                    </select>
                    <span>courseSelected: {{ course.levelSelected }}</span>
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
                      v-model="course.priceSelected"
                    >
                      <option disabled value="">เลือก อาจารย์รายวิชา</option>
                      <option
                        v-for="(item, index) in course.price"
                        :key="index"
                      >
                        {{ item }}
                      </option>
                    </select>
                    <span>courseSelected: {{ course.priceSelected }}</span>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col text-center mt-3">
                  <button
                    v-on:click="printInvoice"
                    class="btn btn-secondary px-5"
                  >
                    <i class="fas fa-print"></i> Print
                  </button>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col text-right mt-3 mr-3">
                <button v-on:click="addNewItem" class="btn btn-success">
                  เพิ่มวิชาเรียน
                </button>
              </div>
            </div>
          </b-card-body>
        </b-collapse>
      </b-card>

      <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button block v-b-toggle.accordion-3 variant="success"
            >อุปกรณ์และหนังสือ</b-button
          >
        </b-card-header>
        <b-collapse id="accordion-3" accordion="my-accordion" role="tabpanel">
          <b-card-body>
            <b-card-text></b-card-text>
          </b-card-body>
        </b-collapse>
      </b-card>
    </div>
  </div>
</template>

<script>
import { Alert } from "bootstrap";
import { db, fb, functions } from "../../firebase.js";

export default {
  name: "profile",
  data() {
    return {
      courses: [
        {
          courseSelected: "",
          classTypeSelected: "",
          levelSelected: "",
          priceSelected: "",
          subjects: ["กีต้าร์", "เบส", "กลอง", "เปียโน"],
          classType: [
            "เดี่ยว",
            "เดี่ยว 30 นาที",
            "กลุ่ม",
            "กลุ่ม 3 คนขึ้นไป",
            "กลุ่ม 4 คนขึ้นไป",
          ],
          level: ["ระดับชั้นต้น", "ระดับชั้นกลาง", "ระดับชั้นสูง", "ครูพิเศษ"],
          price: [
            "3,600",
            "5,000",
            "5,400",
            "7,800",
            "8,400",
            "8,700",
            "9,300",
          ],
        },
      ],
      options: {
        // https://momentjs.com/docs/#/displaying/
        format: "DD/MM/YYYY",
        useCurrent: false,
        showClear: true,
        showClose: true,
      },
      profile: {
        uid: "",
        namePrefix: "",
        nickName: "",
        firstName: "",
        lastName: "",
        birthday: "",
        email: "",
        telephone: "",
        mobilephone: "",
        profileType: "employee",
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

        items: [
          { description: "Item name", quantity: 0, price: 0 },
          { description: "Item name", quantity: 0, price: 0 },
        ],

        workingProfile: "",
        role: { isProfile: true },
      },
      // subjectDetail: [{ subject: "", ageRange: [], level: [], classType: [] }],
    };
  },
  methods: {
    printInvoice() {
      // window.print();
      this.$htmlToPaper('printMe');
    },
    addNewItem: function () {
      this.courses.push({
        subjects: ["กีต้าร์", "เบส", "กลอง", "เปียโน"],
        classType: [
          "เดี่ยว",
          "เดี่ยว 30 นาที",
          "กลุ่ม",
          "กลุ่ม 3 คนขึ้นไป",
          "กลุ่ม 4 คนขึ้นไป",
        ],
        level: ["ระดับชั้นต้น", "ระดับชั้นกลาง", "ระดับชั้นสูง", "ครูพิเศษ"],
        price: ["3,600", "5,000", "5,400", "7,800", "8,400", "8,700", "9,300"],
      });
    },
    deleteItem(index) {
      this.courses.splice(index, 1);
    },
    select(address) {
      this.profile.address.district = address.district;
      this.profile.address.amphoe = address.amphoe;
      this.profile.address.province = address.province;
      this.profile.address.zipcode = address.zipcode;
    },

    // addField(value, subjectDetail) {
    //   subjectDetail.push({ value: "" });
    // },

    // removeField(index, subjectDetail) {
    //   subjectDetail.splice(index, 1);
    // },
    validateForm() {
      if (
        this.profile.namePrefix != "" &&
        this.profile.nickName != "" &&
        this.profile.firstName != "" &&
        this.profile.lastName != "" &&
        this.profile.email != "" &&
        this.profile.birthday != "" &&
        this.profile.telephone != "" &&
        this.profile.mobilephone != "" &&
        this.profile.address.addressNumber != "" &&
        this.profile.address.location != "" &&
        this.profile.address.soi != "" &&
        this.profile.address.road != "" &&
        this.profile.address.district != "" &&
        this.profile.address.amphoe != "" &&
        this.profile.address.province != "" &&
        this.profile.address.zipcode != "" &&
        this.profile.graduated.degree != "" &&
        this.profile.graduated.university != "" &&
        this.profile.graduated.faculty != "" &&
        this.profile.graduated.major != "" &&
        this.profile.workingProfile != ""
      ) {
        this.addProfile();
      } else {
        Swal.fire({
          title: "กรอกข้อมูลให้ครบถ้วน",
          text: "กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน",
          icon: "warning",
          confirmButtonColor: "#FF0000",
          confirmButtonText: "ตกลง",
        });
      }
    },

    test() {
      // this.$store.state.profile = this.profile.namePrefix;
      // if (this.$store.state.profile == "เด็กชาย") {
      //   alert("Yes");
      // } else {
      //   alert("No");
      // }
    },

    addProfile() {
      // alert(this.profile.namePrefix)
      // this.profile.uid = await fb.auth().currentUser.uid;
      // console.log(this.profile.uid);
      // var addFunctions = functions.httpsCallable("EmployeeData");
      // addFunctions(this.profile)
      //   .then((result) => {
      //     // Swal.fire({
      //     //   title: "บันทึกประวัติเรียบร้อย",
      //     //   text: "กรุณารอ Admin อนุมัติการเข้าใช้ ",
      //     //   icon: "success",
      //     //   confirmButtonColor: "#30855c",
      //     //   confirmButtonText: "ตกลง",
      //     // });
      //     // this.$router.push('/appending');
      //     fb.auth()
      //       .signOut()
      //       .then((_) => {
      //         this.$router.push("/pending");
      //       });
      //   })
      //   .catch((error) => {
      //     // console.log(error);
      //     Swal.fire({
      //       title: "เกิดข้อผิดพลาด",
      //       text: "เกิดข้อผิดพลาดที่ระบบ กรุณาลองใหม่อีกครั้ง",
      //       icon: "warning",
      //       confirmButtonColor: "#FF0000",
      //       confirmButtonText: "ตกลง",
      //     });
      //   });
    },
    getcourses() {
      db.collection("courses").onSnapshot((querySnapshot) => {
        this.courses = [];
        querySnapshot.forEach((doc) => {
          let course = {
            couseName: doc.data().couseName,
            class: doc.data().class,
            beginRate: doc.data().beginRate,
            mediumRate: doc.data().mediumRate,
            topRate: doc.data().topRate,
            teacherRate: doc.data().teacherRate,
            couseId: doc.id,
          };
          this.courses.push(course);
        });
      });
    },
  },

  mounted() {
    window.scrollTo(0, 0);
  },

  created() {
    // this.getcourses();
  },
};
</script>

<style lang="scss" scoped>
.btn-circle {
  width: 30px;
  height: 30px;
  text-align: center;
  padding: 6px 0;
  font-size: 12px;
  line-height: 1.428571429;
  border-radius: 15px;
}
</style>