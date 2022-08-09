<template>
  <div id="admin">
    <StudentNav></StudentNav>
    <div class="my-content">
      <router-view />
    </div>
    <StudentSidebar></StudentSidebar>
  </div>
</template>

<script>
import StudentNav from "@/components/students/Student_nav.vue";
import StudentSidebar from "@/components/students/Student_sidebar.vue";
export default {
  name: "admin",
  components: {
    StudentNav,
    StudentSidebar,
  },
  data() {
    return {};
  },

  mounted() {
    // this.$store.state.namePrefix = "fsefsefsef" ;
  },

  methods: {},
};
</script>

<style lang="scss" scoped>
/* หน้าจอขนาดเล็ก  iphone 6/7/8 */
@media (max-width: 576px) {
  .my-content {
    margin-top: 5rem;
    padding: 20px 3px;
  }
}

/* หน้าจอ ipad ipad-pro*/
@media (min-width: 767px) {
  .my-content {
    margin-top: 5rem;

    padding: 20px 20px;
  }
}

/* หน้าจอขนาดใหญ่ PC*/
@media (min-width: 1030px) {
  .my-content {
    margin-top: 5rem;

    padding: 20px 20px;
  }
}
</style>