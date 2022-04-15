<template>
  <div>
    <b-navbar id="deletetop">
      <template #start>
        <b-navbar-item tag="div" style="font-size: 1.4em"
          ><router-link to="/" style="color: white">
            หน้าแรก
          </router-link></b-navbar-item
        >
        <b-navbar-item tag="div" style="font-size: 1.4em"
          ><router-link to="/profile" style="color: white">
            สินค้า
          </router-link></b-navbar-item
        >
        <b-navbar-item tag="div" style="font-size: 1.4em"
          ><router-link to="/promotion" style="color: white">
            โปรโมชัน
          </router-link></b-navbar-item
        >
      </template>
      <template #end>
        <b-navbar-item tag="div" style="padding-top: 12px;">
          <div class="block" style="margin-bottom: 0">
            <i
              class="fas fa-shopping-cart"
              style="margin-left: -60%; font-size: 30px; color: white;"
            ></i>
          </div>
          <a class="button is-primary" style="margin-left: -2%;">
            <strong>สมัครสมาชิก</strong>
          </a>
          <a class="button is-light" style="margin-left: 4%;">
            <strong>เข้าสู่ระบบ</strong>
          </a>
        </b-navbar-item>
      </template>
    </b-navbar>
  </div>
</template>
<style>
#deletetop {
  background-color: transparent;
}
</style>
<script>
export default {
  name: "NavBar",
};
</script>
