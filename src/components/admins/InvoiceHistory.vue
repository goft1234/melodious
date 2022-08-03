<template>
  <div class="incomeDay">
    <div class="my-3">
        <!-- <h4 class="text-center text-success mb-4">ลงข้อมูลสินค้า</h4> -->
        <h5 class="d-inline-block text-success"></h5>
        <router-link
        to="/admin/account/incomeday"
          class="btn btn-success d-inline-block float-right px-1 "
          data-toggle="modal"
          data-target="#product"
        >
          ย้อนกลับ
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
            <div v-else class="btn btn-warning" @click="editItem(props.row)">
              <!-- data-toggle="modal"
              data-target="#invoiceModal" -->
              <i class="fas fa-edit"></i>
            </div>
          </span>
          <span v-else-if="props.column.field == 'delete'">
            <div class="btn btn-danger" data-toggle="modal" data-target="#Item">
              <i class="fas fa-trash-alt"></i>
            </div>
          </span>
          <span v-else>
            {{ props.formattedRow[props.column.field] }}
          </span>
        </template>
      </vue-good-table>
    </div>

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
                    <div
                      class="mt-3 p-3"
                      style="background: rgb(242, 242, 242)"
                      v-for="(course, index) in courses"
                      :key="course.uid"
                    >
                      <div class="row">
                        <div class="col-lg-12">
                          <h5 class="mt-4 text-center">
                            <b class="text-success"
                              >วิชา {{ course.courseName }}
                              {{ course.classType }}({{ course.level }})</b
                            >
                          </h5>
                          <div class="mb-1 float-right">
                            <button
                              type="button"
                              @click="deleteItem(index, course.uid)"
                              class="btn btn-danger btn-circle btn-sm"
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
                            <vue-single-select
                              v-model="course.courseName"
                              :options="course.courseTemplateName"
                              placeholder="เลือกวิชาเรียน"
                              :disabled="disabled == 1"
                            ></vue-single-select>
                          </div>
                        </div>

                        <div class="col-lg-6">
                          <div class="form-group">
                            <label for="nickName" class="text-success"
                              >รูปแบบการเรียน</label
                            >
                            <vue-single-select
                              v-model="course.classType"
                              :options="course.courseTemplateType"
                              placeholder="รูปแบบการเรียน"
                              :disabled="disabled == 1"
                            ></vue-single-select>
                          </div>
                        </div>

                        <div class="col-lg-6">
                          <div class="form-group">
                            <label for="namePrefix" class="text-success"
                              >Level ที่ลงเรียน</label
                            >
                            <vue-single-select
                              v-model="course.level"
                              :options="course.courseTemplateLevel"
                              placeholder="เลือกระดับที่เรียน"
                              :disabled="disabled == 1"
                            ></vue-single-select>
                          </div>
                        </div>

                        <div class="col-lg-6">
                          <div class="form-group">
                            <label for="nickName" class="text-success"
                              >ราคา/คอร์ส</label
                            >
                            <vue-single-select
                              v-model="course.price"
                              :options="course.courseTemplateRate"
                              placeholder="เลือก ราคา/คอร์ส"
                              :disabled="disabled == 1"
                            ></vue-single-select>
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
                                min="0"
                                v-model.trim="course.discount"
                                :disabled="disabled == 1"
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
                                v-model.trim="course.amount"
                                :disabled="disabled == 1"
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
                              v-model="course.teacherName"
                              :disabled="disabled == 1"
                            >
                              <option disabled value="">
                                เลือก อาจารย์รายวิชา
                              </option>
                              <option
                                v-for="(
                                  item, index
                                ) in course.courseTemplateTeacher"
                                :value="{
                                  teacherId: item.uid,
                                  teacherName: item.fullName,
                                }"
                                :key="index"
                              >
                                {{ item.fullName }}
                              </option>
                            </select>
                            <!-- <span> {{ course.teacherName }}</span> -->
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
                                v-model.trim="course.wages"
                                :disabled="disabled == 1"
                              />
                            </div>
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
                                v-model="course.finishTime"
                                locale="th"
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
                                v-model="course.startDate"
                                locale="th"
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
                                v-model="course.endDate"
                                locale="th"
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
                              v-model="course.day"
                              :disabled="disabled == 1"
                            >
                              <option disabled value="">
                                วันที่เลือกเรียน
                              </option>
                              <option
                                v-for="(
                                  item, index
                                ) in course.courseTemplateDay"
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
                              >จำนวนคอร์ส</label
                            >
                            <div class="form-group">
                              <input
                                type="number"
                                class="form-control"
                                placeholder="กรอกเป็นตัวเลข"
                                min="1"
                                v-model.trim="course.qty"
                                :disabled="disabled == 1"
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
                      compactMode
                    >
                      <template slot="table-row" slot-scope="props">
                        <span v-if="props.column.field == 'quantity'">
                          <h6>
                            {{ props.row.quantity - props.row.buyAmount }}
                          </h6>
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
                              v-for="(course, index) in courses"
                              :key="course.uid"
                              class="text-center"
                            >
                              <td>{{ course.courseName }}</td>
                              <td>{{ course.qty }}</td>
                              <td>{{ course.price }}</td>
                              <td>{{ course.discount }}</td>
                              <td>
                                {{
                                  course.qty * course.price - course.discount
                                }}
                              </td>
                              <td v-if="modal == 'edit'">
                                <button
                                  type="button"
                                  @click="deleteItem(index, course.uid)"
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
                            <!-- <input
                              type="text"
                              class="form-control"
                              id="usr"
                              v-model="transactionTime"
                            /> -->
                            <!-- <date-picker v-model.trim="transactionTime" :config="options" locale="th"></date-picker> -->
                            <!-- <Datepicker format="DD/MM/YYYY H:i:s"  v-model="transactionTime" @change="test(e)"></Datepicker> -->
                            <!-- <DatetimePicker></DatetimePicker> -->
                          </div>
                        </div>
                      </div>

                      <div class="row text-center">
                        <div class="col-md-12">
                          <button
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
  </div>
