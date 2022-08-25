<template>
  <div class="editInvoice">
    <div class="container-fluid jumbotron">
      <div class="my-3">
        <h4 class="text-center text-success mb-4">ข้อมูลวิชาเรียนและใบเสร็จ</h4>
        <h5 class="d-inline-block text-success"></h5>
        <router-link
          to="/admin/student"
          class="btn btn-info d-inline-block px-2"
        >
          ย้อนกลับ
        </router-link>
        <router-link
          to="/admin/invoicehistory"
          class="btn btn-success d-inline-block float-right px-1"
          data-toggle="modal"
          data-target="#product"
        >
          ประวัติการแก้ไข
        </router-link>
      </div>
      <div class="mt-3 shadow">
        <vue-good-table
          :columns="columns"
          :rows="itemDatas"
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
            <span v-if="props.column.field == 'detail'">
              <div
                class="btn btn-success"
                data-toggle="modal"
                data-target="#invoiceModal"
                @click="invoiceDetail(props.row)"
              >
                <i class="fa-solid fa-file-circle-plus"></i>
              </div>
            </span>
            <span v-else-if="props.column.field == 'paid'">
              <div
                class="btn btn-success"
                data-toggle="modal"
                data-target="#paidModal"
                @click="paymentDetail(props.row)"
              >
                <i class="fas fa-money-check-alt"></i>
              </div>
            </span>
            <span v-else-if="props.column.field == 'confirm'">
              <div
                v-if="props.row.paid == true"
                class="btn btn-success"
                @click="confirmMethods(props.row.paymentType)"
              >
                <i class="fas fa-check-circle"></i>
              </div>
              <div v-else class="btn btn-danger">
                <i class="fas fa-times-circle"></i>
              </div>
            </span>
            <span v-else-if="props.column.field == 'print'">
              <div
                v-if="props.row.print == true"
                class="btn btn-info"
                @click="openEditModal(props.row)"
              >
                <!-- data-toggle="modal"
              data-target="#invoiceModal" -->
                <i class="fas fa-edit"></i>
              </div>
              <div v-else class="btn btn-danger">
                <i class="fas fa-times-circle"></i>
              </div>
            </span>
            <span v-else-if="props.column.field == 'edit'">
              <div
                v-if="props.row.canUpdate == true"
                class="btn btn-info"
                @click="openEditModal(props.row)"
              >
                <!-- data-toggle="modal"
              data-target="#invoiceModal" -->
                <i class="fas fa-edit"></i>
              </div>
              <div
                v-else
                class="btn btn-warning"
                @click="canUpdateStatus(props.row)"
              >
                <!-- data-toggle="modal"
              data-target="#invoiceModal" -->
                <i class="fas fa-edit"></i>
              </div>
            </span>
            <span v-else-if="props.column.field == 'delete'">
              <div
                class="btn btn-danger"
                data-toggle="modal"
                data-target="#Item"
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
                <h5>Inv.No. {{ invoiceToDel }}</h5>
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
                  ชื่อ - นามสกุล {{ stdProfile.firstName }}
                  {{ stdProfile.lastName }} <br />
                </h6>
              </td>
              <td class="text-left">
                <h6>ชื่อเล่น {{ stdProfile.nickName }}</h6>
              </td>
              <td class="text-center">
                <h6>รหัสนักเรียน : {{ stdProfile.studentId }}</h6>
              </td>
              <td class="text-right">
                <h6>วันที่ {{ day }}</h6>
              </td>
            </tr>
          </table>
          <br />
          <table width="100%" class="mb-2">
            <tr class="text-left">
              <td colspan="4">
                (1):เพื่อชำระค่าเรียน <b>{{ item.paymentType }}</b>
                <label for=""></label>
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
              v-for="(course, index) in coursesActive"
              :key="index"
              class="text-center"
            >
              <td>{{ index + 1 }}</td>
              <td>
                <span v-if="course.courseName"
                  >วิชา-{{ course.courseName }} ,</span
                >
                <span v-if="course.classType"
                  >ชั้นเรียน-{{ course.classType }}({{ course.level }}) ,
                </span>
                <span v-if="course.startDate">
                  วันที่เริ่มเรียน-{{ course.startDate }} ,
                </span>
                <br />
                <span v-if="course.teacherAtclass.teacherName">
                  อาจารย์ผู้สอน-{{ course.teacherAtclass.teacherName }}
                </span>
              </td>
              <td>{{ course.classQty }}</td>
              <td>{{ course.rate }}</td>
              <td>{{ course.classDiscount }}</td>
              <td>
                {{ course.classQty * course.rate - course.classDiscount }}
              </td>
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

          <div class="mb-2">
            (2):เพื่อชำระค่า
            <span
              v-for="(item, index) in item.paymentFor"
              :key="index"
              colspan="4"
              style="display: inline-block"
            >
              <b v-if="item == 'หนังสือเรียน'" class="text-left pl-2"
                >หนังสือเรียน ,</b
              >
              <b v-if="item == 'อุปกรณ์การเรียน'" class="text-left pl-2"
                >อุปกรณ์การเรียน ,</b
              >
              <b v-if="item == 'อื่นๆ'" class="text-left pl-2">{{
                payforDetail
              }}</b>
            </span>
          </div>

          <table width="100%" class="table-bordered" style="text-align: center">
            <tr>
              <th style="width: 8%">ลำดับ<br />No.</th>
              <th style="width: 56%">รายละเอียด<br />Description</th>
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
              <td>{{ item.buyAmount * item.price - item.pDiscount }}</td>
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
                {{ pSubtotal }}
              </td>
            </tr>
          </table>
          <p><br /></p>

          <div class="mb-2">
            ชำระเงินโดย (Pay by)
            <span
              v-for="(item, index) in item.payBy"
              :key="index"
              colspan="4"
              style="display: inline-block"
            >
              <b v-if="item == 'เงินสด'" class="text-left pl-2">เงินสด ,</b>
              <b v-if="item == 'เครดิตการ์ด'" class="text-left pl-2"
                >เครดิตการ์ด ,</b
              >
              <b v-if="item == 'โอนผ่านธนาคาร'" class="text-left pl-2">{{
                bankDetail
              }}</b>
            </span>
          </div>

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
              <td colspan="4">หมายเหตุ {{ item.note }}</td>
            </tr>
          </table>
          <p><br /></p>
          <table width="100%">
            <tr class="float-right">
              <td colspan="3">
                <h6>
                  ลงชื่อ_______________________________________เจ้าหน้าที่/ผู้ดำเนินการ
                </h6>
                <br />
                <!-- <h6 class="text-center">ผู้รับเงิน</h6> -->
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
                <h5>Inv.No. {{ invoiceToDel }}</h5>
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
                  ชื่อ - นามสกุล {{ stdProfile.firstName }}
                  {{ stdProfile.lastName }} <br />
                </h6>
              </td>
              <td class="text-left">
                <h6>ชื่อเล่น {{ stdProfile.nickName }}</h6>
              </td>
              <td class="text-center">
                <h6>รหัสนักเรียน : {{ stdProfile.studentId }}</h6>
              </td>
              <td class="text-right">
                <h6>วันที่ {{ day }}</h6>
              </td>
            </tr>
          </table>
          <br />
          <table width="100%" class="mb-2">
            <tr class="text-left">
              <td colspan="4">
                (1):เพื่อชำระค่าเรียน <b>{{ item.paymentType }}</b>
                <label for=""></label>
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
              v-for="(course, index) in coursesActive"
              :key="index"
              class="text-center"
            >
              <td>{{ index + 1 }}</td>
              <td>
                <span v-if="course.courseName"
                  >วิชา-{{ course.courseName }} ,</span
                >
                <span v-if="course.classType"
                  >ชั้นเรียน-{{ course.classType }}({{ course.level }}) ,
                </span>
                <span v-if="course.startDate">
                  วันที่เริ่มเรียน-{{ course.startDate }} ,
                </span>
                <br />
                <span v-if="course.teacherAtclass.teacherName">
                  อาจารย์ผู้สอน-{{ course.teacherAtclass.teacherName }}
                </span>
              </td>
              <td>{{ course.classQty }}</td>
              <td>{{ course.rate }}</td>
              <td>{{ course.classDiscount }}</td>
              <td>
                {{ course.classQty * course.rate - course.classDiscount }}
              </td>
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

          <div class="mb-2">
            (2):เพื่อชำระค่า
            <span
              v-for="(item, index) in item.paymentFor"
              :key="index"
              colspan="4"
              style="display: inline-block"
            >
              <b v-if="item == 'หนังสือเรียน'" class="text-left pl-2"
                >หนังสือเรียน ,</b
              >
              <b v-if="item == 'อุปกรณ์การเรียน'" class="text-left pl-2"
                >อุปกรณ์การเรียน ,</b
              >
              <b v-if="item == 'อื่นๆ'" class="text-left pl-2">{{
                payforDetail
              }}</b>
            </span>
          </div>

          <table width="100%" class="table-bordered" style="text-align: center">
            <tr>
              <th style="width: 8%">ลำดับ<br />No.</th>
              <th style="width: 56%">รายละเอียด<br />Description</th>
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
              <td>{{ item.buyAmount * item.price - item.pDiscount }}</td>
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
                {{ pSubtotal }}
              </td>
            </tr>
          </table>
          <p><br /></p>

          <div class="mb-2">
            ชำระเงินโดย (Pay by)
            <span
              v-for="(item, index) in item.payBy"
              :key="index"
              colspan="4"
              style="display: inline-block"
            >
              <b v-if="item == 'เงินสด'" class="text-left pl-2">เงินสด ,</b>
              <b v-if="item == 'เครดิตการ์ด'" class="text-left pl-2"
                >เครดิตการ์ด ,</b
              >
              <b v-if="item == 'โอนผ่านธนาคาร'" class="text-left pl-2">{{
                bankDetail
              }}</b>
            </span>
          </div>

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
              <td colspan="4">หมายเหตุ {{ item.note }}</td>
            </tr>
          </table>
          <p><br /></p>
          <table width="100%">
            <tr class="float-right">
              <td colspan="3">
                <h6>
                  ลงชื่อรับทราบ_______________________________________ผู้สมัคร/ผู้ปกครอง
                </h6>
                <br />
                <!-- <h6 class="text-center">ผู้รับเงิน</h6> -->
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
      </div>

      <!-- OUTPUT -->

      <!-- Start Detail modal -->
      <div class="modal fade" id="invoiceModal">
        <div class="modal-dialog modal-xl">
          <div class="modal-content">
            <!-- Modal Header -->
            <div class="modal-header text-center">
              <h4 class="modal-title w-100 text-center text-success">
                รายละเอียดรายรับ
              </h4>
              <button type="button" class="close" data-dismiss="modal">
                &times;
              </button>
            </div>

            <!-- Modal body -->
            <div class="modal-body">
              <!--Start แสดง เมื่อทำการแก้ไข set modal = 'edit' -->
              <div
                v-if="modal == 'edit'"
                class="accordion"
                role="tablist"
                style="padding: 0"
              >
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
                              :disabled="disabled == 1"
                            />
                          </span>
                          <span v-else-if="props.column.field == 'classTime'">
                            <h6>
                              {{ props.row.startTime }} -
                              {{ props.row.finishTime }}
                            </h6>
                          </span>
                          <span
                            v-else-if="props.column.field == 'classDiscount'"
                          >
                            <div class="form-group">
                              <input
                                type="number"
                                class="form-control"
                                placeholder="กรอกเป็นตัวเลข"
                                min="0"
                                v-model.trim="props.row.classDiscount"
                                :disabled="disabled == 1"
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
                                :disabled="disabled == 1"
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
                                :disabled="disabled == 1"
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
                                :disabled="disabled == 1"
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
                                @click="addProductToCart(props.row)"
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
                              v-model.trim="item.paymentType"
                              :disabled="disabled == 1"
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
                              v-model.trim="item.paymentType"
                              :disabled="disabled == 1"
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
                                <th v-if="modal == 'edit'">ลบ</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr
                                v-for="(course, index) in item.courseDetail"
                                :key="course.docId"
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
                                <td v-if="modal == 'edit'">
                                  <button
                                    type="button"
                                    @click="deleteCourse(index, course)"
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
                                  v-model.trim="item.paymentFor"
                                  :disabled="disabled == 1"
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
                                  v-model.trim="item.paymentFor"
                                  :disabled="disabled == 1"
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
                                    v-model.trim="item.paymentFor"
                                    :disabled="disabled == 1"
                                  />
                                </div>
                              </div>
                              <input
                                type="text"
                                class="form-control"
                                placeholder="กรอกรายการชำระ"
                                v-model.trim="item.payforDetail"
                                :disabled="disabled == 1"
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
                                <th v-if="modal == 'edit'">ลบ</th>
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
                                <td v-if="modal == 'edit'">
                                  <button
                                    type="button"
                                    @click="deleteProduct(index, item)"
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
                                :disabled="disabled == 1"
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
                        </div>

                        <!-- <h6 class="ml-3 text-success">ชำระเงินโดย (Pay By)</h6>
                        <div class="row mx-auto">
                          <div class="col-md-3">
                            <div class="form-check-inline">
                              <label class="form-check-label">
                                <input
                                  type="checkbox"
                                  class="form-check-input"
                                  value="เงินสด"
                                  v-model.trim="item.payBy"
                                  :disabled="disabled == 1"
                                />เงินสด
                              </label>
                            </div>
                          </div>
                          <div class="col-md-3">
                            <div class="form-check-inline">
                              <label class="form-check-label">
                                <input
                                  type="checkbox"
                                  class="form-check-input"
                                  value="เครดิตการ์ด"
                                  v-model.trim="item.payBy"
                                  :disabled="disabled == 1"
                                />เครดิตการ์ด
                              </label>
                            </div>
                          </div>
                          <div class="col-md-6">
                            <div class="input-group mb-3">
                              <div class="input-group-prepend">
                                <div class="input-group-text">
                                  <input
                                    type="checkbox"
                                    value="โอนผ่านธนาคาร"
                                    v-model.trim="item.payBy"
                                    :disabled="disabled == 1"
                                  />
                                </div>
                              </div>
                              <input
                                type="text"
                                class="form-control"
                                placeholder="โอนผ่านบัญชีธนาคาร"
                                v-model.trim="item.bankDetail"
                                :disabled="disabled == 1"
                              />
                            </div>
                          </div>
                          <div class="col-md-6">
                            <div class="form-group mt-2">
                              <label for="usr" class="text-success"
                                >หมายเหตุ
                              </label>
                              <input
                                type="text"
                                class="form-control"
                                id="usr"
                                v-model.trim="item.note"
                                :disabled="disabled == 1"
                              />
                            </div>
                          </div>
                          <div class="col-md-6">
                            <div class="form-group mt-2">
                              <label for="usr" class="text-success"
                                >วัน-เวลาที่ทำธุรกรรม
                              </label>
                              <input
                                type="text"
                                class="form-control"
                                v-model="item.transactionTime"
                                :disabled="disabled == 1"
                              />
                            </div>
                          </div>
                          <div class="col-md-12">
                            <div class="form-group">
                              <label for="comment" class="text-danger"
                                >***รายละเอียดการแก้ไข</label
                              >
                              <textarea
                                :disabled="disabled == 1"
                                class="form-control"
                                rows="5"
                                id="comment"
                                placeholder='ใส่รายละเอียดการแก้ "แก้ไขอะไรไปบ้าง" '
                                v-model.trim="editDetail"
                              ></textarea>
                            </div>
                          </div>
                        </div> -->

                        <div class="row text-center">
                          <div class="col-md-12">
                            <button
                              v-if="modal == 'edit'"
                              class="btn btn-primary no-print"
                              @click="confirmInvoice()"
                            >
                              <i class="fas fa-check-circle"></i> ยืนยัน
                            </button>
                            <!-- <button
                            class="btn btn-danger no-print ml-3"
                            @click="reset"
                          >
                            <i class="fas fa-redo"></i> Reset/ยกเลิก
                          </button> -->
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
              <!--End แสดง เมื่อทำการแก้ไข set modal = 'edit' -->

              <!--Start แสดงเพื่อ ดูรายลเอียดอย่างเดียว set modal = null -->
              <div v-else id="modalNull">
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
                        v-model.trim="item.paymentType"
                        :disabled="disabled == 1"
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
                        v-model.trim="item.paymentType"
                        :disabled="disabled == 1"
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
                          <th v-if="modal == 'edit'">ลบ</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(course, index) in item.courseDetail"
                          :key="course.docId"
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
                          <td v-if="modal == 'edit'">
                            <button
                              type="button"
                              @click="deleteCourse(index, course)"
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
                            v-model.trim="item.paymentFor"
                            :disabled="disabled == 1"
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
                            v-model.trim="item.paymentFor"
                            :disabled="disabled == 1"
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
                              v-model.trim="item.paymentFor"
                              :disabled="disabled == 1"
                            />
                          </div>
                        </div>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="กรอกรายการชำระ"
                          v-model.trim="item.payforDetail"
                          :disabled="disabled == 1"
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
                          <th v-if="modal == 'edit'">ลบ</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(item, index) in carts" :key="index">
                          <td>{{ item.pName }}</td>
                          <td>{{ item.buyAmount }}</td>
                          <td>{{ item.price }}</td>
                          <td>{{ item.pDiscount }}</td>
                          <td>
                            {{ item.buyAmount * item.price - item.pDiscount }}
                          </td>
                          <!-- <td v-if="modal == 'edit'">
                            <button
                              type="button"
                              @click="deleteProduct(index, item)"
                              class="btn btn-danger btn-sm"
                            >
                              <i class="fas fa-times text-light"></i>
                            </button>
                          </td> -->
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
                          :disabled="disabled == 1"
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
                  </div>

                  <h6 class="ml-3 text-success">ชำระเงินโดย (Pay By)</h6>
                  <div class="row mx-auto">
                    <div class="col-md-3">
                      <div class="form-check-inline">
                        <label class="form-check-label">
                          <input
                            type="checkbox"
                            class="form-check-input"
                            value="เงินสด"
                            v-model.trim="item.payBy"
                            :disabled="disabled == 1"
                          />เงินสด
                        </label>
                      </div>
                    </div>
                    <div class="col-md-3">
                      <div class="form-check-inline">
                        <label class="form-check-label">
                          <input
                            type="checkbox"
                            class="form-check-input"
                            value="เครดิตการ์ด"
                            v-model.trim="item.payBy"
                            :disabled="disabled == 1"
                          />เครดิตการ์ด
                        </label>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <!-- โอนผ่านธนาคาร -->
                      <div class="input-group mb-3">
                        <div class="input-group-prepend">
                          <div class="input-group-text">
                            <input
                              type="checkbox"
                              value="โอนผ่านธนาคาร"
                              v-model.trim="item.payBy"
                              :disabled="disabled == 1"
                            />
                          </div>
                        </div>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="โอนผ่านบัญชีธนาคาร"
                          v-model.trim="item.bankDetail"
                          :disabled="disabled == 1"
                        />
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group mt-2">
                        <label for="usr" class="text-success">หมายเหตุ </label>
                        <input
                          type="text"
                          class="form-control"
                          id="usr"
                          v-model.trim="item.note"
                          :disabled="disabled == 1"
                        />
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group mt-2">
                        <label for="usr" class="text-success"
                          >วัน-เวลาที่ทำธุรกรรม
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="item.transactionTime"
                          :disabled="disabled == 1"
                        />
                      </div>
                      <!-- {{item.transactionTime}} -->
                    </div>
                    <!-- v-if="modal == 'edit'" -->
                    <div class="col-md-12">
                      <div class="form-group">
                        <label for="comment" class="text-danger"
                          >***รายละเอียดการแก้ไข</label
                        >
                        <textarea
                          :disabled="disabled == 1"
                          class="form-control"
                          rows="5"
                          id="comment"
                          placeholder='ใส่รายละเอียดการแก้ "แก้ไขอะไรไปบ้าง" '
                          v-model.trim="editDetail"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!--End แสดงเพื่อ ดูรายลเอียดอย่างเดียว set modal = null -->
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
              <!-- <button
              @click="addItem()"
              type="button"
              class="btn btn-success"
              v-if="modal == 'new'"
            >
              บันทึกสินค้า
            </button>
            <button
              @click="updateItem(Item.pID)"
              type="button"
              class="btn btn-warning"
              v-if="modal == 'edit'"
            >
              แก้ไข
            </button> -->
            </div>
          </div>
        </div>
      </div>

      <!--Start  paidModal -->
      <div class="modal fade" id="paidModal">
        <div class="modal-dialog modal-xl">
          <div class="modal-content">
            <!-- Modal Header -->
            <div class="modal-header">
              <h4 class="modal-title w-100 text-center text-success">
                การชำระเงิน
              </h4>
              <button type="button" class="close" data-dismiss="modal">
                &times;
              </button>
            </div>

            <!-- Modal body -->
            <div class="modal-body">
              <form v-on:submit.prevent>
                <h6 class="ml-3 text-success">ชำระเงินโดย (Pay By)</h6>
                <div class="row mx-auto">
                  <div class="col-md-3">
                    <div class="form-check-inline">
                      <label class="form-check-label">
                        <input
                          type="checkbox"
                          class="form-check-input"
                          value="เงินสด"
                          v-model.trim="paymentDt.payBy"
                        />เงินสด
                      </label>
                    </div>
                  </div>
                  <div class="col-md-3">
                    <div class="form-check-inline">
                      <label class="form-check-label">
                        <input
                          type="checkbox"
                          class="form-check-input"
                          value="เครดิตการ์ด"
                          v-model.trim="paymentDt.payBy"
                        />เครดิตการ์ด
                      </label>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="input-group mb-3">
                      <div class="input-group-prepend">
                        <div class="input-group-text">
                          <input
                            type="checkbox"
                            value="โอนผ่านธนาคาร"
                            v-model.trim="paymentDt.payBy"
                          />
                        </div>
                      </div>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="โอนผ่านบัญชีธนาคาร"
                        v-model.trim="paymentDt.bankDetail"
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group mt-2">
                      <label for="usr" class="text-success">หมายเหตุ </label>
                      <input
                        type="text"
                        class="form-control"
                        id="usr"
                        placeholder="กรอกรายการโปรโมชั่น"
                        v-model.trim="paymentDt.note"
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group mt-2">
                      <label for="usr" class="text-success"
                        >วัน-เวลาที่ทำธุรกรรม
                      </label>
                      <input
                        type="datetime-local"
                        class="form-control"
                        v-model="paymentDt.transactionTime"
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>

            <!-- Modal footer -->
            <div class="modal-footer">
              <button
                @click="addPaymentDt(paymentDt)"
                type="button"
                class="btn btn-success"
              >
                บันทึกการชำระเงิน
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
      <!--End The Modal -->
    </div>
  </div>
