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
          ><router-link to="/adminpromotion" style="color: white">
            โปรโมชัน
          </router-link></b-navbar-item
        >
      </template>
      <template #end>
        <b-navbar-item tag="div" style="padding-top: 12px">
          <div class="block" style="margin-bottom: 0">
            <router-link to="/cart">
              <i
                class="fas fa-shopping-cart"
                style="margin-left: -60%; font-size: 30px; color: white"
              ></i>
            </router-link>
          </div>
          <a class="button is-light" v-if="role == 'employee'">
            <router-link to="/manageorder">
              <strong>จัดการออเดอร์</strong>
            </router-link>
          </a>
          <a class="button is-light ml-2" v-if="role == 'employee'">
            <router-link to="/signupemp">
              <strong>เพิ่มพนักงาน</strong>
            </router-link>
          </a>
          <a class="button is-light ml-2" v-if="!role">
            <router-link to="/signup">
              <strong>สมัครสมาชิก</strong>
            </router-link>
          </a>
          <a class="button is-light ml-2" v-if="!role">
            <router-link to="/login">
              <strong>เข้าสู่ระบบ</strong>
            </router-link>
          </a>
          <div class="navbar-item has-dropdown is-hoverable ml-2 mr-6 has-background-white" v-if="role" >
            <a class="navbar-link"><i class="far fa-user" style="font-size: 30px;"></i> </a>

            <div class="navbar-dropdown">
              <router-link to="/profile"> 
              <a class="navbar-item">
                Profile
              </a>
              </router-link>
              <a class="navbar-item" @click="logout">
                Logout
              </a>
            </div>
          </div>
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
  data() {
    return {
      role: "",
    };
  },
  mounted() {
    // localStorage.getItem('role')
    this.role = localStorage.getItem("role");

  },
  methods: {
    logout(){
      localStorage.clear()
      this.$router.push({ name: "Login" });
    }
  }
};
</script>
