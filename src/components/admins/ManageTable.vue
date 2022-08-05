<template>
    <div>
        <h1>mytime {{myTime}}</h1>
    </div>
</template>

<script>
import moment from "moment";

export default {
    name: 'SchoolTestManageTable',

    data() {
        return {
            myTime:new Date().getDay(),
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