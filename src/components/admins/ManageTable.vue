<template>
    <div>
        <h1>Day of Week {{dayOfWeek}}</h1>
        <h1>Month of year {{myMonth}}</h1>
        <h1>day of month {{dayOfMonth}}</h1>
        <h1>year {{year}}</h1>
    </div>
</template>

<script>
import moment from "moment";

export default {
    name: 'SchoolTestManageTable',

    data() {
        return {
            dayOfWeek: moment().isoWeekday(),
            myMonth : moment().month() +1,
            dayOfMonth : moment().date(),
            year: moment().year(),
        };
    },

    mounted() {
        
    },

    methods: {
        
    },
};
</script>

<style lang="scss" scoped>

</style>