</template>

<script>
import { db } from "../../firebase";
import DateRangePicker from "vue2-daterange-picker";
//you need to import the CSS manually
import "vue2-daterange-picker/dist/vue2-daterange-picker.css";
import moment from "moment";
export default {
  name: "incomeDay",

  data() {
    return {
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
          label: "ชำระโดย",
          field: "payBy",
          type: "text",
        },
        {
          label: "inv.no",
          field: "invoiceNo",
          type: "text",
        },
        {
          label: "วันที่",
          field: "invoiceTime",
          type: "text",
        },
        {
          label: "จำนวน",
          field: "grandTotal",
          type: "text",
        },
        {
          label: "รายละเอียด",
          field: "detail",
          type: "text",
        },
        // {
        //   label: "แก้ไข",
        //   field: "edit",
        //   type: "text",
        // },
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

      course: {},
      courses: [],
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
    };
  },

  methods: {
    async confirmInvoice() {
      // console.log(this.item);
      // console.log(this.invoiceToDel);
      // let rand = Math.floor(Math.random() * 1000);
      // let uuid = this.invoiceToDel + rand;
      // console.log(uuid);
      // db.collection('courseActive').where('invoiceNo','==',this.invoiceToDel).delete()
      try {
        var batch = db.batch();
        this.courses.forEach(async (course) => {
          let data = {
            uid: course.uid,
            studentId: this.item.studentId,
            firstName: this.item.firstName,
            lastName: this.item.lastName,
            nickName: this.item.nickName,
            // mobilephone: this.item.mobilephone,
            courseName: course.courseName,
            amount: course.amount,
            classType: course.classType,
            invoiceNo: this.item.invoiceNo,

            day: course.day,
            discount: course.discount,
            finishTime: course.finishTime,
            level: course.level,
            price: course.price,
            qty: course.qty,
            startDate: moment(course.startDate).format("x"),
            endDate: moment(course.endDate).format("x"),
            startTime: course.startTime,
            wages: course.wages,
            teacherName: course.teacherName,
          };

          // console.log(data.uid);
          if (data.uid) {
            // console.log("มี" + data.uid);
            batch.update(db.collection("courseActive").doc(data.uid), data);
          } else {
            // console.log("inv.no " + this.invoiceToDel);
            let rand = Math.floor(Math.random() * 100000);
            let uuid = this.invoiceToDel + rand;
            data.uid = uuid;
            batch.set(db.collection("courseActive").doc(data.uid), data);
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
      try {
        this.courseInfo = [];
        this.courses.forEach((course) => {
          let data = {
            uid: course.uid,
            studentId: this.item.studentId,
            firstName: this.item.firstName,
            lastName: this.item.lastName,
            nickName: this.item.nickName,
            // mobilephone: this.item.mobilephone,
            courseName: course.courseName,
            amount: course.amount,
            classType: course.classType,
            invoiceNo: this.item.invoiceNo,

            day: course.day,
            discount: course.discount,
            finishTime: course.finishTime,
            level: course.level,
            price: course.price,
            qty: course.qty,
            startDate: moment(course.startDate).format("x"),
            endDate: moment(course.endDate).format("x"),
            startTime: course.startTime,
            wages: course.wages,
            teacherName: course.teacherName,
          };

          this.courseInfo.push(data);
        });

        console.log(this.item);
        let invoiceData = {
          uid: this.item.uid,
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
          transactionTime: this.item.transactionTime,
          invoiceTime: moment(Date.now()).format("DD/MM/YYYY"),
          invoiceTimestamp: moment(Date.now()).format("x"),
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
        // this.updateInvoiceId();
      } catch (err) {
        console.log(err);
        Swal.fire({
          title: "Add Course เกิดข้อผิดพลาด",
          text: "เกิดข้อผิดพลาดบางอย่าง กรุณารอและทำรายการใหม่",
          icon: "error",
          confirmButtonColor: "#FF0000",
          confirmButtonText: "ตกลง",
        });
      }
    },

    async deleteItem(index, docId) {
      // console.log(docId);
      this.courses.splice(index, 1);
      let del = await db
        .collection("courseActive")
        .doc(docId)
        .delete()
        .then(() => {
          Swal.fire({
            title: "ACTION SUCCESS",
            text: "ลบคอร์สเรียบร้อย",
            icon: "success",
            confirmButtonColor: "#30855c",
            confirmButtonText: "ตกลง",
          });

          this.deleteCourse();
        })
        .catch((error) => {
          console.error("Error removing document: ", error);
        });
    },

    openEditModal(detail) {
      // console.log("แก้ไขได้ป่าว",detail.update);
      db.collection("invoiceData")
        .doc(detail.docId)
        .onSnapshot((doc) => {
          console.log("แก้ไขได้ป่าว", doc.data().canUpdate);
          this.allow = doc.data().canUpdate ;
        });

        if(this.allow == true){
          this.invoiceToDel = detail.invoiceNo;
      this.item = detail;
      this.modal = "edit";
      this.disabled = 0;
      $("#invoiceModal").modal("show");
      this.carts = detail.productDetail;

      db.collection("courseActive")
        .where("invoiceNo", "==", detail.invoiceNo)
        .onSnapshot((querySnapshot) => {
          this.courses = [];
          querySnapshot.forEach((doc) => {
            let course = {
              uid: doc.id,
              amount: doc.data().amount,
              classType: doc.data().classType,
              courseName: doc.data().courseName,
              day: doc.data().day,
              discount: doc.data().discount,
              endDate: doc.data().endDate,
              finishTime: doc.data().finishTime,
              level: doc.data().level,
              price: doc.data().price,
              qty: doc.data().qty,
              startDate: doc.data().startDate,
              startTime: doc.data().startTime,
              teacherName: doc.data().teacherName,
              wages: doc.data().wages,

              courseTemplateName: this.cName,
              courseTemplateType: this.cType,
              courseTemplateLevel: this.cLevel,
              courseTemplateRate: this.cRate,
              courseTemplateTeacher: this.cTeacher,
              courseTemplateDay: this.cDay,
            };
            this.courses.push(course);
          });
        });
        }
    },

    async editItem(detail) {
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

        batch.commit().then(()=> {
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
          title: "เกิดข้อผิดพลาด",
          text: "ไม่สามารถเข้าทำการแก้ไขข้อมูลได้ กรุณาลองใหม่อีกครั้ง",
          icon: "error",
          confirmButtonColor: "#FF0000",
          confirmButtonText: "ตกลง",
        });
      }
    },

    invoiceDetail(detail) {
      this.disabled = 1;
      this.item = detail;
      this.carts = detail.productDetail;

      db.collection("courseActive")
        .where("invoiceNo", "==", detail.invoiceNo)
        .onSnapshot((querySnapshot) => {
          this.courses = [];
          querySnapshot.forEach((doc) => {
            let course = {
              uid: doc.id,
              amount: doc.data().amount,
              classType: doc.data().classType,
              courseName: doc.data().courseName,
              day: doc.data().day,
              discount: doc.data().discount,
              endDate: doc.data().endDate,
              finishTime: doc.data().finishTime,
              level: doc.data().level,
              price: doc.data().price,
              qty: doc.data().qty,
              startDate: doc.data().startDate,
              startTime: doc.data().startTime,
              teacherName: doc.data().teacherName,
              wages: doc.data().wages,

              courseTemplateName: this.cName,
              courseTemplateType: this.cType,
              courseTemplateLevel: this.cLevel,
              courseTemplateRate: this.cRate,
              courseTemplateTeacher: this.cTeacher,
              courseTemplateDay: this.cDay,
            };
            this.courses.push(course);
          });
        });
    },

    addNewItem() {
      let course = {
        amount: "",
        classType: "",
        courseName: "",
        day: "",
        discount: "",
        endDate: "",
        finishTime: "",
        level: "",
        price: "",
        qty: "",
        startDate: "",
        startTime: "",
        teacherName: "",
        wages: "",

        courseTemplateName: this.cName,
        courseTemplateType: this.cType,
        courseTemplateLevel: this.cLevel,
        courseTemplateRate: this.cRate,
        courseTemplateTeacher: this.cTeacher,
        courseTemplateDay: this.cDay,
      };
      this.courses.push(course);
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

    getData() {
      var today = moment(Date.now()).format("DD/MM/YYYY");
      // moment().toDate().getDate()
      console.log(today);
      db.collection("invoiceHistory")
        .orderBy("invoiceNo", "desc")
        .onSnapshot((querySnapshot) => {
          this.itemDatas = [];
          querySnapshot.forEach((doc) => {
            let Item = {
              uid: doc.data().uid,
              bankDetail: doc.data().bankDetail,
              studentId: doc.data().studentId,
              firstName: doc.data().firstName,
              lastName: doc.data().lastName,
              nickName: doc.data().nickName,
              invoiceNo: doc.data().invoiceNo,
              paymentType: doc.data().paymentType,
              courseDetail: doc.data().courseDetail,
              productDetail: doc.data().productDetail,

              pSubtotal: doc.data().pSubtotal,
              subTotal: doc.data().subTotal,
              grandTotal: doc.data().grandTotal,
              fee: doc.data().fee,
              payforDetail: doc.data().payforDetail,
              invoiceTime: doc.data().invoiceTime,
              note: doc.data().note,
              payBy: doc.data().payBy,
              paymentFor: doc.data().paymentFor,
              transactionTime: doc.data().transactionTime,

              other: doc.data().other,
              docId: doc.id,
              canUpdate : doc.data().canUpdate,
            };
            this.itemDatas.push(Item);
            console.log("itemDatas  " + this.itemDatas);
          });
        });
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

        // console.log(this.cTeacher);
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

    addToCart(product) {
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

    deleteProduct(index, item) {
      var batch = db.batch();
      this.carts.splice(index, 1);

      var newQty = this.newQty + parseInt(item.buyAmount);
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
        console.log(this.carts);
      });
      // console.log(newQty);
      // batch.update(db.collection("products").doc(item.pID), {
      //   quantity: newQty,
      // });
    },
  },

  mounted() {
    window.scrollTo(0, 0);
  },

  created() {
    this.getData();
    this.getCourseTemplate();
    this.getProducts();
  },

  computed: {
    dateFormat() {
      return moment(this.startDate).format("DD/MM/YYYY");
    },

    subTotal() {
      var total = this.courses.reduce((accumulator, item) => {
        return accumulator + item.price * item.qty - item.discount;
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