</template>

<script>
import { db } from "../../firebase";
import DateRangePicker from "vue2-daterange-picker";
//you need to import the CSS manually
import "vue2-daterange-picker/dist/vue2-daterange-picker.css";
import moment from "moment";
import firebase from "firebase/app";

export default {
  name: "editInvoice",

  data() {
    return {
      classRoomColumns: [
        {
          label: "ครู",
          field: "teacherAtclass.teacherName",
          type: "text",
        },
        // {
        //   label: "นักเรียน",
        //   field: "studentAtClass",
        //   type: "text",
        // },
        // {
        //   label: "รหัสนักเรียน",
        //   field: "studentId",
        //   type: "text",
        // },
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
          label: "รหัสนักเรียน",
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
          label: "ประเภท",
          field: "paymentType",
          type: "text",
        },
        {
          label: "inv.no",
          field: "invoiceNo",
          type: "text",
        },
        {
          label: "วันที่",
          field: "transactionTime",
          type: "text",
        },
        {
          label: "จำนวน",
          field: "grandTotal",
          type: "text",
        },
        {
          label: "แก้ไข",
          field: "edit",
          type: "text",
        },
        {
          label: "ชำระ",
          field: "paid",
          type: "text",
        },
        {
          label: "ยืนยัน",
          field: "confirm",
          type: "text",
        },
        {
          label: "print",
          field: "print",
          type: "text",
        },
        {
          label: "รายละเอียด",
          field: "detail",
          type: "text",
        },
        // {
        //   label: "ลบ",
        //   field: "delete",
        //   type: "text",
        // },
      ],

      carts: [],
      buyAmount: 0,
      pDiscount: 0,
      confirm: false,

      cName: [],
      cType: [],
      cLevel: [],
      cRate: [],
      cTeacher: [],
      cDay: ["จันทร์", "อังคาร", "พุธ", "พฤหัส", "ศุกร์", "เสาร์", "อาทิตย์"],
      day: moment().add(543, "year").format("LL"),

      course: {},
      coursesActive: [],
      item: {},
      itemDatas: [],
      products: [],

      disabled: 0,

      fee: 300,
      invoiceToDel: null,
      modal: null,

      courseInfo: [],
      newQty: null,
      editPass: "123456",
      allow: false,
      editDetail: "",
      classrooms: [],
      stdProfile: {},

      paymentDt: {
        note: "",
        payBy: [],
        bankDetail: "",
        transactionTime: "",
        docId: "",
        paid: "",
      },
    };
  },

  methods: {
    // *** Event **** //
    buyCourse(data) {
      console.log(data);
      // let courseData = {
      //   amount: data.amount,
      //   classDiscount: data.classDiscount,
      //   classId: data.classId,
      //   classQty: data.classQty,
      //   classType: data.classType,
      //   courseName: data.courseName,
      //   dayAttend: data.dayAttend,
      //   endDate: data.endDate,
      //   finishTime: data.finishTime,
      //   level: data.level,
      //   nowDate: Date.now(),
      //   rate: data.rate,
      //   startDate: data.startDate,
      //   startTime: data.startTime,
      //   studentAtclass: data.studentAtclass,
      //   teacherAtclass: data.teacherAtclass,
      //   wages: data.wages,
      //   userId: this.stdProfile.userId,
      //   classId: data.classId,
      //   studentId: this.stdProfile.studentId,
      //   firstName: this.stdProfile.firstName,
      //   lastName: this.stdProfile.lastName,
      //   nickName: this.stdProfile.nickName,
      // };

      // // console.log(courseData);

      // // data มีค่า = classroom ใน getClassroom()
      // this.itemDatas.courseDetail.push(courseData);
      // // this.addToClassroom(data);
      // Swal.fire({
      //   title: "SUCCESS",
      //   text: "เพิ่มคอร์สเรียนแล้วเรียบร้อย",
      //   icon: "success",
      //   confirmButtonColor: "#30855c",
      //   confirmButtonText: "ตกลง",
      // });
    },

    deleteCourse(index, course) {
      // console.log(course);
      // index มีค่า = ตัวแหน่งใน array
      this.coursesActive.splice(index, 1);
      this.deleteFromClassroom(course);
      Swal.fire({
        title: "ACTION SUCCESS",
        text: "ลบคอร์สเรียบร้อย",
        icon: "success",
        confirmButtonColor: "#30855c",
        confirmButtonText: "ตกลง",
      });
    },

    print() {
      // Pass the element id here
      // window.print();
      this.$htmlToPaper("InvPckPrint");
      // this.carts = [];
      // this.reset()
    },

    // *** updateData *** //
    paymentDetail(payment) {
      // console.log(payment);
      this.paymentDt.docId = payment.docId;
    },
    addPaymentDt(paymentDt) {
      console.log(paymentDt);

      try {
        db.collection("invoiceData").doc(paymentDt.docId).update({
          note: this.paymentDt.note,
          payBy: this.paymentDt.payBy,
          bankDetail: this.paymentDt.bankDetail,
          transactionTime: this.paymentDt.transactionTime,
          paid: true,
        });
        Swal.fire({
          title: "SUCCESS",
          text: "บันทึกการชำระเงินเรียบร้อย",
          icon: "success",
          confirmButtonColor: "#30855c",
          confirmButtonText: "ตกลง",
        });
        $("#paidModal").modal("hide");
        this.paymentDt = {
          note: "",
          payBy: [],
          bankDetail: "",
          transactionTime: "",
          docId: "",
          paid: "",
        };
      } catch (err) {
        console.log(err);
        Swal.fire({
          title: "ERROR",
          text: "ไม่สามารถบันทึกการชำระเงินได้",
          icon: "error",
          confirmButtonColor: "#FF0000",
          confirmButtonText: "ตกลง",
        });
      }
      // this.paymentDt
    },

    async canUpdateStatus(detail) {
      const { value: password } = await Swal.fire({
        title: "กรอก Password",
        input: "password",
        icon: "question",
        inputLabel: "Password",
        inputPlaceholder: "กรอกรหัสเข้าแก้ไข",
        confirmButtonColor: "#30855c",
        inputAttributes: {
          maxlength: 10,
          autocapitalize: "off",
          autocorrect: "off",
        },
      });

      if (password == this.editPass) {
        var batch = db.batch();

        var invoiceDocRef = db.collection("invoiceData").doc(detail.docId);
        batch.set(invoiceDocRef, { canUpdate: true }, { merge: true });

        var invoiceHisRef = db.collection("invoiceHistory").doc();
        batch.set(invoiceHisRef, detail);

        batch.commit().then(() => {
          Swal.fire({
            title: "SUCCESS",
            text: "ทำการแก้ไขข้อมูลได้",
            icon: "success",
            confirmButtonColor: "#30855c",
            confirmButtonText: "ตกลง",
          });
          // this.openEditModal(detail);
          // this.allow = true;
        });
      } else {
        Swal.fire({
          title: "Incorrect password",
          text: "รหัสเข้าแก้ไขไม่ถูกต้อง",
          icon: "error",
          confirmButtonColor: "#FF0000",
          confirmButtonText: "ตกลง",
        });
      }
    },

    async confirmInvoice() {
      // console.log(this.coursesActive);
      try {
        var batch = db.batch();
        this.coursesActive.forEach(async (course) => {
          let data = {
            classId: course.classId,
            docId: course.docId,
            userId: course.userId,
            amount: course.amount,
            classDiscount: course.classDiscount,
            classQty: course.classQty,
            classType: course.classType,
            courseName: course.courseName,
            dayAttend: course.dayAttend,
            endDate: course.endDate,
            finishTime: moment(course.finishTime).format("x"),
            level: course.level,
            nowDate: Date.now(),
            rate: course.rate,
            startDate: course.startDate,
            startTime: moment(course.startTime).format("x"),
            teacherAtclass: course.teacherAtclass,
            wages: course.wages,
            studentId: this.stdProfile.studentId,
            firstName: this.stdProfile.firstName,
            lastName: this.stdProfile.lastName,
            nickName: this.stdProfile.nickName,
            invoiceNo: this.stdProfile.invoiceNo,

            // uid: course.uid,
            // amount: course.amount,
            // classDiscount: course.classDiscount,
            // studentId: this.stdProfile.studentId,
            // firstName: this.stdProfile.firstName,
            // lastName: this.stdProfile.lastName,
            // nickName: this.stdProfile.nickName,
            // // mobilephone: this.item.mobilephone,
            // courseName: course.courseName,
            // classType: course.classType,

            // dayAttend: course.dayAttend,
            // finishTime: course.finishTime,
            // level: course.level,
            // rate: course.rate,
            // classQty: course.classQty,
            // startDate: moment(course.startDate).format("x"),
            // endDate: moment(course.endDate).format("x"),
            // startTime: course.startTime,
            // wages: course.wages,
            // teacherAtclass: course.teacherAtclass,
          };

          // console.log(data.uid);
          if (course.docId) {
            // console.log("มี" + course.classId);
            batch.update(db.collection("courseActive").doc(course.docId), data);
          } else {
            // console.log("inv.no " + this.invoiceToDel);
            let rand = Math.floor(Math.random() * 100000);
            let uuid = this.invoiceToDel + rand;
            data.docId = uuid;
            batch.set(db.collection("courseActive").doc(data.docId), data);
            // console.log('ไม่มี '+ data.uid);
          }
        });

        // this.carts.forEach((item) => {
        //   var newQty = item.quantity - item.buyAmount;
        //   console.log(newQty);
        //   batch.update(db.collection("products").doc(item.pID), {
        //     quantity: newQty,
        //   });
        // });

        await batch.commit();
        console.log("เพิ่มคอร์สเรียนเรียบร้อย");

        //  this.carts = [];
        this.addInvoice();
      } catch (err) {
        console.log(err);
      }
    },

    async addInvoice() {
      console.log("detail from " + this.coursesActive);
      try {
        this.courseInfo = [];
        this.coursesActive.forEach((course) => {
          let data = {
            classId: course.classId,
            docId: course.docId,
            userId: course.userId,

            amount: course.amount,
            classDiscount: course.classDiscount,
            classQty: course.classQty,
            classType: course.classType,
            courseName: course.courseName,
            dayAttend: course.dayAttend,
            endDate: course.endDate,
            finishTime: moment(course.finishTime).format("x"),
            level: course.level,
            nowDate: Date.now(),

            rate: course.rate,
            startDate: course.startDate,
            startTime: moment(course.startTime).format("x"),
            teacherAtclass: course.teacherAtclass,
            wages: course.wages,
            studentId: this.stdProfile.studentId,
            firstName: this.stdProfile.firstName,
            lastName: this.stdProfile.lastName,
            nickName: this.stdProfile.nickName,
            invoiceNo: this.stdProfile.invoiceNo,
          };

          this.courseInfo.push(data);
        });

        console.log(this.item);
        let invoiceData = {
          userId: this.item.userId,
          studentId: this.item.studentId,
          firstName: this.item.firstName,
          lastName: this.item.lastName,
          nickName: this.item.nickName,
          payBy: this.item.payBy,
          payforDetail: this.item.payforDetail,
          bankDetail: this.item.bankDetail,
          invoiceNo: this.item.invoiceNo,
          paymentType: this.item.paymentType,

          courseDetail: this.courseInfo,
          productDetail: this.carts,

          pSubtotal: this.pSubtotal,
          subTotal: this.subTotal,
          grandTotal: this.grandTotal,
          fee: this.fee,

          paymentFor: this.item.paymentFor,
          other: this.item.other,
          note: this.item.note,
          // transactionTime: this.item.transactionTime,
          transactionTime: Date.now(),
          invoiceTime: moment(Date.now()).format("DD/MM/YYYY"),
          invoiceTimestamp: moment(Date.now()).format("x"),
          editDetail: this.editDetail,
        };

        await db
          .collection("invoiceData")
          .doc(this.item.docId)
          .update(invoiceData);
        Swal.fire({
          title: "เรียบร้อย",
          text: "ได้ทำการเพิ่มสินค้าแล้วเรียบร้อย",
          icon: "success",
          confirmButtonColor: "#30855c",
          confirmButtonText: "ตกลง",
        });
        this.confirm = true;
      } catch (err) {
        console.log("error form Add course" + err);
        Swal.fire({
          title: "Add Course เกิดข้อผิดพลาด",
          text: "เกิดข้อผิดพลาดบางอย่าง กรุณารอและทำรายการใหม่",
          icon: "error",
          confirmButtonColor: "#FF0000",
          confirmButtonText: "ตกลง",
        });
      }
    },

    // *** AddData ***
    confirmMethods(paymentType){
      // console.log(paymentType);
      if (paymentType == "ต่อคอร์ส") {
        // console.log("ต่อคอร์ส");
        this.addToRenevalCourse();
      } else {
        // this.addToActiveCourse();
        console.log("ลงทะเบียนใหม่");
      }
    },

    addToRenevalCourse() {
      // console.log(this.courseReserv);
      try {
        var batch = db.batch();
        this.coursesActive.forEach((item) => {
          let remain = item.remain + (item.amount * item.classQty);
          console.log(item.classId);
          let data = {
            remain: remain,
          };
          batch.update(db.collection("courseActive").doc(item.classId), data);
          
        });

        this.carts.forEach((item) => {
          var newQty = item.quantity - item.buyAmount;
          batch.update(db.collection("products").doc(item.pID), {
            quantity: newQty,
          });
        });

        batch.commit();
        console.log("เพิ่มคอร์สเรียนเรียบร้อย");

        // this.addInvoice();
      } catch (err) {
        console.log(err);
      }
    },

    addToActiveCourse() {
      try {
        var batch = db.batch();
        this.coursesActive.forEach((item) => {
          let remain = item.amount * item.classQty;
          let data = {
            classId: item.classId,
            userId: this.stdProfile.userId,

            remain: remain,
            studentId: this.stdProfile.studentId,
            firstName: this.stdProfile.firstName,
            lastName: this.stdProfile.lastName,
            nickName: this.stdProfile.nickName,
            mobilephone: this.stdProfile.mobilephone,
            courseName: item.courseName,
            amount: item.amount,
            classType: item.classType,
            invoiceNo: this.invoiceNo,

            dayAttend: item.dayAttend,
            classDiscount: item.classDiscount,
            finishTime: item.finishTime,
            level: item.level,
            rate: item.rate,
            classQty: item.classQty,
            startDate: moment(item.startDate).format("x"),
            endDate: moment(item.endDate).format("x"),
            startTime: item.startTime,
            wages: item.wages,

            teacherAtclass: item.teacherAtclass,
          };

          batch.set(db.collection("courseActive").doc(), data);
        });

        this.courseReserv.forEach((item) => {
          // console.log(item.studentAtclass);
          let stdProfileInClass = {
            userId: this.stdProfile.userId,
            classId: item.classId,
            studentId: this.stdProfile.studentId,
            firstName: this.stdProfile.firstName,
            lastName: this.stdProfile.lastName,
            nickName: this.stdProfile.nickName,
            invoiceNo: this.invoiceNo,
            dateAtClass: Date.now(),
          };
          batch.update(db.collection("classroom").doc(item.classId), {
            student:
              firebase.firestore.FieldValue.arrayUnion(stdProfileInClass),
          });
        });

        this.carts.forEach((item) => {
          var newQty = item.quantity - item.buyAmount;
          batch.update(db.collection("products").doc(item.pID), {
            quantity: newQty,
          });
        });

        batch.commit();
        console.log("เพิ่มคอร์สเรียนเรียบร้อย");

        this.addInvoice();
      } catch (err) {
        console.log(err);
      }
      // console.log('addTo activeCourse');
    },

    addProductToCart(product) {
      var batch = db.batch();
      // console.log(product);
      this.carts.push(product);

      this.newQty = parseInt(product.quantity) - parseInt(product.buyAmount);
      var productRef = db.collection("products").doc(product.pID);
      batch.update(productRef, { quantity: this.newQty });

      var invoiceProduct = db.collection("invoiceData").doc(this.item.docId);
      batch.update(invoiceProduct, { productDetail: this.carts });

      batch.commit().then(() => {
        Swal.fire({
          title: "Add To Cart",
          text: "เพิ่มสินค้าลงตระกร้าเรียบร้อยแล้ว",
          icon: "success",
          confirmButtonColor: "#30855c",
          confirmButtonText: "ตกลง",
        });
        console.log(this.carts);
      });
    },

    addToClassroom(data) {
      // console.log(data);
      // console.log(data.classId);
      // console.log(this.stdProfile.nickName,);
      let stdProfileInClass = {
        userId: this.stdProfile.userId,
        classId: data.classId,
        studentId: this.stdProfile.studentId,
        firstName: this.stdProfile.firstName,
        lastName: this.stdProfile.lastName,
        nickName: this.stdProfile.nickName,
        dateAtClass: Date.now(),
      };

      db.collection("classroom")
        .doc(data.classId)
        .update({
          student: firebase.firestore.FieldValue.arrayUnion(stdProfileInClass),
        });
    },

    // **** DeleteData *** //

    async deleteProduct(index, item) {
      // ติด bug
      // console.log(item.buyAmount);
      // console.log(item.quantity);
      var batch = db.batch();

      var doc = await db.collection("products").doc(item.pID).get();
      // console.log(doc.data().quantity);
      var pRemain = doc.data().quantity;
      var newQty = parseInt(pRemain) + parseInt(item.buyAmount);

      var productRef = db.collection("products").doc(item.pID);
      batch.update(productRef, { quantity: newQty });

      var invoiceProduct = db.collection("invoiceData").doc(this.item.docId);
      batch.update(invoiceProduct, { productDetail: this.carts });

      batch.commit().then(() => {
        Swal.fire({
          title: "Delete From Cart",
          text: "ลบสินค้าออกจากตระกร้าเรียบร้อยแล้ว",
          icon: "success",
          confirmButtonColor: "#30855c",
          confirmButtonText: "ตกลง",
        });
        // console.log(this.carts);
      });
      this.carts.splice(index, 1);
    },

    deleteFromClassroom(docId) {
      console.log(docId);
      var DocRef = db.collection("classroom").doc(docId.classId);
      return db
        .runTransaction((transaction) => {
          return transaction.get(DocRef).then((sfDoc) => {
            if (!sfDoc.exists) {
              throw "Document does not exist!";
            }
            // console.log(sfDoc.data().student);
            var objArr = sfDoc.data().student;
            var remainingArr = objArr.filter(
              (data) => data.userId != docId.userId
            );
            // console.log(remainingArr);
            transaction.update(DocRef, { student: remainingArr });
          });
        })
        .then(() => {
          console.log("Transaction successfully committed!");
        })
        .catch((error) => {
          console.log("Transaction failed: ", error);
        });
    },

    // *** ReadData *** //
    openEditModal(detail) {
      console.log(detail);
      this.stdProfile = detail;
      this.allow = detail.canUpdate;

      if (this.allow == true) {
        this.invoiceToDel = detail.invoiceNo;
        this.item = detail;
        this.modal = "edit";
        this.disabled = 0;
        this.carts = detail.productDetail;
        $("#invoiceModal").modal("show");

        db.collection("courseActive")
          .where("invoiceNo", "==", detail.invoiceNo)
          .onSnapshot((querySnapshot) => {
            this.coursesActive = [];
            querySnapshot.forEach((doc) => {
              let course = {
                docId: doc.id,
                amount: doc.data().amount,
                classId: doc.data().classId,
                classType: doc.data().classType,
                courseName: doc.data().courseName,
                dayAttend: doc.data().dayAttend,
                classDiscount: doc.data().classDiscount,
                endDate: doc.data().endDate,
                finishTime: doc.data().finishTime,
                firstName: doc.data().firstName,

                invoiceNo: doc.data().invoiceNo,
                lastName: doc.data().lastName,
                level: doc.data().level,
                rate: doc.data().rate,
                classQty: doc.data().classQty,
                studentId: doc.data().studentId,
                userId: doc.data().userId,
                startDate: doc.data().startDate,
                startTime: doc.data().startTime,
                teacherAtclass: doc.data().teacherAtclass,

                wages: doc.data().wages,
                transactionTime: doc.data().transactionTime,
              };
              this.coursesActive.push(course);
            });
          });
      }
    },

    invoiceDetail(detail) {
      console.log(detail);
      this.modal = null;
      this.disabled = 1;
      this.item = detail;
      this.carts = detail.productDetail;

      // db.collection("invoiceData")
      //   .where("invoiceNo", "==", detail.invoiceNo)
      //   .onSnapshot((querySnapshot) => {
      //     this.coursesActive = [];
      //     querySnapshot.forEach((doc) => {
      //       let course = {
      //         docId: doc.id,

      //         amount: doc.data().amount,
      //         classId: doc.data().classId,
      //         classType: doc.data().classType,
      //         courseName: doc.data().courseName,
      //         dayAttend: doc.data().dayAttend,
      //         classDiscount: doc.data().classDiscount,
      //         endDate: doc.data().endDate,
      //         finishTime: doc.data().finishTime,
      //         firstName: doc.data().firstName,
      //         invoiceNo: doc.data().invoiceNo,
      //         lastName: doc.data().lastName,
      //         level: doc.data().level,
      //         rate: doc.data().rate,
      //         classQty: doc.data().classQty,
      //         startDate: doc.data().startDate,
      //         startTime: doc.data().startTime,
      //         teacherAtclass: doc.data().teacherAtclass,
      //         wages: doc.data().wages,
      //         transactionTime: doc.data().transactionTime,

      //         // courseTemplateName: this.cName,
      //         // courseTemplateType: this.cType,
      //         // courseTemplateLevel: this.cLevel,
      //         // courseTemplateRate: this.cRate,
      //         // courseTemplateTeacher: this.cTeacher,
      //         // courseTemplateDay: this.cDay,
      //       };
      //       this.coursesActive.push(course);
      //     });
      //   });
    },

    getInvoiceData() {
      var today = moment(Date.now()).format("DD/MM/YYYY");
      // moment().toDate().getDate()
      console.log(today);
      db.collection("invoiceData")
        // .where("invoiceTime", "==", today)
        .orderBy("invoiceNo", "desc")
        .onSnapshot((querySnapshot) => {
          this.itemDatas = [];
          querySnapshot.forEach((doc) => {
            let Item = {
              userId: doc.data().userId,
              docId: doc.id,

              confirm: doc.data().confirm,
              paid: doc.data().paid,
              print: doc.data().print,

              bankDetail: doc.data().bankDetail,
              canUpdate: doc.data().canUpdate,
              courseDetail: doc.data().courseDetail,
              fee: doc.data().fee,
              firstName: doc.data().firstName,
              grandTotal: doc.data().grandTotal,
              invDayOfMonth: doc.data().invDayOfMonth,
              invDayOfWeek: doc.data().invDayOfWeek,
              invMonth: doc.data().invMonth,
              invYear: doc.data().invYear,

              invoiceNo: doc.data().invoiceNo,
              invoiceTime: doc.data().invoiceTime,
              invoiceTimestamp: doc.data().invoiceTimestamp,
              lastName: doc.data().lastName,
              nickName: doc.data().nickName,
              note: doc.data().note,
              other: doc.data().other,
              pSubtotal: doc.data().pSubtotal,
              payBy: doc.data().payBy,
              payforDetail: doc.data().payforDetail,

              paymentFor: doc.data().paymentFor,
              paymentType: doc.data().paymentType,
              productDetail: doc.data().productDetail,
              studentId: doc.data().studentId,
              subTotal: doc.data().subTotal,
              transactionTime: moment(doc.data().transactionTime).format(
                "DD/MM/YY HH:mm"
              ),
              // transactionTime:doc.data().transactionTime,
            };

            // console.log(Item);
            this.itemDatas.push(Item);
            console.log('From Itemdatas');
            console.log(this.itemDatas);
          });
        });
    },

    // async getCourseTemplate() {
    //   try {
    //     this.$store.state.show = true;
    //     const doc = await db.collection("courseTemplate").doc("detail").get();
    //     if (doc.empty) {
    //       console.log("No matching documents.");
    //       return;
    //     }
    //     this.cName = doc.data().courseName;
    //     this.cType = doc.data().courseType;
    //     this.cLevel = doc.data().level;
    //     this.cRate = doc.data().rate;
    //     this.cTeacher = doc.data().teacher;

    //     // console.log(this.cTeacher);
    //     // this.addNewItem();
    //     this.$store.state.show = false;
    //   } catch (err) {
    //     Swal.fire({
    //       title: "เกิดข้อผิดพลาดที่ระบบ",
    //       text: "ไม่สามารถดึงข้อมูล course เรียนได้ กรุณาลองใหม่อีกครั้ง",
    //       icon: "warning",
    //       confirmButtonColor: "#FF0000",
    //       confirmButtonText: "ตกลง",
    //     });
    //     this.$store.state.show = false;
    //   }
    // },

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

    getClassroom() {
      try {
        this.$store.state.show = true;
        var date = moment().isoWeekday();
        // console.log(date);
        db.collection("classroom")
          // .where("day.dayNum", "==", date)
          .orderBy("createdAt", "desc")
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
                dayAttend: doc.data().dayAttend,
                endDate: moment(parseInt(doc.data().endDate)).format("ll"),
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

    getEditPassword() {
      db.collection("passEdit")
        .doc("detail")
        .onSnapshot((doc) => {
          this.editPass = doc.data().password;
        });
    },

    // *** End ReadData *** //
  },

  mounted() {
    window.scrollTo(0, 0);
  },

  created() {
    this.getInvoiceData();
    // this.getCourseTemplate();
    this.getProducts();
    this.getClassroom();
    this.getEditPassword();
  },

  computed: {
    // dateFormat() {
    //   return moment(this.startDate).format("DD/MM/YYYY");
    // },

    subTotal() {
      var total = this.coursesActive.reduce((accumulator, item) => {
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

<style lang="scss" scoped>
// .color{
//   background-color:floralwhite);
// }
</style>
