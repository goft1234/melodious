<template>
  <div id="addcourse">
    <div class="my-3">
      <h4 class="text-center text-success mb-4">บันทึกรายจ่าย</h4>
      <div class="row">
          <div class="col-md-4"></div>
          <div class="col-md-4">
            <div class="card-deck text-center">
              <div class="card">
                <div class="card-body">
                  <div class="card-header bg-danger shadow">
                    <h5 class="text-light text-center">รายจ่ายทั้งหมด</h5>
                  </div>
                  <i class="fas fa-wallet mt-4 text-danger" style="font-size:50px"></i>
                  <h4 class="card-text my-4 text-danger text-center">
                    จำนวน {{ incomeTotal }} บาท
                  </h4>
                  <div class="card-header bg-danger shadow">
                    <h5 class="text-light text-center"></h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-4"></div>
        </div>
      <div class="row">
        <div class="col-12">
          <button
            @click="addNew"
            class="btn btn-success d-inline-block float-right px-3"
            data-toggle="modal"
            data-target="#modal1"
          >
            เพิ่มรายการ
          </button>
        </div>
      </div>
    </div>

    <div class="mt-3 shadow">
      <vue-good-table
        :columns="columns"
        :rows="expenseLists"
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
          <span v-if="props.column.field == 'edit'">
            <div
              class="btn btn-warning"
              @click="editExpense(props.row)"
              data-toggle="modal"
              data-target="#modal1"
            >
              <i class="fas fa-edit"></i>
            </div>
          </span>
          <span v-else-if="props.column.field == 'delete'">
            <div class="btn btn-danger" @click="deleteExpense(props.row)">
              <i class="fas fa-trash-alt"></i>
            </div>
          </span>
          <span v-else>
            {{ props.formattedRow[props.column.field] }}
          </span>
        </template>
      </vue-good-table>
    </div>

    <!--Start The Modal -->
    <div class="modal fade" id="modal1">
      <div class="modal-dialog modal-dialog-scrollable">
        <div class="modal-content">
          <!-- Modal Header -->
          <div class="modal-header">
            <h4
              v-if="modal == 'new'"
              class="modal-title w-100 text-center text-success"
            >
              แบบบันทึกรายจ่าย
            </h4>
            <h4
              v-if="modal == 'edit'"
              class="modal-title w-100 text-center text-warning"
            >
              แก้ไขวิชาเรียน
            </h4>
            <button type="button" class="close" data-dismiss="modal">
              &times;
            </button>
          </div>

          <!-- Modal body -->
          <div class="modal-body">
            <form v-on:submit.prevent>
              <h6 class="float-left text-success">วันที่</h6>
              <div class="input-group mb-2">
                <div class="input-group-prepend">
                  <span class="input-group-text">
                    <i class="fas fa-calendar-alt"></i>
                  </span>
                </div>
                <input
                  type="text"
                  v-model.trim="expenseList.date"
                  class="form-control"
                  placeholder=""
                  disabled
                />
              </div>

              <div class="form-group">
                <label for="courseType" class="text-success mt-2"
                  >หมวดหมู่</label
                >
                <div class="input-group mb-2">
                  <div class="input-group-prepend">
                    <span class="input-group-text">
                      <i class="fas fa-object-ungroup"></i>
                    </span>
                  </div>
                  <select
                    class="form-control"
                    id="courseType"
                    v-model="expenseList.type"
                  >
                    <option disabled value="">เลือกหมวดหมู่</option>
                    <option v-for="(item, index) in expenseMode" :key="index">
                      {{ item }}
                    </option>
                  </select>
                </div>
              </div>

              <div class="form-group">
                <label for="courseType" class="text-success mt-2">รายการ</label>
                <div class="input-group mb-2">
                  <div class="input-group-prepend">
                    <span class="input-group-text">
                      <i class="fas fa-list-alt"></i>
                    </span>
                  </div>
                  <input
                    type="text"
                    v-model.trim="expenseList.list"
                    class="form-control"
                    placeholder="กรอกรายการที่ต้องการบันทึก"
                  />
                </div>
              </div>

              <div class="form-group">
                <label for="courseType" class="text-success mt-2"
                  >จำนวนเงิน</label
                >
                <div class="input-group mb-2">
                  <div class="input-group-prepend">
                    <span class="input-group-text">
                      <i class="fas fa-dollar-sign"></i>
                    </span>
                  </div>
                  <input
                    type="number"
                    v-model.trim="expenseList.amount"
                    class="form-control"
                    placeholder="กรอกจำนวนเงิน"
                    min="0"
                  />
                </div>
              </div>
            </form>
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
              @click="summarizeExpense()"
              type="button"
              class="btn btn-success"
              v-if="modal == 'new'"
            >
              บันทึกข้อมูล
            </button>
            <button
              @click="updatecourse(course.couseId)"
              type="button"
              class="btn btn-warning"
              v-if="modal == 'edit'"
            >
              แก้ไข
            </button>
          </div>
        </div>
      </div>
    </div>
    <!--End The Modal -->
  </div>
