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
          :rows="invoiceDetails"
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
                v-if="props.row.canUpdate"
                class="btn btn-info"
                data-toggle="modal"
                data-target="#paidModal"
                @click="paymentDetail(props.row)"
              >
                <i class="fas fa-money-check-alt"></i>
              </div>
              <div
                v-else
                class="btn btn-secondary"
                @click="canUpdateStatus(props.row)"
              >
                <i class="fas fa-money-check-alt"></i>
              </div>
            </span>
            <span v-else-if="props.column.field == 'confirm'">
              <div v-if="props.row.confirm == 0" class="btn btn-danger">
                <i class="fas fa-times-circle"></i>
              </div>

              <div
                v-else-if="props.row.confirm == 1"
                @click="confirmMethods(props.row)"
                class="btn btn-info"
              >
                <i class="fas fa-file-download"></i>
              </div>

              <div v-else class="btn btn-success">
                <i class="fas fa-check-circle"></i>
              </div>
            </span>
            <span v-else-if="props.column.field == 'print'">
              <div
                v-if="props.row.print"
                class="btn btn-info"
                @click="summarizeInvoice(props.row)"
              >
                <i class="fas fa-print"></i>
              </div>
              <div v-else class="btn btn-danger">
                <i class="fas fa-times-circle"></i>
              </div>
            </span>
            <span v-else-if="props.column.field == 'edit'">
              <div
                v-if="props.row.paymentType == 'ต่อคอร์ส'"
                class="btn btn-warning disabled"
              >
                <i class="fas fa-edit"></i>
              </div>
              <div
                v-else
                class="btn btn-warning"
                @click="openEditModal(props.row)"
              >
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
                <h5>Inv.No. {{ invoiceToPrint.invoiceNo }}</h5>
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
                  ชื่อ - นามสกุล {{ invoiceToPrint.firstName }}
                  {{ invoiceToPrint.lastName }} <br />
                </h6>
              </td>
              <td class="text-left">
                <h6>ชื่อเล่น {{ invoiceToPrint.nickName }}</h6>
              </td>
              <td class="text-center">
                <h6>รหัสนักเรียน : {{ invoiceToPrint.studentId }}</h6>
              </td>
              <td class="text-right">
                <h6>วันที่ {{ invoiceToPrint.day }}</h6>
              </td>
            </tr>
          </table>
          <br />
          <table width="100%" class="mb-2">
            <tr class="text-left">
              <td colspan="4">
                (1):เพื่อชำระค่าเรียน <b>{{ invoiceToPrint.paymentType }}</b>
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
              v-for="(course, index) in invoiceToPrint.courseDetail"
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
                {{ invoiceToPrint.subTotal }}
              </td>
            </tr>
          </table>
          <p><br /></p>

          <div class="mb-2">
            (2):เพื่อชำระค่า
            <span
              v-for="(item, index) in invoiceToPrint.paymentFor"
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
            <tr
              v-for="(item, index) in invoiceToPrint.productDetail"
              :key="index"
            >
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
                {{ invoiceToPrint.pSubtotal }}
              </td>
            </tr>
          </table>
          <p><br /></p>

          <div class="mb-2">
            ชำระเงินโดย (Pay by)
            <span
              v-for="(item, index) in invoiceToPrint.payBy"
              :key="index"
              colspan="4"
              style="display: inline-block"
            >
              <b v-if="item == 'เงินสด'" class="text-left pl-2">เงินสด ,</b>
              <b v-if="item == 'เครดิตการ์ด'" class="text-left pl-2"
                >เครดิตการ์ด ,</b
              >
              <b v-if="item == 'โอนผ่านธนาคาร'" class="text-left pl-2">{{
                invoiceToPrint.bankDetail
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
              <td>{{ invoiceToPrint.subTotal }}</td>
              <td>{{ invoiceToPrint.pSubtotal }}</td>
              <td>{{ invoiceToPrint.fee }}</td>
              <td>{{ invoiceToPrint.grandTotal }}</td>
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
              <td colspan="4">หมายเหตุ {{ invoiceToPrint.note }}</td>
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
                <h5>Inv.No. {{ invoiceToPrint.invoiceNo }}</h5>
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
                  ชื่อ - นามสกุล {{ invoiceToPrint.firstName }}
                  {{ invoiceToPrint.lastName }} <br />
                </h6>
              </td>
              <td class="text-left">
                <h6>ชื่อเล่น {{ invoiceToPrint.nickName }}</h6>
              </td>
              <td class="text-center">
                <h6>รหัสนักเรียน : {{ invoiceToPrint.studentId }}</h6>
              </td>
              <td class="text-right">
                <h6>วันที่ {{ invoiceToPrint.day }}</h6>
              </td>
            </tr>
          </table>
          <br />
          <table width="100%" class="mb-2">
            <tr class="text-left">
              <td colspan="4">
                (1):เพื่อชำระค่าเรียน <b>{{ invoiceToPrint.paymentType }}</b>
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
              v-for="(course, index) in invoiceToPrint.courseDetail"
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
                {{ invoiceToPrint.subTotal }}
              </td>
            </tr>
          </table>
          <p><br /></p>

          <div class="mb-2">
            (2):เพื่อชำระค่า
            <span
              v-for="(item, index) in invoiceToPrint.paymentFor"
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
            <tr
              v-for="(item, index) in invoiceToPrint.productDetail"
              :key="index"
            >
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
                {{ invoiceToPrint.pSubtotal }}
              </td>
            </tr>
          </table>
          <p><br /></p>

          <div class="mb-2">
            ชำระเงินโดย (Pay by)
            <span
              v-for="(item, index) in invoiceToPrint.payBy"
              :key="index"
              colspan="4"
              style="display: inline-block"
            >
              <b v-if="item == 'เงินสด'" class="text-left pl-2">เงินสด ,</b>
              <b v-if="item == 'เครดิตการ์ด'" class="text-left pl-2"
                >เครดิตการ์ด ,</b
              >
              <b v-if="item == 'โอนผ่านธนาคาร'" class="text-left pl-2">{{
                invoiceToPrint.bankDetail
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
              <td>{{ invoiceToPrint.subTotal }}</td>
              <td>{{ invoiceToPrint.pSubtotal }}</td>
              <td>{{ invoiceToPrint.fee }}</td>
              <td>{{ invoiceToPrint.grandTotal }}</td>
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
              <td colspan="4">หมายเหตุ {{ invoiceToPrint.note }}</td>
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
    </div>

    <!-- Start Detail modal -->
    <div class="modal fade" id="invoiceModal">
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <!-- Modal Header -->
          <div class="modal-header text-center">
            <h4 class="modal-title w-100 text-center text-success">
              รายละเอียดใบชำระเงิน
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
                        <span v-else-if="props.column.field == 'classDiscount'">
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
                            v-model.trim="invoiceData.paymentType"
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
                            v-model.trim="invoiceData.paymentType"
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
                              v-for="(
                                course, index
                              ) in invoiceData.courseDetail"
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
                                v-model.trim="invoiceData.paymentFor"
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
                                v-model.trim="invoiceData.paymentFor"
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
                                  v-model.trim="invoiceData.paymentFor"
                                  :disabled="disabled == 1"
                                />
                              </div>
                            </div>
                            <input
                              type="text"
                              class="form-control"
                              placeholder="กรอกรายการชำระ"
                              v-model.trim="invoiceData.payforDetail"
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
                              v-model.trim="invoiceData.fee"
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
                              <td>{{ invoiceData.fee }}</td>
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
                      v-model.trim="invoiceData.paymentType"
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
                      v-model.trim="invoiceData.paymentType"
                      :disabled="disabled == 1"
                    />ต่อคอร์สเรียน
                  </label>
                </div>
                <div class="table-responsive">
                  <table class="table table-bordered table-striped text-center">
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
                        v-for="(course, index) in invoiceData.courseDetail"
                        :key="course.docId"
                        class="text-center"
                      >
                        <td>{{ course.courseName }}</td>
                        <td>{{ course.classQty }}</td>
                        <td>{{ course.rate }}</td>
                        <td>{{ course.classDiscount }}</td>
                        <td>
                          {{
                            course.classQty * course.rate - course.classDiscount
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
                <h5 class="text-center text-success mt-3">หนังสือ - อุปกรณ์</h5>
                <h6 class="ml-3 mt-3 text-success">เพื่อชำระ (Payment for)</h6>
                <div class="row mx-auto">
                  <div class="col-md-3">
                    <div class="form-check-inline">
                      <label class="form-check-label">
                        <input
                          type="checkbox"
                          class="form-check-input"
                          value="หนังสือเรียน"
                          v-model.trim="invoiceData.paymentFor"
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
                          v-model.trim="invoiceData.paymentFor"
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
                            v-model.trim="invoiceData.paymentFor"
                            :disabled="disabled == 1"
                          />
                        </div>
                      </div>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="กรอกรายการชำระ"
                        v-model.trim="invoiceData.payforDetail"
                        :disabled="disabled == 1"
                      />
                    </div>
                  </div>
                </div>

                <div class="table-responsive">
                  <table class="table table-bordered table-striped text-center">
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
                        v-model.trim="invoiceData.fee"
                        :disabled="disabled == 1"
                      />
                    </div>
                  </div>
                </div>
                <div class="table-responsive">
                  <table class="table table-bordered table-striped text-center">
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
                        <td>{{ invoiceData.fee }}</td>
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
                          v-model.trim="invoiceData.payBy"
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
                          v-model.trim="invoiceData.payBy"
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
                            v-model.trim="invoiceData.payBy"
                            :disabled="disabled == 1"
                          />
                        </div>
                      </div>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="โอนผ่านบัญชีธนาคาร"
                        v-model.trim="invoiceData.bankDetail"
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
                        v-model.trim="invoiceData.note"
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
                        v-model="invoiceData.transactionTime"
                        :disabled="disabled == 1"
                      />
                    </div>
                    <!-- {{item.transactionTime}} -->
                  </div>
                  <!-- v-if="modal == 'edit'" -->
                  <!-- <div class="col-md-12">
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
                    </div> -->
                </div>
              </div>
            </div>
            <!--End แสดงเพื่อ ดูรายลเอียดอย่างเดียว set modal = null -->
          </div>

          <!-- Modal footer -->
          <div class="modal-footer">
            <button
              v-if="modal == 'edit'"
              class="btn btn-warning no-print px-3"
              @click="updateInvoice(invoiceData)"
            >
              <i class="fas fa-check-circle"></i> แก้ไข
            </button>
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
                        v-model.trim="invoiceData.payBy"
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
                        v-model.trim="invoiceData.payBy"
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
                          v-model.trim="invoiceData.payBy"
                        />
                      </div>
                    </div>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="โอนผ่านบัญชีธนาคาร"
                      v-model.trim="invoiceData.bankDetail"
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
                      v-model.trim="invoiceData.note"
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
                      v-model="invoiceData.transactionTime"
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>

          <!-- Modal footer -->
          <div class="modal-footer">
            <button
              @click="addPaymentDt(invoiceData)"
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
      ],
      // itemDatas: [],
      stdProfile: {},
      invoiceData: [],
      coursesActive: [],
      modal: null,
      disabled: 0,
      carts: [],
      invoiceDetails: [],
      products: [],
      classrooms: [],
      editPass: "",
      invoiceToPrint: {},
      // paymentDt: {
      //   note: "",
      //   payBy: [],
      //   bankDetail: "",
      //   transactionTime: "",
      //   docId: "",
      //   paid: "",
      // },
    };
  },

  mounted() {},

  methods: {
    // *** Event **** //
    buyCourse(data) {
      // console.log(data);
      // console.log(this.stdProfile);
      let remain = data.amount * data.classQty;
      console.log(remain);
      let courseData = {
        amount: data.amount,
        classDiscount: data.classDiscount,
        classId: data.classId,
        classQty: data.classQty,
        classType: data.classType,
        courseName: data.courseName,
        dayAttend: data.dayAttend,
        endDate: moment(data.endDate).format("x"),
        finishTime: data.finishTime,
        level: data.level,
        nowDate: Date.now(),
        rate: data.rate,
        remain: remain,
        startDate: moment(data.startDate).format("x"),
        startTime: data.startTime,
        studentAtclass: data.studentAtclass,
        teacherAtclass: data.teacherAtclass,
        wages: data.wages,
        userId: this.stdProfile.userId,
        classId: data.classId,
        studentId: this.stdProfile.studentId,
        firstName: this.stdProfile.firstName,
        lastName: this.stdProfile.lastName,
        nickName: this.stdProfile.nickName,
        image: this.stdProfile.image,
        stdMobile: this.stdProfile.stdMobile,
      };

      this.invoiceData.courseDetail.push(courseData);

      console.log(this.invoiceData.courseDetail);
      Swal.fire({
        title: "SUCCESS",
        text: "เพิ่มคอร์สเรียนแล้วเรียบร้อย",
        icon: "success",
        confirmButtonColor: "#30855c",
        confirmButtonText: "ตกลง",
      });
    },

    deleteCourse(index, course) {
      // console.log(course);
      // index มีค่า = ตัวแหน่งใน array
      this.invoiceData.courseDetail.splice(index, 1);
      Swal.fire({
        title: "ACTION SUCCESS",
        text: "ลบคอร์สเรียบร้อย",
        icon: "success",
        confirmButtonColor: "#30855c",
        confirmButtonText: "ตกลง",
      });
    },

    addProductToCart(product) {
      console.log(product);
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
        title: "Delete From Cart",
        text: "ลบสินค้าออกจากตระกร้าเรียบร้อยแล้ว",
        icon: "success",
        confirmButtonColor: "#30855c",
        confirmButtonText: "ตกลง",
      });
    },

    async summarizeInvoice(invoice) {
      var courseTotal = invoice.courseDetail.reduce((acc, item) => {
        return acc + parseInt(item.classQty);
      }, 0);

      var classPriceTotal = invoice.courseDetail.reduce((acc, item) => {
        return (
          acc +
          parseInt(item.classQty) * parseInt(item.rate) -
          parseInt(item.classDiscount)
        );
      }, 0);

      var bookTotal = invoice.productDetail
        .filter(({ pMode }) => pMode == "หนังสือ")
        .reduce((acc, item) => {
          return (
            acc +
            parseInt(item.price) * parseInt(item.buyAmount) -
            item.pDiscount
          );
        }, 0);

      var instrumentTotal = invoice.productDetail
        .filter(({ pMode }) => pMode == "อุปกรณ์ดนตรี")
        .reduce((acc, item) => {
          return (
            acc +
            parseInt(item.price) * parseInt(item.buyAmount) -
            item.pDiscount
          );
        }, 0);

      var equipmentTotal = invoice.productDetail
        .filter(({ pMode }) => pMode == "อุปกรณ์การเรียน")
        .reduce((acc, item) => {
          return (
            acc +
            parseInt(item.price) * parseInt(item.buyAmount) -
            item.pDiscount
          );
        }, 0);

      var examTotal = invoice.productDetail
        .filter(({ pMode }) => pMode == "ค่าสอบ")
        .reduce((acc, item) => {
          return (
            acc +
            parseInt(item.price) * parseInt(item.buyAmount) -
            item.pDiscount
          );
        }, 0);

      var otherTotal = invoice.productDetail
        .filter(({ pMode }) => pMode == "อื่นๆ")
        .reduce((acc, item) => {
          return (
            acc +
            parseInt(item.price) * parseInt(item.buyAmount) -
            item.pDiscount
          );
        }, 0);

      let sumTotal = parseInt(classPriceTotal)+parseInt(invoice.fee)
      +parseInt(bookTotal)+parseInt(instrumentTotal)+parseInt(equipmentTotal)+parseInt(examTotal)
      +parseInt(otherTotal);

      let result = {
        classPriceTotal: parseInt(classPriceTotal),
        courseTotal: courseTotal,
        fee: parseInt(invoice.fee),
        book: parseInt(bookTotal),
        instrumentTotal: parseInt(instrumentTotal),
        equipmentTotal: parseInt(equipmentTotal),
        examTotal: parseInt(examTotal),
        otherTotal: parseInt(otherTotal),
        sumTotal : parseInt(sumTotal),
        invDayOfMonth: moment().date(),
        invMonth: moment().month() + 1,
        invYear: moment().year(),
      };

      try {
        if (invoice.summarize == false) {
          let today = moment().add("543", "year").format("DD-MM-YYYY");
          var ref = db.collection("summarize").doc(today);
          let doc = await ref.get();
          if (!doc.exists) {
            await ref.set(result, { merge: true });
          } else {
            console.log(doc.data().book);
            let data = {
              classPriceTotal:
                doc.data().classPriceTotal + result.classPriceTotal,
              book: doc.data().book + result.book,
              courseTotal: doc.data().courseTotal + result.courseTotal,
              examTotal: doc.data().book + result.examTotal,
              fee: doc.data().fee + result.fee,
              instrumentTotal:
                doc.data().instrumentTotal + result.instrumentTotal,
              equipmentTotal: doc.data().equipmentTotal + result.equipmentTotal,
              otherTotal: doc.data().otherTotal + result.otherTotal,
              sumTotal : doc.data().sumTotal  + result.sumTotal,  
              invDayOfMonth: result.invDayOfMonth,
              invMonth: result.invMonth,
              invYear: result.invYear,
            };
            await ref.set(data);
          }
          await db.collection('invoiceData').doc(invoice.docId).update({summarize : true})
          this.print(invoice)
        } else {
          this.print(invoice)
        }
      } catch (error) {
        console.log("Transaction failed: ", error);
      }
    },

    async print(invoice) {
      this.invoiceToPrint = invoice;
      setTimeout(() => {
        this.$htmlToPaper("InvPckPrint");
      }, 1000);
    },

    // *** updateData *** //
    async updateInvoice(invoiceData) {
      invoiceData.subTotal = this.subTotal;
      invoiceData.pSubtotal = this.pSubtotal;
      invoiceData.grandTotal = this.grandTotal;
      // console.log(invoiceData);
      try {
        this.$store.state.show = true;
        await db
          .collection("invoiceData")
          .doc(this.invoiceData.docId)
          .update(this.invoiceData);

        $("#invoiceModal").modal("hide");
        Swal.fire({
          title: "Success",
          text: "Update ข้อมูลเรียบร้อยแล้ว",
          icon: "success",
          confirmButtonColor: "#30855c",
          confirmButtonText: "ตกลง",
        });
        this.$store.state.show = false;
      } catch (err) {
        Swal.fire({
          title: "เกิดข้อผิดพลาดที่ระบบ",
          text: "ไม่สามารถUpdateได้ กรุณาลองใหม่อีกครั้ง",
          icon: "warning",
          confirmButtonColor: "#FF0000",
          confirmButtonText: "ตกลง",
        });
        this.$store.state.show = false;
      }
    },

    paymentDetail(detail) {
      console.log(detail);
      this.invoiceData = detail;
    },

    addPaymentDt(paymentDt) {
      console.log(paymentDt.confirm);
      let confirm;
      paymentDt.confirm == 2 ? (confirm = 2) : (confirm = 1);
      // console.log(confirm);
      try {
        db.collection("invoiceData").doc(paymentDt.docId).update({
          note: paymentDt.note,
          payBy: paymentDt.payBy,
          bankDetail: paymentDt.bankDetail,
          transactionTime: paymentDt.transactionTime,
          confirm: confirm,
          canUpdate: false,
        });
        Swal.fire({
          title: "SUCCESS",
          text: "บันทึกการชำระเงินเรียบร้อย",
          icon: "success",
          confirmButtonColor: "#30855c",
          confirmButtonText: "ตกลง",
        });
        $("#paidModal").modal("hide");
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
    },

    async canUpdateStatus(detail) {
      const { value: password } = await Swal.fire({
        title: "กรอก Password",
        input: "password",
        icon: "question",
        inputLabel: "Password",
        inputPlaceholder: "กรอกรหัสเข้าแก้ไข",
        showCancelButton: true,
        // cancelButtonColor: "#FF0000",
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

    // *** AddData *** //
    addToActiveCourse(invoiceData) {
      // console.log(invoiceData.courseDetail);
      try {
        var batch = db.batch();
        this.coursesActive = invoiceData.courseDetail;
        // console.log(this.coursesActive);
        this.coursesActive.forEach((item) => {
          let remain = item.amount * item.classQty;
          let data = {
            classId: item.classId,
            userId: item.userId,

            remain: remain,
            studentId: item.studentId,
            firstName: item.firstName,
            lastName: item.lastName,
            nickName: item.nickName,
            stdMobile: item.stdMobile,
            courseName: item.courseName,
            amount: item.amount,
            classType: item.classType,
            invoiceNo: invoiceData.invoiceNo,

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
            image: item.image,
          };

          batch.set(db.collection("courseActive").doc(), data);
        });

        this.coursesActive.forEach((item) => {
          // console.log(item.studentAtclass);
          let stdProfileInClass = {
            userId: item.userId,
            classId: item.classId,
            studentId: item.studentId,
            firstName: item.firstName,
            lastName: item.lastName,
            nickName: item.nickName,
            invoiceNo: invoiceData.invoiceNo,
            image: item.image,
            dateAtClass: Date.now(),
            stdMobile: item.stdMobile,
          };
          batch.update(db.collection("classroom").doc(item.classId), {
            student:
              firebase.firestore.FieldValue.arrayUnion(stdProfileInClass),
          });
        });

        this.carts = invoiceData.productDetail;
        // console.log(this.carts);
        this.carts.forEach((item) => {
          var newQty = item.quantity - item.buyAmount;
          batch.update(db.collection("products").doc(item.pID), {
            quantity: newQty,
          });
        });

        batch.update(db.collection("invoiceData").doc(invoiceData.docId), {
          confirm: 2,
          print: true,
        });

        batch.commit();
        Swal.fire({
          title: "SUCCESS",
          text: "เพิ่มคอร์สเรียนแล้วเรียบร้อย",
          icon: "success",
          confirmButtonColor: "#30855c",
          confirmButtonText: "ตกลง",
        });
        console.log("เพิ่มคอร์สเรียนเรียบร้อย");

        // this.addInvoice();
      } catch (err) {
        console.log(err);
      }
      // console.log('addTo activeCourse');
    },

    async addToRenevalCourse(invoiceData) {
      // console.log(invoiceData);
      try {
        var batch = db.batch();
        invoiceData.courseDetail.forEach(async (item) => {
          let remain = item.amount * item.classQty;
          // console.log(remain);
          // console.log(item.classId);
          let doc = await db.collection("courseActive").doc(item.classId).get();
          console.log(doc.data().remain + remain);
          let resultRemain = doc.data().remain + remain;
          let data = {
            remain: resultRemain,
          };
          console.log(data);
          await db.collection("courseActive").doc(item.classId).update(data);
        });

        this.carts = invoiceData.productDetail;
        this.carts.forEach((item) => {
          var newQty = item.quantity - item.buyAmount;
          batch.update(db.collection("products").doc(item.pID), {
            quantity: newQty,
          });
        });

        batch.update(db.collection("invoiceData").doc(invoiceData.docId), {
          confirm: 2,
          print: true,
        });

        await batch.commit();
        Swal.fire({
          title: "SUCCESS",
          text: "เพิ่มคอร์สเรียนแล้วเรียบร้อย",
          icon: "success",
          confirmButtonColor: "#30855c",
          confirmButtonText: "ตกลง",
        });
        console.log("เพิ่มคอร์สเรียนเรียบร้อย");
      } catch (err) {
        console.log(err);
      }
    },

    confirmMethods(invoiceData) {
      // console.log(paymentType);
      if (invoiceData.paymentType == "ต่อคอร์ส") {
        // console.log("ต่อคอร์ส");
        this.addToRenevalCourse(invoiceData);
      } else {
        this.addToActiveCourse(invoiceData);
        // console.log("ลงทะเบียนใหม่");
      }
    },

    // *** ReadData *** //
    invoiceDetail(detail) {
      // console.log(detail);
      this.modal = null;
      this.disabled = 1;
      this.carts = detail.productDetail;
      this.invoiceData = detail;
    },

    openEditModal(detail) {
      // console.log(detail);
      this.stdProfile = detail;
      this.modal = "edit";
      this.disabled = 0;
      this.carts = detail.productDetail;
      this.coursesActive = detail.courseDetail;
      this.invoiceData = detail;
      $("#invoiceModal").modal("show");
    },

    getInvoiceData() {
      var today = moment().add("543", "year").format("DD/MM/YYYY");
      // moment().toDate().getDate()
      console.log(today);
      db.collection("invoiceData")
        // .where("invoiceTime", "==", today)
        .orderBy("invoiceNo", "desc")
        .onSnapshot((querySnapshot) => {
          this.invoiceDetails = [];
          querySnapshot.forEach((doc) => {
            let invoiceDetail = {
              day: today,
              userId: doc.data().userId,
              docId: doc.id,

              confirm: doc.data().confirm,
              paid: doc.data().paid,
              print: doc.data().print,
              summarize: doc.data().summarize,

              bankDetail: doc.data().bankDetail,
              canUpdate: doc.data().canUpdate,
              courseDetail: doc.data().courseDetail,
              fee: doc.data().fee,
              firstName: doc.data().firstName,
              grandTotal: doc.data().grandTotal,
              image: doc.data().image,
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
              stdMobile: doc.data().stdMobile,
              subTotal: doc.data().subTotal,
              transactionTime: moment(doc.data().transactionTime).format(
                "DD/MM/YY HH:mm"
              ),
              // transactionTime:doc.data().transactionTime,
            };

            // console.log(Item);
            this.invoiceDetails.push(invoiceDetail);

            console.log("From Itemdatas");
            console.log(this.invoiceDetails);
          });
        });
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
              // console.log(this.classrooms);
            });
            this.$store.state.show = false;
          });
      } catch (err) {
        // console.log(err);
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
  },

  created() {
    this.getInvoiceData();
    this.getProducts();
    this.getClassroom();
    this.getEditPassword();
  },

  computed: {
    subTotal() {
      var total = this.coursesActive.reduce((accumulator, item) => {
        return accumulator + (item.rate * item.classQty - item.classDiscount);
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
      var total =
        this.subTotal + this.pSubtotal + parseInt(this.invoiceData.fee);
      return total;
    },
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
.fullscreen {
  margin: 0;
  top: 0;
  left: 0;
  width: 100% !important;
  height: 100% !important;
}
</style>
