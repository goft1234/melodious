<template>
  <div id="admin">
    <adminNav></adminNav>
    <div class="my-content">
      <router-view />
    </div>
    <adminSidebar></adminSidebar>
  </div>
</template>

<script>
import adminNav from "@/components/admins/Admin_nav.vue";
import adminSidebar from "@/components/admins/Admin_sidebar.vue";
export default {
  name: "admin",
  components: {
    adminNav,
    adminSidebar,
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