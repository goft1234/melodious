<template>
  <div id="navbar" style="margin-bottom:100px;">
    <nav class="navbar navbar-expand-sm bg-success fixed-top " >
      <a class="navbar-brand" href="#">
        <img
          src="https://www.mmsmelodious.info/images/logo/medium-1594270995740.png"
          alt="Logo"
          style="width: 65px"
        />
      </a>
      <div class="float-right">
        <h5 class="text-light my-auto">โรงเรียนสอนดนตรี เมโลดิอุส</h5>
      </div>
                  <!-- <a href="#" class="btn btn-success float-right mt-3" @click="logout">ออกจากระบบ</a> -->

    </nav>
  </div>
</template>

<script>
import { fb } from "../firebase.js";

export default {
  name: "navbar",
  methods: {
    logout() {
      fb.auth()
        .signOut()
        .then(() => {
          this.$router.push("/");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
#navbar{
  z-index: -10;
}
</style>>

</style>