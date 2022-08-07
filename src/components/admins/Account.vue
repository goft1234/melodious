<template>
  <div id="transaction" class="shadow">
    <div class="container-fluid jumbotron">
        <h4 class="text-success text-center mx-auto">ระบบบัญชีรายรับ - รายจ่าย</h4>
      <div class="row">
        <div class="col-md-3"></div>
        <div class="col-md-6">
          <select
            class="form-control"
            id="namePrefix"
            v-model="acccountPage"
            @change="setPage()"
          >
            <option disabled value="">เลือกเพื่อดูข้อมูลบัญชี</option>
            <option value="overview">ภาพรวมทั้งหมด</option>
            <option value="incomeday">รายรับ - รายวัน</option>
            <option value="incomemonth">รายรับ - รายเดือน</option>
            <option value="expense">ระบบบันทึกค่าใช้จ่ายแต่ละเดือน</option>
            <option value="teacher">รายจ่าย - รายวัน</option>
            <option value="employee">รายจ่าย - รายเดือน</option>
            <option value="teacher">สรุปยอดรายวัน</option>
            <option value="employee">สรุปยอดรายเดือน</option>
          </select>
        </div>
        <div class="col-md-3"></div>
      </div>
      <router-view />
    </div>
  </div>
</template>

<script>
import router from '@/router';
export default {
  name: "acccount",

  data() {
    return {
      acccountPage: '',
    };
  },
  methods: {
    setPage() {
      console.log(this.acccountPage);
      if(this.acccountPage == "overview"){
        this.$router.replace("/admin/account/overview");
      }
      else if(this.acccountPage == "incomeday"){
        this.$router.replace("/admin/account/incomeday");
      }
      else if(this.acccountPage == "incomemonth"){
        this.$router.replace("/admin/account/incomemonth");
      }
      else if(this.acccountPage == "income"){
        this.$router.replace("/admin/account/transaction");
      }
      else if(this.acccountPage == "expense"){
        this.$router.replace("/admin/account/expense");
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
