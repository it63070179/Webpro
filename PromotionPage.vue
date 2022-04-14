<template>
  <div>
    <div class="bg2">
      <b-navbar id="abc">
        <template #start>
          <b-navbar-item tag="div"
            ><router-link to="/"> หน้าแรก </router-link></b-navbar-item
          >
          <b-navbar-item tag="div"
            ><router-link to="/profile"> สินค้า </router-link></b-navbar-item
          >
          <b-navbar-item tag="div"><router-link to="/promotion"> โปรโมชัน </router-link></b-navbar-item>
        </template>
        <template #end>
          <b-navbar-item tag="div" style="padding-top: 12px">
            <div class="block" style="margin-bottom: 0">
              <font-awesome-icon
                icon="fas fa-shopping-cart"
                size="2x"
                color="white"
                style="margin-left: -60%"
              />
            </div>
            <a class="button is-primary" style="margin-left: -2%">
              <strong>สมัครสมาชิก</strong>
            </a>
            <a class="button is-light" style="margin-left: 4%">
              <strong>เข้าสู่ระบบ</strong>
            </a>
          </b-navbar-item>
        </template>
      </b-navbar>
    </div>

    <p>test</p>
    <p>This is promotion</p>

  </div>
</template>
<style>
#abc {
  background-color: transparent;
}

.bg2 {
  width: 100%;
  min-height: 80vh;
  background-image: url(../assets/promotion.png);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
