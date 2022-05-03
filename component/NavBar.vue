<template>
  <div>
    <b-navbar id="deletetop">
      <template #start>
        <b-navbar-item tag="div"
          ><router-link to="/" style="color: white">
            หน้าแรก
          </router-link></b-navbar-item
        >
        <b-navbar-item tag="div"
          ><router-link to="/product" style="color: white">
            สินค้า
          </router-link></b-navbar-item
        >
        <b-navbar-item tag="div"
          ><router-link to="/promotion" style="color: white">
            โปรโมชัน
          </router-link></b-navbar-item
        >
      </template>
      <template #end>
        <b-navbar-item tag="div" style="padding-top: 12px">
          <div class="block" style="margin-bottom: 0">
            <router-link>
            <i
              class="fas fa-shopping-cart"
              style="margin-left: -60%; font-size: 30px; color: white"
            ></i>
            </router-link>
          </div>
          <a class="button is-light">
            <router-link>
            <strong>จัดการออเดอร์</strong>
            </router-link>
          </a>
          <a class="button is-light ml-2">
            <router-link>
            <strong>เพิ่มพนักงาน</strong>
            </router-link>
          </a>
          <a class="button is-light ml-2">
            <router-link to="/signup">
            <strong>สมัครสมาชิก</strong>
            </router-link>
          </a>
          <a class="button is-light ml-2">
            <router-link to="/login">
            <strong>เข้าสู่ระบบ</strong>
            </router-link>
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
