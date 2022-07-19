<template>
  <div id="attendance">
    <div class="btn btn-success" @click="getData()">Get</div>
    <ul v-for="(item, index) in invoices.teacher" :key="index">
      <div v-for="(itm, idx) in item" :key="idx">
        <li>{{ itm }}</li>
      </div>
    </ul>
  </div>
</template>

<script>
import { db } from "../../firebase";

export default {
  name: "attendance",

  data() {
    return {
      invoices: [],
      fields:[],
    };
  },

  methods: {
    async getData() {
      let get = await db.collection("invoiceData").get();
      // console.log(get);
      this.invoices = [];
      get.forEach((doc) => {
        let dt = {
          courseDetail: doc.data().courseDetail,
        };
        this.invoices.push(dt);
        console.log(this.invoices);
        // this.fields = []
        // this.invoices.forEach((f)=>{
        //     let dt = {
        //         amount : f.data().amount
        //     }
        //     this.fields.push(dt)
        //     console.log(this.fields);
        // })
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>