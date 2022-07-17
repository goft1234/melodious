<template>
  <div id="teacher" class="shadow">
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
            <!-- class="btn btn-success"
                @click="addcoursepage(props.row.uid)" -->
            <!-- data-toggle="modal"
                data-target="#addCourseModal" -->
            <span v-else-if="props.column.field == 'addcourse'">
              <div
                class="btn btn-success"
                data-toggle="modal"
                data-target="#addCourseModal"
                @click="addcourse(props.row)"
              >
                เพิ่มคอร์ส
              </div>
            </span>
            <!-- @click="Reneval(props.row)" -->
            <span v-else-if="props.column.field == 'Reneval'">
              <div
                class="btn btn-info"
                data-toggle="modal"
                data-target="#RenevalModal"
              >
                ต่อคอร์ส
              </div>
            </span>
            <span v-else-if="props.column.field == 'data'">
              <div class="btn btn-dark" @click="addToInvoice()">ดูข้อมูล</div>
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

      <!-- print invoice -->
      <div class="col" id="InvPckPrint" style="display: none">
        <div class="page" size="A4" style="page-break-after: always">
          <table
            width="100%"
            style="margin: 10px 0; border-bottom: 3px #000000 solid"
          >
            <tr>
              <td
                class="text-center"
                style="
                  font-weight: bolder;
                  font-size: 1.75em;
                  padding-top: 10px;
                "
              >
                <img
                  src="https://www.mmsmelodious.info/images/logo/medium-1594270995740.png"
                  alt="Logo"
                  style="width: 150px"
                />
              </td>
              <td colspan="2" class="text-center">
                <h4>โรงเรียนสอนดนตรี เมโลดิอุส</h4>
                <h5>Melodious Music School</h5>
                <p>
                  188/77-78 หมู่4 ชั้น2 ถ.หนามแดง-บางพลี ต.บางพลีใหญ่ อ.บางพลี
                  จ.สมุทราปราการ 10540
                </p>
                <p>
                  Tel. 02-183-9700 , 087-022-0277 , 091-5588700 Fax. 02-183-7492
                </p>
                <p>www.mmsmelodious.info , Email:mmsmelodious@gmail.com</p>
              </td>
              <td class="text-right">
                <h5>Inv.No. 8479</h5>
              </td>
            </tr>
          </table>

          <table width="100%">
            <tr>
              <td style="" colspan="4">
                <p class="text-left">ได้รับเงินจาก (Received from)</p>
              </td>
            </tr>
          </table>

          <table width="100%">
            <tr class="text-center">
              <td class="text-left">
                <h6>
                  ชื่อ - นามสกุล {{ std.firstName }} {{ std.lastName }} <br />
                </h6>
              </td>
              <td class="text-left">
                <h6>ชื่อเล่น {{ std.nickName }}</h6>
              </td>
              <td class="text-center">
                <h6>รหัสนักเรียน : {{ std.studentId }}</h6>
              </td>
              <td class="text-right">
                <h6>วันที่ {{ day }}</h6>
              </td>
            </tr>
          </table>
          <br />
          <table width="100%">
            <tr class="text-left">
              <td>
                (1):เพื่อชำระค่าเรียน
                <label for=""></label>
              </td>
              <td>
                <input type="checkbox" name="" value="" checked />
                <label for=""> ลงทะเบียนใหม่</label>
              </td>
              <td>
                <input type="checkbox" name="" value="" />
                <label for=""> ต่อคอร์สเรียน</label>
              </td>
            </tr>
          </table>

          <table width="100%" class="table-bordered" style="text-align: center">
            <tr>
              <th style="width: 8%">ลำดับ<br />No.</th>
              <th style="width: 56%">
                รายละเอียดวิชาเรียน<br />Enrolled Course
              </th>
              <th style="width: 8%">จำนวน<br />Qty.</th>
              <th style="width: 12%">ค่าเรียนต่อคอร์ส<br />Tuition fee</th>
              <th style="width: 8%">ส่วนลด<br />Discount</th>
              <th style="width: 8%">รวมค่าเรียน<br />Total</th>
            </tr>
            <tr
              v-for="(course, index) in courses"
              :key="index"
              class="text-center"
            >
              <td>{{ index + 1 }}</td>
              <td>
                วิชา-{{ course.courseSelected }} , ชั้นเรียน-{{
                  course.classTypeSelected
                }}({{ course.levelSelected }}) , วันที่เริ่มเรียน
                {{ course.startDate }} , <br />
                อาจารย์ผู้สอน-{{ course.teacherSelected }}
              </td>
              <td>{{ course.qty }}</td>
              <td>{{ course.priceSelected }}</td>
              <td>{{ course.discount }}</td>
              <td>{{ course.qty * course.priceSelected - course.discount }}</td>
            </tr>
            <tr>
              <td
                style="
                  border-left: 0;
                  border-right: 0;
                  border-bottom: 6px black double;
                "
                colspan="3"
              ></td>
              <td
                style="
                  border-left: 0;
                  border-right: 0;
                  border-bottom: 6px black double;
                "
                colspan="2"
              >
                รวมค่าเรียนทั้งสิ้น <br />Totol
              </td>
              <td
                style="
                  border-left: 0;
                  border-right: 0;
                  border-bottom: 6px black double;
                "
              >
                {{ subTotal }}
              </td>
            </tr>
          </table>
          <p><br /></p>
          <table width="100%">
            <tr class="text-left">
              <td>(2):เพื่อชำระค่า</td>
              <td>
                <input type="checkbox" name="" value="" checked />
                <label for="">หนังสือเรียน</label>
              </td>
              <td>
                <input type="checkbox" name="" value="" />
                <label for="">อุปกรณ์การเรียน</label>
              </td>
              <td>
                <input type="checkbox" name="" value="" />
                <label for="">อื่นๆ</label>
              </td>
            </tr>
          </table>

          <table width="100%" class="table-bordered" style="text-align: center">
            <tr>
              <th style="width: 8%">ลำดับ<br />No.</th>
              <th style="width: 56%">รายละเอียด<br />Enrolled Course</th>
              <th style="width: 8%">จำนวน<br />Qty.</th>
              <th style="width: 12%">ราคา/หน่วย<br />unit price</th>
              <th style="width: 8%">ส่วนลด<br />Discount</th>
              <th style="width: 8%">รวม<br />Total</th>
            </tr>
            <tr v-for="(item, index) in carts" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ item.pName }}</td>
              <td>{{ item.buyAmount }}</td>
              <td>{{ item.price }}</td>
              <td>{{ item.pDiscount }}</td>
              <td>{{ pSubtotal }}</td>
            </tr>
            <tr>
              <td
                style="
                  border-left: 0;
                  border-right: 0;
                  border-bottom: 6px black double;
                "
                colspan="3"
              ></td>
              <td
                style="
                  border-left: 0;
                  border-right: 0;
                  border-bottom: 6px black double;
                "
                colspan="2"
              >
                รวมค่าเรียนทั้งสิ้น <br />Totol
              </td>
              <td
                style="
                  border-left: 0;
                  border-right: 0;
                  border-bottom: 6px black double;
                "
              ></td>
            </tr>
          </table>
          <p><br /></p>
          <table width="100%">
            <tr>
              <td style="" colspan="4">
                <p class="text-left">ชำระเงินโดย (Pay by)</p>
              </td>
            </tr>
          </table>
          <table width="100%">
            <tr class="text-left">
              <td>
                <input type="checkbox" name="" value="" checked />
                <label for="">เงินสด</label>
              </td>
              <td>
                <input type="checkbox" name="" value="" />
                <label for="">เครดิตการ์ด</label>
              </td>
              <td>
                <input type="checkbox" name="" value="" />
                <label for="">โอนผ่านธนาคาร</label>
              </td>
            </tr>
          </table>
          <table width="100%" class="table-bordered" style="text-align: center">
            <tr>
              <th style="width: 25%">(1)รวมค่าเรียน<br />Totol Tuition Fee</th>
              <th style="width: 25%">
                (2)ค่าหนังสือหรืออุปกรณ์<br />Total Amount
              </th>
              <th style="width: 25%">ค่าแรกเข้า<br />Enrollment fee</th>
              <th style="width: 25%">รวมจำนวนเงินทั้งสิ้น<br />Net Amount</th>
            </tr>
            <tr style="height: 50px">
              <td>{{ subTotal }}</td>
              <td>{{ pSubtotal }}</td>
              <td>{{ fee }}</td>
              <td>{{ grandTotal }}</td>
            </tr>
          </table>
          <br />
          <table width="100%" style="1px solid black">
            <tr class="text-left">
              <td colspan="4">
                จำนวนเงินรวมทั้งสิ้น (ตัวอักษร)
                Baht.______________________________________________________
              </td>
            </tr>
          </table>
          <br />
          <table width="100%" style="1px solid black">
            <tr class="text-left">
              <td colspan="4">
                หมายเหตุ________________________________________________________________________________
              </td>
            </tr>
          </table>
          <p><br /></p>
          <table width="100%">
            <tr class="float-right">
              <td colspan="3">
                _______________________________________
                <br />
                <h6 class="text-center">ผู้รับเงิน</h6>
              </td>
            </tr>
          </table>
          <br />
          <i style="font-size: 10px"
            >โรงเรียนดนตรี เมโลดิอุส
            ขอสงวนสิทธิ์ที่จะไม่คืนค่าเรียนแก่ผู้สมัครไม่ว่ากรณีใดๆทั้งสิ้น</i
          >
          <br />
          <span style="font-size: 10px"
            >MMS reserve all the rights to not refund the tuition fees.</span
          >
        </div>
        <!-- PAGE PACKING LIST -->
        <!-- <div class="page" size="A4" style="page-break-after: always">
          <table
            width="100%"
            style="margin: 10px 0; border-bottom: 3px #000000 solid"
          >
            <tr>
              <td
                class="text-center"
                style="
                  font-weight: bolder;
                  font-size: 1.75em;
                  padding-top: 10px;
                "
              >
                <img
                  src="https://www.mmsmelodious.info/images/logo/medium-1594270995740.png"
                  alt="Logo"
                  style="width: 150px"
                />
              </td>
              <td colspan="2" class="text-center">
                <h4>โรงเรียนสอนดนตรี เมโลดิอุส</h4>
                <h5>Melodious Music School</h5>
                <p>
                  188/77-78 หมู่4 ชั้น2 ถ.หนามแดง-บางพลี ต.บางพลีใหญ่ อ.บางพลี
                  จ.สมุทราปราการ 10540
                </p>
                <p>
                  Tel. 02-183-9700 , 087-022-0277 , 091-5588700 Fax. 02-183-7492
                </p>
                <p>www.mmsmelodious.info , Email:mmsmelodious@gmail.com</p>
              </td>
              <td class="text-right">
                <h5>Inv.No. 8479</h5>
              </td>
            </tr>
          </table>

          <table width="100%">
            <tr>
              <td style="" colspan="4">
                <p class="text-left">ได้รับเงินจาก (Received from)</p>
              </td>
            </tr>
          </table>

          <table width="100%">
            <tr class="text-center">
              <td class="text-left">
                <h6>ชื่อ - นามสกุล เอกชัย ตั้งกวินคีตสกุล <br /></h6>
              </td>
              <td class="text-left"><h6>ชื่อเล่น เวย์</h6></td>
              <td class="text-center"><h6>รหัสนักเรียน : MMS001</h6></td>
              <td class="text-right"><h6>วันที่ 17/12/2022</h6></td>
            </tr>
          </table>
          <br />
          <table width="100%">
            <tr class="text-left">
              <td>
                (1):เพื่อชำระค่าเรียน
                <label for=""></label>
              </td>
              <td>
                <input type="checkbox" name="" value="" checked />
                <label for=""> ลงทะเบียนใหม่</label>
              </td>
              <td>
                <input type="checkbox" name="" value="" />
                <label for=""> ต่อคอร์สเรียน</label>
              </td>
              <td>
              </td>
            </tr>
          </table>

          <table width="100%" class="table-bordered" style="text-align: center">
            <tr>
              <th style="width: 8%">ลำดับ<br />No.</th>
              <th style="width: 56%">
                รายละเอียดวิชาเรียน<br />Enrolled Course
              </th>
              <th style="width: 8%">จำนวน<br />Qty.</th>
              <th style="width: 12%">ค่าเรียนต่อคอร์ส<br />Tuition fee</th>
              <th style="width: 8%">ส่วนลด<br />Discount</th>
              <th style="width: 8%">รวมค่าเรียน<br />Total</th>
            </tr>
            <tr>
              <td style="height: 200px"></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td
                style="
                  border-left: 0;
                  border-right: 0;
                  border-bottom: 6px black double;
                "
                colspan="3"
              ></td>
              <td
                style="
                  border-left: 0;
                  border-right: 0;
                  border-bottom: 6px black double;
                "
                colspan="2"
              >
                รวมค่าเรียนทั้งสิ้น <br />Totol
              </td>
              <td
                style="
                  border-left: 0;
                  border-right: 0;
                  border-bottom: 6px black double;
                "
              ></td>
            </tr>
          </table>
          <p><br /></p>
          <table width="100%">
            <tr class="text-left">
              <td>(2):เพื่อชำระค่า</td>
              <td>
                <input type="checkbox" name="" value="" checked />
                <label for="">หนังสือเรียน</label>
              </td>
              <td>
                <input type="checkbox" name="" value="" />
                <label for="">อุปกรณ์การเรียน</label>
              </td>
              <td>
                <input type="checkbox" name="" value="" />
                <label for="">อื่นๆ</label>
              </td>
            </tr>
          </table>

          <table width="100%" class="table-bordered" style="text-align: center">
            <tr>
              <th style="width: 8%">ลำดับ<br />No.</th>
              <th style="width: 56%">รายละเอียด<br />Enrolled Course</th>
              <th style="width: 8%">จำนวน<br />Qty.</th>
              <th style="width: 12%">ราคาต่อหน่วย<br />Tuition fee</th>
              <th style="width: 8%">ส่วนลด<br />Discount</th>
              <th style="width: 8%">รวมค่าเรียน<br />Total</th>
            </tr>
            <tr>
              <td style="height: 200px"></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td
                style="
                  border-left: 0;
                  border-right: 0;
                  border-bottom: 6px black double;
                "
                colspan="3"
              ></td>
              <td
                style="
                  border-left: 0;
                  border-right: 0;
                  border-bottom: 6px black double;
                "
                colspan="2"
              >
                รวมค่าเรียนทั้งสิ้น <br />Totol
              </td>
              <td
                style="
                  border-left: 0;
                  border-right: 0;
                  border-bottom: 6px black double;
                "
              ></td>
            </tr>
          </table>
          <p><br /></p>
          <table width="100%">
            <tr>
              <td style="" colspan="4">
                <p class="text-left">ชำระเงินโดย (Pay by)</p>
              </td>
            </tr>
          </table>
          <table width="100%">
            <tr class="text-left">
              <td>
                <input type="checkbox" name="" value="" checked />
                <label for="">เงินสด</label>
              </td>
              <td>
                <input type="checkbox" name="" value="" />
                <label for="">เครดิตการ์ด</label>
              </td>
              <td>
                <input type="checkbox" name="" value="" />
                <label for="">โอนผ่านธนาคาร</label>
              </td>
            </tr>
          </table>
          <table width="100%" class="table-bordered" style="text-align: center">
            <tr>
              <th style="width: 25%">(1)รวมค่าเรียน<br />Totol Tuition Fee</th>
              <th style="width: 25%">
                (2)ค่าหนังสือหรืออุปกรณ์<br />Total Amount
              </th>
              <th style="width: 25%">ค่าแรกเข้า<br />Enrollment fee</th>
              <th style="width: 25%">รวมจำนวนเงินทั้งสิ้น<br />Net Amount</th>
            </tr>
            <tr style="height: 50px">
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </table>
          <br />
          <table width="100%" style="1px solid black">
            <tr class="text-left">
              <td colspan="4">
                จำนวนเงินรวมทั้งสิ้น (ตัวอักษร)
                Baht.______________________________________________________
              </td>
            </tr>
          </table>
          <br />
          <table width="100%" style="1px solid black">
            <tr class="text-left">
              <td colspan="4">
                หมายเหตุ________________________________________________________________________________
              </td>
            </tr>
          </table>
          <p><br /></p>
          <table width="100%">
            <tr class="float-right">
              <td colspan="3">
                _______________________________________
                <br />
                <h6 class="text-center">ผู้สมัคร/ผู้ปกครอง</h6>
              </td>
            </tr>
          </table>
          <br />
          <i style="font-size: 10px"
            >โรงเรียนดนตรี เมโลดิอุส
            ขอสงวนสิทธิ์ที่จะไม่คืนค่าเรียนแก่ผู้สมัครไม่ว่ากรณีใดๆทั้งสิ้น</i
          >
          <br />
          <span style="font-size: 10px"
            >MMS reserve all the rights to not refund the tuition fees.</span
          >
        </div> -->
      </div>
      <!-- OUTPUT -->
    </div>

    <!--Start Modal เพิ่มเติม -->
    <div class="modal fade" id="profileModal">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <!-- Modal Header -->
          <div class="modal-header">
            <h4 class="modal-title w-100 text-center text-success">
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
                    disabled
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
                    disabled
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
                    v-model.trim="profile.parentEmail"
                    disabled
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
                    disabled
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
                  <label for="level" class="text-success"> ระดับการศึกษา</label>
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
                  <label for="email" class="text-success"
                    >โรงเรียน / มหาวิทยาลัย</label
                  >
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
                  <label for="email" class="text-success"
                    >ระดับชั้น / คณะ</label
                  >
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

            <h5 class="text-left text-success my-3 font-weight-bold">
              ประวัติการเรียน
            </h5>
            <div class="form-group">
              <textarea
                class="form-control"
                rows="5"
                id="comment"
                v-model="profile.studyHis"
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
            <div class="accordion" role="tablist">
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
                    <div
                      class="mt-3 p-3"
                      style="background: #e9ecef"
                      v-for="(course, index) in courses"
                      :key="index"
                    >
                      <div class="row">
                        <div class="col-lg-12">
                          <div class="mb-1 float-right">
                            <button
                              type="button"
                              @click="deleteItem(index)"
                              class="btn btn-secondary btn-circle btn-sm"
                            >
                              <i class="fas fa-times text-light"></i>
                            </button>
                          </div>
                        </div>
                      </div>
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
                              <option disabled value="">
                                เลือกวิชาที่เรียน
                              </option>

                              <option
                                v-for="(item, subIndex) in course.courseName"
                                :key="subIndex"
                              >
                                {{ item }}
                              </option>
                            </select>
                            <!-- <span>courseSelected: {{ course.courseSelected }}</span> -->
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
                              <option disabled value="">
                                เลือกรูปแบบการเรียน
                              </option>
                              <option
                                v-for="(item, index) in course.courseType"
                                :key="index"
                              >
                                {{ item }}
                              </option>
                            </select>
                            <!-- <span>courseSelected: {{ course.classTypeSelected }}</span> -->
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
                              <option disabled value="">
                                เลือกระดับที่เรียน
                              </option>
                              <option
                                v-for="(item, index) in course.level"
                                :key="index"
                              >
                                {{ item }}
                              </option>
                            </select>
                            <!-- <span>courseSelected: {{ course.levelSelected }}</span> -->
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
                              <option disabled value="">
                                เลือก ราคา/คอร์ส
                              </option>
                              <option
                                v-for="(item, index) in course.rate"
                                :key="index"
                              >
                                {{ item }}
                              </option>
                            </select>
                            <!-- <span>courseSelected: {{ course.priceSelected }}</span> -->
                          </div>
                        </div>

                        <div class="col-lg-6">
                          <div class="form-group">
                            <label for="namePrefix" class="text-success"
                              >ส่วนลด โปรโมชั่น</label
                            >
                            <div class="form-group">
                              <input
                                type="number"
                                class="form-control"
                                placeholder="กรอกเป็นตัวเลข"
                                v-model="course.discount"
                              />
                            </div>
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
                                v-model="course.amount"
                              />
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
                              v-model="course.teacherSelected"
                            >
                              <option disabled value="">
                                เลือก อาจารย์รายวิชา
                              </option>
                              <option
                                v-for="(item, index) in course.teacher"
                                :key="index"
                              >
                                {{ item.fullName }}
                              </option>
                            </select>
                            <!-- <span>courseSelected: {{ course.teacherSelected }}</span> -->
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
                              v-model="course.daySelected"
                            >
                              <option disabled value="">
                                วันที่เลือกเรียน
                              </option>
                              <option
                                v-for="(item, index) in course.day"
                                :key="index"
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
                              >เริ่มเรียน เวลา</label
                            >
                            <div>
                              <b-form-timepicker
                                v-model="course.startTime"
                                locale="th"
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
                                v-model="course.finishTime"
                                locale="th"
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
                                v-model="course.startDate"
                                locale="th"
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
                                v-model="course.endDate"
                                locale="th"
                              ></b-form-datepicker>
                              <!-- <div class="mt-2">Value: '{{ value }}'</div> -->
                            </div>
                          </div>
                        </div>

                        <div class="col-lg-6">
                          <div class="form-group">
                            <label for="" class="text-success"
                              >จำนวนคอร์ส</label
                            >
                            <div class="form-group">
                              <input
                                type="number"
                                class="form-control"
                                placeholder="กรอกเป็นตัวเลข"
                                v-model="course.qty"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col text-center mt-3 mr-3">
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
                    >
                      <template slot="table-row" slot-scope="props">
                        <span v-if="props.column.field == 'buy'">
                          <div class="form-group">
                            <input
                              type="number"
                              class="form-control"
                              placeholder="กรอกเป็นตัวเลข"
                              v-model="props.row.buyAmount"
                            />
                          </div>
                        </span>
                        <span v-else-if="props.column.field == 'pDiscount'">
                          <div class="form-group">
                            <input
                              type="number"
                              class="form-control"
                              placeholder="กรอกเป็นตัวเลข"
                              v-model="props.row.pDiscount"
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
                    <div class="table-responsive">
                      <h6>วิชาเรียน</h6>
                      <table class="table table-striped text-center">
                        <thead>
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
                          <tr>
                            <td>John</td>
                            <td>Doe</td>
                            <td>john@example.com</td>
                            <td>John</td>
                            <td>John</td>
                            <td></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div class="table-responsive">
                      <h6>หนังสือ - อุปกรณ์</h6>
                      <table class="table table-striped text-center">
                        <thead>
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
                            <td>{{ pSubtotal }}</td>
                            <td></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div class="row">
                      <div class="col-md-12">
                        <button
                          class="btn btn-primary no-print mx-auto d-black"
                          @click="print"
                        >
                          Print
                        </button>
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
    <!--End Modal AddCourse -->

    <!--Start Modal Reneval -->
    <div class="modal fade" id="RenevalModal">
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <!-- Modal Header -->
          <div class="modal-header">
            <h4 class="modal-title">Modal Heading</h4>
            <button type="button" class="close" data-dismiss="modal">
              &times;
            </button>
          </div>

          <!-- Modal body -->
          <div class="modal-body"></div>

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
    <!--End Modal Reneval -->
  </div>
