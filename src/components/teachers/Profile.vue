<template>
  <div id="teacher" class="">
    <div class="container jumbotron" style="background: rgb(242, 242, 242)">
      <h4 class="text-center text-success mb-4">ประวัติส่วนตัว</h4>
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
              v-model.trim="profile.namePrefix"
              disabled
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
              v-model.trim="profile.nickName"
              disabled
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
              disabled
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
              disabled
            />
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-6">
          <div class="form-group">
            <label for="birthday" class="text-success">วัน/เดือน/ปี เกิด</label>
            <input
              type="text"
              class="form-control"
              placeholder="กรอกนามสกุล"
              id="lastName"
              v-model.trim="profile.birthday"
              disabled
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
              disabled
            />
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-6">
          <div class="form-group">
            <label for="telephone" class="text-success">โทรศัพท์บ้าน</label>
            <input
              type="text"
              class="form-control"
              placeholder="ไม่มีให้ใส่ - "
              id="telephone"
              v-model.trim="profile.telephone"
              disabled
            />
          </div>
        </div>
        <div class="col-lg-6">
          <div class="form-group">
            <label for="mobilephone" class="text-success">โทรศัพท์มือถือ</label>
            <input
              type="text"
              class="form-control"
              placeholder="กรอกนามสกุล"
              id="mobilephone"
              v-model.trim="profile.mobilephone"
              disabled
            />
          </div>
        </div>
      </div>

      <hr />
      <h5 class="text-left text-success my-3 font-weight-bold">
        รายละเอียดที่อยู่
      </h5>
      <div class="row mt-3">
        <div class="col-lg-6">
          <div class="form-group">
            <label for="addressNumber" class="text-success">บ้านเลขที่ </label>
            <input
              type="text"
              class="form-control"
              placeholder="กรอกบ้านเลขที่ ตัวอย่าง 99/99 หมู่ 9"
              id="อีเมล์"
              v-model.trim="profile.address.addressNumber"
              disabled
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
              disabled
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
              disabled
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
              disabled
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
              disabled
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
              disabled
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
              disabled
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
              disabled
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
            <label for="level" class="text-success"> ระดับการศึกษาสูงสุด</label>
            <input
              type="email"
              class="form-control"
              placeholder="กรอกชื่อมหาวิทยาลัย"
              id="email"
              v-model="profile.graduated.degree"
              disabled
            />
          </div>
        </div>
        <div class="col-lg-6">
          <div class="form-group">
            <label for="email" class="text-success">มหาวิทยาลัย</label>
            <input
              type="email"
              class="form-control"
              placeholder="กรอกชื่อมหาวิทยาลัย"
              id="email"
              v-model="profile.graduated.university"
              disabled
            />
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-6">
          <div class="form-group">
            <label for="email" class="text-success">คณะ</label>
            <input
              type="email"
              class="form-control"
              placeholder="กรอกคณะที่จบ"
              id="email"
              v-model="profile.graduated.faculty"
              disabled
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
              v-model="profile.graduated.major"
              disabled
            />
          </div>
        </div>
      </div>

      <hr />

      <div class="form-group">
        <label for="email" class="text-success">วิชาที่สอน</label>
        <input
          type="email"
          class="form-control"
          placeholder=""
          id="email"
          v-model="profile.subject"
          disabled
        />
      </div>

      <h5 class="text-left text-success my-3 font-weight-bold">
        ประวัติการสอน
      </h5>
      <div class="form-group">
        <textarea
          class="form-control"
          rows="5"
          id="comment"
          v-model="profile.workingProfile"
          disabled
        ></textarea>
      </div>
    </div>

    <!-- The Modal -->
    <div class="modal fade" id="profileModal">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <!-- Modal Header -->
          <div class="modal-header">
            <h4 class="modal-title text-success w-100 text-center">
              ข้อมูลและประวัติครูผู้สอน
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
                    v-model.trim="profile.namePrefix"
                    disabled
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
                    v-model.trim="profile.nickName"
                    disabled
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
                    disabled
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
                    disabled
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
                    disabled
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
                    disabled
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
                    disabled
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
                    disabled
                  />
                </div>
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
                    disabled
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
                    disabled
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
                    disabled
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
                    disabled
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
                    disabled
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
                    disabled
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
                    disabled
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
                    disabled
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
                  <label for="level" class="text-success">
                    ระดับการศึกษาสูงสุด</label
                  >
                  <input
                    type="email"
                    class="form-control"
                    placeholder="กรอกชื่อมหาวิทยาลัย"
                    id="email"
                    v-model="profile.graduated.degree"
                    disabled
                  />
                </div>
              </div>
              <div class="col-lg-6">
                <div class="form-group">
                  <label for="email" class="text-success">มหาวิทยาลัย</label>
                  <input
                    type="email"
                    class="form-control"
                    placeholder="กรอกชื่อมหาวิทยาลัย"
                    id="email"
                    v-model="profile.graduated.university"
                    disabled
                  />
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-lg-6">
                <div class="form-group">
                  <label for="email" class="text-success">คณะ</label>
                  <input
                    type="email"
                    class="form-control"
                    placeholder="กรอกคณะที่จบ"
                    id="email"
                    v-model="profile.graduated.faculty"
                    disabled
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
                    v-model="profile.graduated.major"
                    disabled
                  />
                </div>
              </div>
            </div>

            <hr />

            <div class="form-group">
              <label for="email" class="text-success">วิชาที่สอน</label>
              <input
                type="email"
                class="form-control"
                placeholder=""
                id="email"
                v-model="profile.subject"
                disabled
              />
            </div>

            <h5 class="text-left text-success my-3 font-weight-bold">
              ประวัติการสอน
            </h5>
            <div class="form-group">
              <textarea
                class="form-control"
                rows="5"
                id="comment"
                v-model="profile.workingProfile"
                disabled
              ></textarea>
            </div>
          </div>

          <!-- Modal footer -->
          <div class="modal-footer">
            <button
              @click="updateProfile(profile.uid)"
              type="button"
              class="btn btn-warning"
              v-if="modal == 'edit'"
            >
              แก้ไข
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
    <!-- </b-overlay> -->
  </div>
</template>

<script>
import { db, functions, fb } from "../../firebase.js";
import moment from "moment";

export default {
  name: "",
  data() {
    return {
      profile: {
        uid: "",
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
        workingProfile: "",
        profileType: "teacher",
      },

      modal: null,
      disabled: 0,
      editPass: "123456",
      allow: false,

      userId: "",
    };
  },

  methods: {
    async getData() {
      // try {
      // this.$store.state.show = true;
      // db.collection("teacherData")
      //   .doc(this.userId)
      //   .get((doc) => {
      //     console.log(doc.data());
      //     this.profile = doc.data();
      //     // this.$store.state.show = false;
      //   });

      try {
        let uid = fb.auth().currentUser.uid;
        console.log(uid);
        let doc = await db.collection("teacherData").doc(uid).get();
        //  console.log(doc);
        this.profile = doc.data();
        console.log(this.profile);
      } catch (err) {
        console.log(err);
      }
    },

    // getUserId() {
    //   fb.auth().onAuthStateChanged((user) => {
    //     if (user) {
    //       this.userId = user.uid;
    //       console.log(this.userId);
    //     } else {
    //     }
    //   });
    // },
  },

  mounted() {
    window.scrollTo(0, 0);
    // this.getUserId();
  },

  created() {
    this.getData();
  },
};
</script>

<style scoped></style>
