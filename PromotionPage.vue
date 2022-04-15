<template>
  <div>
    <div class="bg2">
      <b-navbar id="abc">
        <template #start>
          <b-navbar-item tag="div"
            ><router-link to="/" style="color:white"> หน้าแรก </router-link></b-navbar-item
          >
          <b-navbar-item tag="div"
            ><router-link to="/profile" style="color:white"> สินค้า </router-link></b-navbar-item
          >
          <b-navbar-item tag="div"><router-link to="/promotion" style="color:white"> โปรโมชัน </router-link></b-navbar-item>
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

    <section>
      <p style=" position: absolute; bottom: 70%; left: 50%; font-size: 40px; color: white">
        โปรโมชัน
      </p>

      <br>
      <br>
      <br>
      <br>
      <div class="columns">
        <div class="column">
          <img src="../assets/promotion.png" width="100%" >
        </div>
        <div class="column">
          <img src="../assets/promotion.png" width="100%" >
        </div>
        <div class="column">
          <img src="../assets/promotion.png" width="100%" >
        </div>
      </div>
      <br>
      <br>
      <div class="columns">
        <div class="column">
          <img src="../assets/promotion.png" width="100%" >
        </div>
        <div class="column">
          <img src="../assets/promotion.png" width="100%" >
        </div>
        <div class="column">
          <img src="../assets/promotion.png" width="100%" >
        </div>
      </div>
    </section>

  </div>
</template>
<style>

#abc {
  background-color: transparent;
  flex-direction: top;
}

.bg2 {
  width: 100%;
  min-height: 50vh;
  background-image: url(../assets/promotion.png);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

</style>