</template>

<script>
import { db, functions, fb } from "../../firebase.js";
import moment from "moment";

export default {
  name: "",
  data() {
    return {
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
          field: "Reneval",
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
        studyHis: "",
        profileType: "student",
      },

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
          label: "จำนวนคงเหลือ",
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

      courses: [],
      products: [],

      courseSelected: "",
      classTypeSelected: "",
      levelSelected: "",
      priceSelected: null,
      teacherSelected: "",
      daySelected: "",
      discount: null,
      amount: 12,
      startTime: "",
      finishTime: "",
      startDate: "",
      endDate: "",
      qty: 1,

      cName: [],
      cType: [],
      cLevel: [],
      cRate: [],
      cTeacher: [],
      cDay: ["จันทร์", "อังคาร", "พุธ", "พฤหัส", "ศุกร์", "เสาร์", "อาทิตย์"],

      std: {
        // stdId:null,
        // nickName:null,
        // firstName:null,
        // lastName:null,
        // date: Daye.now()
      },
      day: null,
      invoiceNo: null,

      carts: [],
      buyAmount: null,
      pDiscount: null,
      fee: 300,
    };
  },

  computed: {
    dateFormat() {
      return moment(this.startDate).format("DD/MM/YYYY");
    },
    subTotal() {
      var total = this.courses.reduce((accumulator, item) => {
        return accumulator + item.priceSelected * item.qty - item.discount;
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
      var total = this.subTotal + this.pSubtotal + this.fee;
      return total;
    },
  },

  methods: {
    addToCart(product) {
      this.carts.push(product);
      // console.log(product.pID);
      // this.$store.state.show = true;
      // var Ref = db.collection("products").doc(product.pID);
      // return db
      //   .runTransaction((transaction) => {
      //     return transaction.get(Ref).then((sfDoc) => {
      //       if (!sfDoc.exists) {
      //         throw "Document does not exist!";
      //       }
      //       var newQuantity = sfDoc.data().quantity - product.buyAmount;
      //       transaction.update(Ref, { quantity: newQuantity });
      //     });
      //   })
      //   .then(() => {
      //     Swal.fire({
      //       title: "Add To Cart",
      //       text: "เพิ่มสินค้าลงตระกร้าเรียบร้อยแล้ว",
      //       icon: "success",
      //       confirmButtonColor: "#30855c",
      //       confirmButtonText: "ตกลง",
      //     });
      //     this.carts.push(product);
      //     this.$store.state.show = false;
      //     console.log(this.cart);
      //   })
      //   .catch((error) => {
      //     console.log("Transaction failed: ", error);
      //     Swal.fire({
      //       title: "เกิดข้อผิดพลาดที่ระบบ",
      //       text: "ไม่สามารถตัดยอดสินค้าได้ กรุณาลองใหม่อีกครั้ง",
      //       icon: "warning",
      //       confirmButtonColor: "#FF0000",
      //       confirmButtonText: "ตกลง",
      //     });
      //     this.$store.state.show = false;
      //   });
      Swal.fire({
        title: "Add To Cart",
        text: "เพิ่มสินค้าลงตระกร้าเรียบร้อยแล้ว",
        icon: "success",
        confirmButtonColor: "#30855c",
        confirmButtonText: "ตกลง",
      });
      console.log(this.carts);
    },

    decimalDigits(value) {
      return value.toFixed(this.invoiceCurrency.decimal_digits);
    },
    print() {
      // Pass the element id here
      // window.print();
      this.$htmlToPaper("InvPckPrint");
    },

    addcourse(std) {
      console.log(std);
      // console.log(uid);
      // this.$router.push({ name: "addcourse", params: { uid } });
      (this.day = moment(Date.now()).format("DD/MM/YYYY")), console.log();
      this.std = std;
    },

    addToInvoice() {
      let data = {
        studentId: this.std.studentId,
      };
      console.log(data);
    },

    async getProducts() {
      try {
        this.$store.state.show = true;
        db.collection("products").onSnapshot((querySnapshot) => {
          this.products = [];
          querySnapshot.forEach((doc) => {
            let product = {
              pName: doc.data().pName,
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
        // this.$store.state.show = true;
        // let Ref = await db.collection("products").get();
        // if (Ref.empty) {
        //   console.log("No matching documents.");
        //   return;
        // }
        // this.products = [];
        // Ref.forEach((doc) => {
        //   let product = {
        //     pName: doc.data().pName,
        //     pCode: doc.data().pCode,
        //     cost: doc.data().cost,
        //     price: doc.data().price,
        //     quantity: doc.data().quantity,
        //     buyAmount: 0,
        //     pID: doc.id,
        //   };
        //   this.products.push(product);
        //   console.log(this.products);
        // });
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

    async getCourseTemplate() {
      try {
        this.$store.state.show = true;
        const doc = await db.collection("courseTemplate").doc("detail").get();
        if (doc.empty) {
          console.log("No matching documents.");
          return;
        }
        this.cName = doc.data().courseName;
        this.cType = doc.data().courseType;
        this.cLevel = doc.data().level;
        this.cRate = doc.data().rate;
        this.cTeacher = doc.data().teacher;

        console.log(this.cTeacher);
        this.addNewItem();
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

    deleteItem(index) {
      this.courses.splice(index, 1);
    },

    deleteProduct(index) {
      this.products.splice(index, 1);
    },

    addNewProduct() {},

    addNewItem() {
      this.courses.push({
        courseSelected: "",
        classTypeSelected: "",
        levelSelected: "",
        priceSelected: null,
        teacherSelected: "",
        daySelected: "",
        discount: null,
        amount: 12,
        startTime: "",
        finishTime: "",
        startDate: "",
        endDate: "",
        qty: 1,
        // endDate:  moment(this.startDate).add(3,'M').format('YYYY-MM-DD'),

        courseName: this.cName,
        courseType: this.cType,
        level: this.cLevel,
        rate: this.cRate,
        teacher: this.cTeacher,
        day: this.cDay,
      });
      console.log(this.courses);
    },

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
      try {
        this.$store.state.show = true;
        db.collection("studentData")
          .orderBy("addProfileAt", "desc")
          .onSnapshot((querySnapshot) => {
            this.profiles = [];
            querySnapshot.forEach((doc) => {
              console.log(doc.data());
              let profile = {
                uid: doc.id,
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
        console.log(this.invoiceNo);
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
  },

  mounted() {
    window.scrollTo(0, 0);
  },

  created() {
    this.getStudentData();
    this.getCourseTemplate();
    this.getProducts();
  },
};
</script>

<style lang="scss" scoped>
#preview {
  display: flex;
  justify-content: center;
  align-items: center;
}

#preview img {
  max-width: 100%;
  max-height: 500px;
}
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