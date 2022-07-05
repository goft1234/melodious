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
                      v-model.trim="profile.parentFirstName"
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
                      placeholder="กรอกชื่อโรงเรียน / มหาวิทยาลัย"
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
                      placeholder="กรอก ระดับชั้น / คณะ"
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
                  v-model="profile.studyProfile"
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
                        v-for="(item, subIndex) in course.courseName"
                        :key="subIndex"
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
                        v-for="(item, index) in course.courseType"
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
                      <option v-for="(item, index) in course.rate" :key="index">
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
                      <option v-for="(item, index) in course" :key="index">
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
                      v-model="course.teacherSelected"
                    >
                      <option disabled value="">เลือก อาจารย์รายวิชา</option>
                      <option v-for="(item, index) in tcDatas" :key="index">
                       {{item.tcFirstname }}
                      </option>
                    </select>
                    <span>courseSelected: {{ course.teacherSelected }}</span>
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
                      v-model="course.levelSelected"
                    >
                      <option disabled value="">วันที่เลือกเรียน</option>
                      <option v-for="(item, index) in course" :key="index">
                        {{ item }}
                      </option>
                    </select>
                    <span>courseSelected: {{ course.levelSelected }}</span>
                  </div>
                </div>

                <div class="col-lg-6">
                  <div class="form-group">
                    <label for="nickName" class="text-success"
                      >เวลาที่เลือกเรียน</label
                    >
                    <select
                      class="form-control"
                      id="namePrefix"
                      v-model="course.teacherSelected"
                    >
                      <option disabled value="">เลือก อาจารย์รายวิชา</option>
                      <option v-for="(item, index) in tcDatas" :key="index">
                       {{item.tcFirstname }}
                      </option>
                    </select>
                    <span>courseSelected: {{ course.teacherSelected }}</span>
                  </div>
                </div>

              </div>

              <!-- <div class="row">
                <div class="col text-center mt-3">
                  <button
                    v-on:click="printInvoice"
                    class="btn btn-secondary px-5"
                  >
                    <i class="fas fa-print"></i> Print
                  </button>
                </div>
              </div> -->
            </div>
            <div class="row">
              <div class="col text-right mt-3 mr-3">
                <button v-on:click="addNewItem" class="btn btn-success">
                  เพิ่มวิชาเรียน
                </button>
              </div>
            </div>

            <!-- invoice Start -->
            <!-- <div class="col" id="InvPckPrint">
              <div class="page" size="A4" style="page-break-after: always">
                <table
                  width="100%"
                  style="margin:  0; border-bottom: 3px #000000 solid"
                >
                  <tr>
                    <td
                      class="text-center"
                      style="
                        font-weight: bolder;
                        font-size: 1.5em;
                        padding-top: 10px;
                      "
                    >
                      
                      MELODIOUS MUSIC SCHOOL
                    </td>
                  </tr>
                  <tr>
                    <td class="text-center">
                      <p style="font-size:12px;">
                        
                        188/77-78 ชั้น 2 หมู่ 4 ต.บางพลีใหญ่ อ.บางพลี
                        จ.สมุทรปราการ 10540
                      </p>
                      <p style="font-size:12px;">
                        Tel.02 183 9700 , 087 022 0277 , 091 5588 700 Fax 02 183
                        7492
                      </p>
                    </td>
                  </tr>
                </table>

                <table width="100%">
                  <tr>
                    <td style="" colspan="4">
                      <h5 class="text-center"><b>ใบลงทะเบียน / ต่อคอร์สเรียน</b></h5>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0"></td>
                    <td colspan="2"></td>
                    <td style="text-align: center"><b>วันที่:</b> {{dateNow}}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0"></td>
                    <td colspan="2"></td>
                    <td style="text-align: center"><b>รหัสนักเรียน</b> MMS592</td>
                  </tr>
                  <tr>
                    <td><b>ชื่อ-นามสกุล</b></td>
                    <td style="padding: 6px 0">{{profile.firstName}} {{profile.lastName}}</td>
                    <td><b>ชื่อเล่น</b></td>
                    <td style="padding: 6px 0">{{profile.nickName}}</td>
                  </tr>

                  <tr>
                    <td><b>วิชาที่เรียน</b></td>
                    <td style="padding: 6px 0">Drum</td>
                    <td ><b>อาจารย์ผู้สอน</b></td>
                    <td style="padding: 6px 0">อ.บุรินทร์ ขวัญรัตน์ (ครูป๊อป)</td>
                  </tr>

                  <tr>
                    <td><b>วันที่เลือกเรียน</b></td>
                    <td style="padding: 6px 0">ศุกร์ 17:00-18:00</td>
                    <td ><b>ชั้นเรียน</b></td>
                    <td style="padding: 6px 0">เดี่ยว (ชั้นต้น)</td>
                  </tr>

                  <tr>
                    <td><b>วันที่เริ่มเรียน</b></td>
                    <td style="padding: 6px 6px">#NUM</td>
                    <td ><b>วันที่เรียนจบ</b></td>
                    <td style="padding: 6px 0">#NUM</td>
                  </tr>

                  <tr>
                    <td></td>
                    <td style="padding: 6px 0"></td>
                    <td ><b>ได้ชำระเงินเป็นจำนวน</b></td>
                    <td style="padding: 6px 0">10,820.00 บาท</td>
                  </tr>

                  <tr>
                    <td></td>
                    <td style="padding: 6px 0"></td>
                    <td ><b>ใบเสร็จรับเงินเลขที่</b></td>
                    <td style="padding: 6px 0">170/78</td>
                  </tr>

                  <tr>
                    <td></td>
                    <td style="padding: 6px 0"></td>
                    <td ><b>ระยะเวลาเรียน</b></td>
                    <td style="padding: 6px 0">1คอร์ส/3เดือน(12 ครั้ง)</td>
                  </tr>

                  <tr>
                    <td style="padding: 4px 0"><b>หมายเหตุ :</b></td>
                    <td colspan="2">......................................................................................</td>
                  </tr>
                  <tr>
                    <td colspan="4"><i style="font-size:10px;">***โรงเรียนขอสงวนสิทธิ์ไม่คืนค่าเรียน ในทุกกรณี ***</i></td>
                  </tr>
                  <tr>
                    <td colspan="4" class="text-right">ลงชื่อ...........................................เจ้าหน้าที่/ผู้ดำเนินการ</td>
                  </tr>
                </table>

                <table
                  width="100%"
                  style="margin:  0; border-bottom: 3px #000000 solid"
                >
                  <tr>
                    <td
                      class="text-center"
                      style="
                        font-weight: bolder;
                        font-size: 1.5em;
                        padding-top: 30px;
                      "
                    >
                      MELODIOUS MUSIC SCHOOL
                    </td>
                  </tr>
                  <tr>
                    <td class="text-center">
                      <p style="font-size:12px;">
                        188/77-78 ชั้น 2 หมู่ 4 ต.บางพลีใหญ่ อ.บางพลี
                        จ.สมุทรปราการ 10540
                      </p>
                      <p style="font-size:12px;">
                        Tel.02 183 9700 , 087 022 0277 , 091 5588 700 Fax 02 183
                        7492
                      </p>
                    </td>
                  </tr>
                </table>

                <table width="100%">
                  <tr>
                    <td style="" colspan="4">
                      <h5 class="text-center"><b>ใบลงทะเบียน / ต่อคอร์สเรียน</b></h5>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0"></td>
                    <td colspan="2"></td>
                    <td style="text-align: center"><b>วันที่:</b> {{dateNow}}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0"></td>
                    <td colspan="2"></td>
                    <td style="text-align: center"><b>รหัสนักเรียน</b> MMS592</td>
                  </tr>
                  <tr>
                    <td><b>ชื่อ-นามสกุล</b></td>
                    <td style="padding: 6px 0">{{profile.firstName}} {{profile.lastName}}</td>
                    <td><b>ชื่อเล่น</b></td>
                    <td style="padding: 6px 0">เกมส์</td>
                  </tr>

                  <tr>
                    <td><b>วิชาที่เรียน</b></td>
                    <td style="padding: 6px 0">Drum</td>
                    <td ><b>อาจารย์ผู้สอน</b></td>
                    <td style="padding: 6px 0">อ.บุรินทร์ ขวัญรัตน์ (ครูป๊อป)</td>
                  </tr>

                  <tr>
                    <td><b>วันที่เลือกเรียน</b></td>
                    <td style="padding: 6px 0">ศุกร์ 17:00-18:00</td>
                    <td ><b>ชั้นเรียน</b></td>
                    <td style="padding: 6px 0">เดี่ยว (ชั้นต้น)</td>
                  </tr>

                  <tr>
                    <td><b>วันที่เริ่มเรียน</b></td>
                    <td style="padding: 6px 6px">#NUM</td>
                    <td ><b>วันที่เรียนจบ</b></td>
                    <td style="padding: 6px 0">#NUM</td>
                  </tr>

                  <tr>
                    <td></td>
                    <td style="padding: 6px 0"></td>
                    <td ><b>ได้ชำระเงินเป็นจำนวน</b></td>
                    <td style="padding: 6px 0">10,820.00 บาท</td>
                  </tr>

                  <tr>
                    <td></td>
                    <td style="padding: 6px 0"></td>
                    <td ><b>ใบเสร็จรับเงินเลขที่</b></td>
                    <td style="padding: 6px 0">170/78</td>
                  </tr>

                  <tr>
                    <td></td>
                    <td style="padding: 6px 0"></td>
                    <td ><b>ระยะเวลาเรียน</b></td>
                    <td style="padding: 6px 0">1คอร์ส/3เดือน(12 ครั้ง)</td>
                  </tr>

                  <tr>
                    <td style="padding: 4px 0"><b>หมายเหตุ :</b></td>
                    <td colspan="2">......................................................................................</td>
                  </tr>
                  <tr>
                    <td colspan="4"><i style="font-size:10px;">***โรงเรียนขอสงวนสิทธิ์ไม่คืนค่าเรียน ในทุกกรณี ***</i></td>
                  </tr>
                  <tr>
                    <td colspan="4" class="text-right">ลงชื่อรับทราบ......................................ผู้สมัคร/ผู้ปกครอง</td>
                  </tr>
                </table>

                
              </div>
            </div> -->
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
import moment from "moment";
export default {
  name: "profile",
  data() {
    return {
      // courseTemplate: {
      //   courseName: [],
      //   courseType: [],
      //   level: [],
      //   rate: [],
      // },
      cTemplate: {},
      cType: {},
      cLevel: {},
      cRate: {},

      courses: [],
      tcDatas: [],

      options: {
        // https://momentjs.com/docs/#/displaying/
        format: "DD/MM/YYYY",
        useCurrent: false,
        showClear: true,
        showClose: true,
      },
      dateNow: moment(Date.now()).format("DD/MM/YYYY"),
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
        profileType: "student",

        parentFirstName: "",
        parentLastName: "",
        parentEmail: "",
        parentMobilephone: "",
        parentAbout: "",

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

        // items: [
        //   { description: "Item name", quantity: 0, price: 0 },
        //   { description: "Item name", quantity: 0, price: 0 },
        // ],

        studyProfile: "",
        role: { isProfile: true },
      },
      // subjectDetail: [{ subject: "", ageRange: [], level: [], classType: [] }],
    };
  },

  methods: {
    async getCourseTemplate() {
      const doc = await db.collection("courseTemplate").doc("detail").get();
      // if (doc.empty) {
      //   console.log("No matching documents.");
      //   return;
      // }
      this.cTemplate = doc.data().courseName;
      this.cType = doc.data().courseType;
      this.cLevel = doc.data().level;
      this.cRate = doc.data().rate;

      this.addNewItem();
    },

    async getTeacherData() {
      let querySnapshot = await db.collection("teacherData").get();

      this.tcDatas = [];
      querySnapshot.forEach((doc) => {
        let tcData = {
          tcId: doc.data().uid,
          tcFirstname: doc.data().fullName,
          // tcLastname: doc.data().lastName,
          // tcNickname: doc.data().nickName,
        };
        this.tcDatas.push(tcData);
      });
    },

    printInvoice() {
      // window.print();
      this.$htmlToPaper("InvPckPrint");
    },

    addNewItem() {
      this.courses.push({
        courseSelected: "",
        classTypeSelected: "",
        levelSelected: "",
        priceSelected: "",
        teacherSelected: "",
        courseName: this.cTemplate,
        courseType: this.cType,
        level: this.cLevel,
        rate: this.cRate,
      });
      // console.log(this.courses);
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
        this.profile.parentFirstName != "" &&
        this.profile.parentLastName != "" &&
        this.profile.parentEmail != "" &&
        this.profile.parentMobilephone != "" &&
        this.profile.parentAbout != "" &&
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
        this.profile.studyProfile != ""
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
    // getcourses() {
    //   db.collection("courses").onSnapshot((querySnapshot) => {
    //     this.courses = [];
    //     querySnapshot.forEach((doc) => {
    //       let course = {
    //         couseName: doc.data().couseName,
    //         class: doc.data().class,
    //         beginRate: doc.data().beginRate,
    //         mediumRate: doc.data().mediumRate,
    //         topRate: doc.data().topRate,
    //         teacherRate: doc.data().teacherRate,
    //         couseId: doc.id,
    //       };
    //       this.courses.push(course);
    //     });
    //   });
    // },
  },

  mounted() {
    window.scrollTo(0, 0);
  },

  created() {
    // this.getcourses();
    this.getCourseTemplate();
    this.getTeacherData();
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
.shipper-name {
  border-top: 3px #000000 solid;
}
.text-center {
  text-align: center;
}
table.table-border,
table.table-border th,
table.table-border td {
  border-collapse: collapse;
  border: 1px #000000 solid;
}
div.page {
  background: white;
  display: block;
  margin: 0 auto;
  // margin-bottom: 0.5 cm;
  box-shadow: 0 0 0.5cm rgba(0, 0, 0, 0.5);
}
div.page[size="A4"] {
  width: 21cm;
  height: 29.7cm;
  // height: 14.85cm;
}
@media print {
  div.page {
    margin: 0;
    box-shadow: 0;
  }
  .no-print,
  .no-print * {
    display: none !important;
  }
}
</style>