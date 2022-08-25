<template>
  <div>
    <button class="btn btn-primary" @click="newData">test</button>
    <pre>{{result}}</pre>
    <div class="row">
      <div class="col">
        
      </div>
    </div>
    <!-- <h1>Day of Week {{dayOfWeek}}</h1>
        <h1>Month of year {{myMonth}}</h1>
        <h1>day of month {{dayOfMonth}}</h1>
        <h1>year {{year}}</h1> -->
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "SchoolTestManageTable",

  data() {
    return {
      dayOfWeek: moment().isoWeekday(),
      myMonth: moment().month() + 1,
      dayOfMonth: moment().date(),
      year: moment().year(),

      dataTest: [
        {
          name: "jim",
          color: "blue",
          order: 1,
          age: "22",
          height: 168,
        },
        {
          name: "Sam",
          color: "blue",
          order: 1,
          age: "33",
          height: 178,
        },
        {
          name: "eddie",
          color: "green",
          order: 3,
          age: "77",
          height: 173,
        },
      ],
      result:[],
    };
  },

  mounted() {},

  methods: {
    // newData() {
    //   this.result = this.dataTest.reduce((carry, current) => {
    //     const { color, order, ...user } = current;
    //     // console.log({...user});
    //     let el = carry.find(
    //       (item) => item.color === color && item.order === order
    //     );
    //     console.log(el);

    //     if (!el) {
    //       el = { color, order, users: [] };
    //       carry.push(el);
    //     }

    //     el.users.push({ ...user, color });
    //     return carry;
    //   }, []);
    // },
  },
};
</script>

<style lang="scss" scoped></style>
