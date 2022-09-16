<template>
  <div>
    <div class="container jumbotron">
      <div class="row">
        <div class="col-md-6 bg-secondary p-2">
          <datepicker
            input-class="form-control w-100"
            v-model="date"
            lang="th"
            type="date"
            format="DD-MM-YYYY"
            placeholder="เลือกวันที่"
            @change="getInvoiceDate"
          ></datepicker>
        </div>

        <div class="col-md-6">
          <datepicker
            input-class="form-control"
            v-model="month"
            lang="th-TH"
            type="month"
            format="MM-YYYY"
            placeholder="เลือกเดือน"
          ></datepicker>
        </div>

        <div class="col-md-6 mt-3">
          <datepicker
            input-class="form-control"
            v-model="time"
            lang="th-TH"
            type="time"
            format="HH:mm"
            placeholder="เลือกเวลา"
            @change="getInvoiceDate"
            confirm
          ></datepicker>
        </div>

        <div class="col-md-6 mt-3">
          <datepicker
            input-class="form-control"
            v-model="timestep"
            lang="th-TH"
            type="time"
            format="HH:mm"
            placeholder="เลือกเวลา"
            :time-picker-options="timePickerOptions"
          ></datepicker>
        </div>

        <div class="col-md-6 mt-3">
          <datepicker
            input-class="form-control"
            v-model="dateTimes"
            lang="th-TH"
            type="datetime"
            format="DD-MM-YYYY HH:mm:ss"
            width="500px"
            placeholder="เลือกวัน - เวลา"
          ></datepicker>
        </div>

        <div class="col-md-6 mt-3">
          <datepicker
            input-class="form-control"
            v-model="range"
            lang="th-TH"
            range
            type="date"
            format="DD-MM-YYYY"
            width="500px"
            placeholder="date - range"
          ></datepicker>
        </div>

        <div class="col-md-6 mt-3">
          <datepicker
            input-class="form-control"
            v-model="range"
            lang="th-TH"
            range
            type="time"
            format="HH:mm:ss"
            width="500px"
            placeholder="time - range"
          ></datepicker>
        </div>

        <div class="col-md-6 mt-3">
          <datepicker
            input-class="form-control"
            v-model="range"
            lang="th-TH"
            range
            type="datetime"
            format="DD-MM-YYYY HH:mm:ss"
            width="800"
            placeholder="date:time - range"
          ></datepicker>
        </div>

        <div class="col-md-6 mt-3">
          <datepicker
            input-class="form-control"
            v-model="range"
            lang="th-TH"
            range
            :shortcuts="shortcuts"
            placeholder="shortcuts"
            confirm
          ></datepicker>
        </div>

        <div class="col-md-6 mt-3">
          <datepicker
            input-class="form-control"
            v-model="range"
            :lang="lang"
          ></datepicker>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import "vue2-datepicker/index.css";
import datepicker from "vue2-datepicker";
export default {
  name: "SchoolTestManageTable",
  components: {
    datepicker,
  },

  data() {
    return {
      time: "",
      date: "",
      month: "",

      timePickerOptions: {
        start: "00:00",
        step: "00:30",
        end: "23:30",
      },
      timestep: "",
      dateTimes: "",
      range: "",

      shortcuts: [
        {
          text: "today",
          onClick: () => {
            this.range = [
              moment().format("DD-MM-YYYY"),
              moment().format("DD-MM-YYYY"),
            ];
          },
        },
      ],

      lang: {
        days: ["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"],
        months: [
          "มค",
          "กพ",
          "มีค",
          "เม",
          "พค",
          "มิย",
          "กค",
          "สค",
          "กย",
          "ตค",
          "พย",
          "ธค",
        ],
      },
    };
  },

  mounted() {},

  methods: {
    getInvoiceDate() {
      // console.log(moment(this.date).format("DD-MM-YYYY"));
      console.log(this.time);
    },
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