</template>

<script>
import { db } from "../../firebase";
import moment from "moment";

export default {
  name: "addcourse",

  data() {
    return {
      columns: [
        {
          label: "วันที่",
          field: "date",
          type: "text",
        },
        {
          label: "ประเภท",
          field: "type",
          type: "text",
        },
        {
          label: "รายการ",
          field: "list",
          type: "text",
        },
        {
          label: "จำนวนเงิน",
          field: "amount",
          type: "text",
        },
        {
          label: "ลบ",
          field: "delete",
          type: "text",
        },
      ],

      modal: null,
      expenseTemplate: {
        // courseName: [],
        // courseType: [],
        // level: [],
        // rate: [],
      },
      expenseMode: [
        "สาธารณูปโภค",
        "เครื่องเขียน",
        "อุปกรณ์การสอน",
        "เครื่องใช้สำนักงาน",
        "โฆษณา",
        "ค่าสอนครู",
        "เงินเดือนเจ้าหน้าที่",
        "สวัสดิการครู/เจ้าหน้าที่",
        "ค่ารับรอง",
        "ธรรมเนียมธนาคาร",
        "ธรรมเนียมอื่นๆ",
        "เงินประกัน",
        "ค่าเช่า",
        "ค่าซ่อมบำรุง",
        "ค่าจ้างแรงงานทั่วไปรายครั้ง",
        "กิจกรรม/คอนเสิร์ต",
        "ค่าเดินทาง",
        "สอบเกรด",
        "ค่าเครื่องดนตรี",
      ],
      expenseLists: [],
      expenseList: {
        date: moment().add("543", "year").format("DD/MM/YYYY HH:mm"),
        type: "",
        list: "",
        amount: null,
        docId: "",
        timeStamp : moment().format('x'),
      },
    };
  },
  methods: {
    // getItemdataTemplate() {
    //   const Ref = db.collection("expenseTemplate");
    //   const unsub = Ref.onSnapshot(
    //     (docSnapshot) => {
    //       if (docSnapshot.empty) {
    //         console.log("No matching documents.");
    //         return;
    //       }
    //       docSnapshot.forEach((doc) => {
    //         this.expenseTemplate = doc.data();
    //         // console.log(doc.id, "=>", doc.data());
    //       });
    //     },
    //     (err) => {
    //       console.log(`Encountered error: ${err}`);
    //     }
    //   );
    // },

    // updateKeyword() {
    //   db.collection("expenseTemplate")
    //     .doc("detail")
    //     .set(this.expenseTemplate, { merge: true })
    //     .then(
    //       () => {
    //         Swal.fire({
    //           title: "อัพเดทเรียบร้อย",
    //           text: "อัพเดท template เรียบร้อย",
    //           icon: "success",
    //           confirmButtonColor: "#30855c",
    //           confirmButtonText: "ตกลง",
    //         });
    //         $("#expenseTemplate").modal("hide");
    //       }

    //       // { merge: true }
    //     );
    // },

    deleteExpense(doc) {
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
          db.collection("expenseTable")
            .doc(doc.docId)
            .delete()
            .then(() => {
              Swal.fire({
                title: "ทำการลบเรียบร้อย",
                text: "ได้ทำการลบข้อมูลเรียบร้อย",
                icon: "success",
                confirmButtonColor: "#30855c",
                confirmButtonText: "ตกลง",
              });
            });

            this.minusExpense(doc)
        }
      });
    },

    addNew() {
      this.modal = "new";
      this.reset();
    },

    reset() {
      this.expenseList = {
        date: moment().add("543", "year").format("DD/MM/YYYY HH:mm"),
        type: null,
        list: null,
        amount: null,
        timeStamp : moment().format('x'),
      };
    },

    // editExpense(itemData) {
    //   this.modal = "edit";
    //   // console.log(couseId);
    //   this.expenseList = itemData;
    // },

    // updatecourse(docId) {
    //   // alert(docId)
    //   db.collection("courses")
    //     .doc(docId)
    //     .update(this.itemData)
    //     .then(() => {
    //       Swal.fire({
    //         title: "อัพเดทข้อมูล",
    //         text: "ได้ทำการupdateสินค้าเรียบร้อย",
    //         icon: "success",
    //         confirmButtonColor: "#30855c",
    //         confirmButtonText: "ตกลง",
    //       });
    //       $("#course").modal("hide");
    //       this.reset();
    //     });
    // },
    async minusExpense(doc) {
      // console.log(doc.date);
      let docId = moment(doc.date,'DD/MM/YYYY HH:mm').format('DD-MM-YYYY')
      let result = {
            utilities : 0,
            device : 0,
            teaching  : 0,
            office : 0,
            advertise : 0,
            teachEarn : 0,
            employeeEarn : 0,
            welfare : 0,
            service : 0,
            bankfee : 0,

            otherfee : 0,
            security : 0,
            forrent : 0,
            maintenance : 0,
            wagesWorker : 0,
            activity : 0,
            travel : 0,
            test : 0,
            instrument : 0,

            invDayOfMonth: moment().date(),
            invMonth: moment().month() + 1,
            invYear: moment().year(),
          }
          result.monthlyDay = `${result.invYear}-0${result.invMonth}`;

          if(doc.type == 'สาธารณูปโภค'){
            result.utilities = parseInt(doc.amount) 
          }
          else if(doc.type == 'เครื่องเขียน'){
            result.device = parseInt(doc.amount) 
          }
          else if(doc.type == 'อุปกรณ์การสอน'){
            result.teaching = parseInt(doc.amount) 
          }
          else if(doc.type == 'เครื่องใช้สำนักงาน'){
            result.office = parseInt(doc.amount) 
          }
          else if(doc.type == 'โฆษณา'){
            result.advertise = parseInt(doc.amount) 
          }
          else if(doc.type == 'ค่าสอนครู'){
            result.teachEarn = parseInt(doc.amount) 
          }
          else if(doc.type == 'เงินเดือนเจ้าหน้าที่'){
            result.employeeEarn = parseInt(doc.amount) 
          }
          else if(doc.type == 'สวัสดิการครู/เจ้าหน้าที่'){
            result.welfare = parseInt(doc.amount) 
          }
          else if(doc.type == 'ค่ารับรอง'){
            result.service = parseInt(doc.amount) 
          }
          else if(doc.type == 'ธรรมเนียมธนาคาร'){
            result.bankfee = parseInt(doc.amount) 
          }

          else if(doc.type == 'ธรรมเนียมอื่นๆ'){
            result.otherfee = parseInt(doc.amount) 
          }
          else if(doc.type == 'เงินประกัน'){
            result.security = parseInt(doc.amount) 
          }
          else if(doc.type == 'ค่าเช่า'){
            result.forrent = parseInt(doc.amount) 
          }
          else if(doc.type == 'ค่าซ่อมบำรุง'){
            result.maintenance = parseInt(doc.amount) 
          }
          else if(doc.type == 'ค่าจ้างแรงงานทั่วไปรายครั้ง'){
            result.wagesWorker = parseInt(doc.amount) 
          }
          else if(doc.type == 'กิจกรรม/คอนเสิร์ต'){
            result.activity = parseInt(doc.amount) 
          }
          else if(doc.type == 'ค่าเดินทาง'){
            result.travel = parseInt(doc.amount) 
          }
          else if(doc.type == 'สอบเกรด'){
            result.test = parseInt(doc.amount) 
          }
          else if(doc.type == 'ค่าเครื่องดนตรี'){
            result.instrument = parseInt(doc.amount) 
          }

          // console.log(doc);


      try {
        console.log(docId);
        var ref = db.collection("summarizeExpense").doc(docId);
        let doc = await ref.get();

          let data = {
            docId : doc.id,
            utilities : doc.data().utilities - result.utilities,
            device : doc.data().device - result.device,
            teaching : doc.data().teaching - result.teaching,
            office : doc.data().office - result.office,
            advertise : doc.data().advertise - result.advertise,
            teachEarn : doc.data().teachEarn - result.teachEarn,
            employeeEarn : doc.data().employeeEarn - result.employeeEarn,
            welfare : doc.data().welfare - result.welfare,
            service : doc.data().service - result.service,
            bankfee : doc.data().bankfee - result.bankfee,

            otherfee : doc.data().otherfee - result.otherfee,
            security : doc.data().security - result.security,
            forrent : doc.data().forrent - result.forrent,
            maintenance : doc.data().maintenance - result.maintenance,
            wagesWorker : doc.data().wagesWorker - result.wagesWorker,
            activity : doc.data().activity - result.activity,
            travel : doc.data().wagesWorker - result.travel,
            test : doc.data().activity - result.test,
            instrument : doc.data().instrument - result.instrument,
          }
          await db.collection('summarizeExpense').doc(docId).update(data)
        
      } catch (err) {
        console.log(err);
      }
    },

    async summarizeExpense() {
      let result = {
            utilities : 0,
            device : 0,
            teaching  : 0,
            office : 0,
            advertise : 0,
            teachEarn : 0,
            employeeEarn : 0,
            welfare : 0,
            service : 0,
            bankfee : 0,

            otherfee : 0,
            security : 0,
            forrent : 0,
            maintenance : 0,
            wagesWorker : 0,
            activity : 0,
            travel : 0,
            test : 0,
            instrument : 0,
            invDayOfMonth: moment().date(),
            invMonth: moment().month() + 1,
            invYear: moment().year(),
          }
          result.monthlyDay = `${result.invYear}-0${result.invMonth}`;

          if(this.expenseList.type == 'สาธารณูปโภค'){
            result.utilities = parseInt(this.expenseList.amount) 
          }
          else if(this.expenseList.type == 'เครื่องเขียน'){
            result.device = parseInt(this.expenseList.amount) 
          }
          else if(this.expenseList.type == 'อุปกรณ์การสอน'){
            result.teaching = parseInt(this.expenseList.amount) 
          }
          else if(this.expenseList.type == 'เครื่องใช้สำนักงาน'){
            result.office = parseInt(this.expenseList.amount) 
          }
          else if(this.expenseList.type == 'โฆษณา'){
            result.advertise = parseInt(this.expenseList.amount) 
          }
          else if(this.expenseList.type == 'ค่าสอนครู'){
            result.teachEarn = parseInt(this.expenseList.amount) 
          }
          else if(this.expenseList.type == 'เงินเดือนเจ้าหน้าที่'){
            result.employeeEarn = parseInt(this.expenseList.amount) 
          }
          else if(this.expenseList.type == 'สวัสดิการครู/เจ้าหน้าที่'){
            result.welfare = parseInt(this.expenseList.amount) 
          }
          else if(this.expenseList.type == 'ค่ารับรอง'){
            result.service = parseInt(this.expenseList.amount) 
          }
          else if(this.expenseList.type == 'ธรรมเนียมธนาคาร'){
            result.bankfee = parseInt(this.expenseList.amount) 
          }

          else if(this.expenseList.type == 'ธรรมเนียมอื่นๆ'){
            result.otherfee = parseInt(this.expenseList.amount) 
          }
          else if(this.expenseList.type == 'เงินประกัน'){
            result.security = parseInt(this.expenseList.amount) 
          }
          else if(this.expenseList.type == 'ค่าเช่า'){
            result.forrent = parseInt(this.expenseList.amount) 
          }
          else if(this.expenseList.type == 'ค่าซ่อมบำรุง'){
            result.maintenance = parseInt(this.expenseList.amount) 
          }
          else if(this.expenseList.type == 'ค่าจ้างแรงงานทั่วไปรายครั้ง'){
            result.wagesWorker = parseInt(this.expenseList.amount) 
          }
          else if(this.expenseList.type == 'กิจกรรม/คอนเสิร์ต'){
            result.activity = parseInt(this.expenseList.amount) 
          }
          else if(this.expenseList.type == 'ค่าเดินทาง'){
            result.travel = parseInt(this.expenseList.amount) 
          }
          else if(this.expenseList.type == 'สอบเกรด'){
            result.test = parseInt(this.expenseList.amount) 
          }
          else if(this.expenseList.type == 'ค่าเครื่องดนตรี'){
            result.instrument = parseInt(this.expenseList.amount) 
          }



      try {
        let today = moment().add("543", "year").format("DD-MM-YYYY");
        var ref = db.collection("summarizeExpense").doc(today);
        let doc = await ref.get();
        if (!doc.exists) {
          // console.log(result);
          await ref.set(result, { merge: true });
          this.addItemData() 
        } else {
          let data = {
            docId : doc.id,
            utilities : doc.data().utilities + result.utilities,
            device : doc.data().device + result.device,
            teaching : doc.data().teaching + result.teaching,
            office : doc.data().office + result.office,
            advertise : doc.data().advertise + result.advertise,
            teachEarn : doc.data().teachEarn + result.teachEarn,
            employeeEarn : doc.data().employeeEarn + result.employeeEarn,
            welfare : doc.data().welfare + result.welfare,
            service : doc.data().service + result.service,
            bankfee : doc.data().bankfee + result.bankfee,

            otherfee : doc.data().otherfee + result.otherfee,
            security : doc.data().security + result.security,
            forrent : doc.data().forrent + result.forrent,
            maintenance : doc.data().maintenance + result.maintenance,
            wagesWorker : doc.data().wagesWorker + result.wagesWorker,
            activity : doc.data().activity + result.activity,
            travel : doc.data().wagesWorker + result.travel,
            test : doc.data().activity + result.test,
            instrument : doc.data().instrument + result.instrument,
          }
          await db.collection('summarizeExpense').doc(today).update(data)
          this.addItemData() 
        }
      } catch (err) {
        console.log(err);
      }
    },

    async addItemData() {
      try {
        this.expenseList.timeStamp = moment().format('x');
        await db.collection("expenseTable").add(this.expenseList);
        Swal.fire({
          title: "เพิ่มข้อมูลเรียบร้อย",
          text: "ได้ทำการเพิ่มข้อมูลแล้วเรียบร้อย",
          icon: "success",
          confirmButtonColor: "#30855c",
          confirmButtonText: "ตกลง",
        });
        $("#modal1").modal("hide");
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

    getExpenseLists() {
      db.collection("expenseTable").orderBy('timeStamp','desc').onSnapshot((querySnapshot) => {
        this.expenseLists = [];
        querySnapshot.forEach((doc) => {
          let expenseList = {
            timeStamp : doc.data().timeStamp,
            date: doc.data().date,
            type: doc.data().type,
            list: doc.data().list,
            amount: doc.data().amount,
            docId: doc.id,
          };
          this.expenseLists.push(expenseList);
          console.log(this.expenseLists);
        });
      });
    },
  },

  created() {
    this.getExpenseLists();
    window.scrollTo(0, 0);
  },

  computed: {
    incomeTotal() {
      var total = this.expenseLists.reduce((accumulator, Item) => {
        return accumulator + parseInt(Item.amount);
      }, 0);
      console.log(total);
      return Number(total).toLocaleString();
    },
  },
};
</script>

<style></style>
