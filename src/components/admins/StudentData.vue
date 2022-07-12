<template>
  <div id="teacher" class="shadow">
    <!-- <h5>อนุมัติผู้ใช้งานครู</h5> -->
    <!-- <b-overlay :show="show" rounded="sm" :opacity="opacity"> -->
    <div class="container-fluid jumbotron">
      <div class="">
        <h4 class="text-center text-success mb-4">ข้อมูลนักเรียน</h4>
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
            <span v-if="props.column.field == 'otherprofile'">
              <div
                class="btn btn-warning"
                data-toggle="modal"
                data-target="#profileModal"
                @click="fullProfile(props.row)"
              >
                ดูข้อมูล
              </div>
            </span>
            <span v-else-if="props.column.field == 'addcourse'">
              <div class="btn btn-success" @click="addcourse(props.row)">
                เพิ่มคอร์ส
              </div>
            </span>
            <span v-else-if="props.column.field == 'connect'">
              <div class="btn btn-info" @click="connect(props.row)">
                ต่อคอร์ส
              </div>
            </span>
            <span v-else-if="props.column.field == 'data'">
              <div class="btn btn-dark" @click="connect(props.row)">
                ดูข้อมูล
              </div>
            </span>
            <span v-else-if="props.column.field == 'delete'">
              <div class="btn btn-danger" @click="deleteTeacher(props.row.uid)">
                ลบ
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
    <div class="modal fade" id="profileModal">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <!-- Modal Header -->
          <div class="modal-header">
            <h4 class="modal-title text-success text-center">
              ข้อมูลและประวัตินักเรียน
            </h4>
            <button type="button" class="close" data-dismiss="modal">
              &times;
            </button>
          </div>

          <!-- Modal body -->
          <div class="modal-body">
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
                    maxlength="10"
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
              <label for="email" class="text-success">วิชาที่เรียน</label>
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
              ประวัติการเรียน
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
export default {
  name: "",
  data() {
    return {
      show: true,
      opacity: 0.3,
      columns: [
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
          field: "subject",
          type: "text",
        },
        {
          label: "เพิ่มเติม",
          field: "otherprofile",
          type: "text",
        },
        {
          label: "เพิ่มคอร์ส",
          field: "addcourse",
          type: "text",
        },
        {
          label: "ต่อคอร์ส",
          field: "connect",
          type: "text",
        },
        {
          label: "ข้อมูลอื่นๆ",
          field: "data",
          type: "text",
        },
        {
          label: "delete",
          field: "delete",
          type: "text",
        },
      ],
      profiles: [],

      profile: {
        uid: "",
        namePrefix: "",
        nickName: "",
        firstName: "",
        lastName: "",
        birthday: null,
        email: "",
        telephone: "",
        mobilephone: "",
        profileType: "teacher",
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
      },
    };
  },

  methods: {
    deleteTeacher(doc) {
      Swal.fire({
        title: "ต้องการลบ?",
        text: "ทำการลบแล้วไม่สามารถย้อนกลับได้",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#30855c",
        cancelButtonColor: "#d33",
        confirmButtonText: "ตกลง ลบข้อมูล",
      }).then((result) => {
        if (result.value) {
          // console.log(doc)
          db.collection("teacherData")
            .doc(doc)
            .delete()
            .then(() => {
              Swal.fire({
                title: "ทำการลบเรียบร้อย",
                text: "ได้ทำการลบผู้ใช้งานนี้เรียบร้อย",
                icon: "success",
                confirmButtonColor: "#30855c",
                confirmButtonText: "ตกลง",
              });
            });
        }
      });
    },
    fullProfile(profile) {
      // alert(profile.firstName);
      this.profile = profile;
    },

    getStudentData() {
      db.collection("studentData")
        .orderBy("addProfileAt", "desc")
        .onSnapshot((querySnapshot) => {
          this.profiles = [];
          querySnapshot.forEach((doc) => {
            // if(!doc.data().role.isAdmin)
            // {
            console.log(doc.data());
            let profile = {
              uid: doc.id,
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
              subject: doc.data().subject,
              workingProfile: doc.data().workingProfile,
              commited: "ครู",
            };
            this.profiles.push(profile);
          });
        });
    },
  },

  mounted() {
    window.scrollTo(0, 0);
  },

  created() {
    this.getStudentData();
  },
};
</script>

<style scoped>
</style>