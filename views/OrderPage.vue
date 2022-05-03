<template>
  <div>
    <div class="bg_img3">
      <NavBar />
    </div>
    <div class="container">
      <div class="mt-6" style="display: flex; justify-content: center">
        <span class="is-size-2">คำสั่งซื้อที่ ....</span>
        <img
          src="../assets/pic_orderpage.png"
          style="width: 6%; margin-top: -50px"
        />
      </div>
      <h1 class="is-size-2">ชื่อร้าน</h1>
      <div class="columns" style="margin: 2vh 10vw">
        <div class="column">
          <p>สินค้า</p>
        </div>
        <div class="column">
          <p>จำนวน</p>
        </div>
        <div class="column">
          <p>ราคา</p>
        </div>
      </div>
      <h1 class="is-size-2 has-text-right mt-6 mb-6">ราคารวม .. บาท</h1>
      <div class="columns is-centered">
        <div
          class="column is-half mb-5 p-5"
          style="background-color: #bfa791; position: relative"
        >
          <strong class="ml-5">ไทยพาณิชย์(SCB)</strong>
          <p class="ml-5 mb-3">ชื่อบัญชี: สุวรรณพงศ์ มีมณี</p>
          <span class="ml-5"
            >เลขที่บัญชี:
            <strong class="is-size-4 has-text-white"> 0123456789</strong>
            <button
              class="button is-warning is-light has-text-grey-darker"
              style="position: absolute; left: 82%"
            >
              คัดลอก
            </button>
          </span>
        </div>
      </div>
      <div class="columns is-centered">
        <div class="column is-half mb-3">
          <button
            class="
              button
              is-warning is-light
              has-text-grey-darker
              is-fullwidth
              mb-3
            "
          >
            อัปโหลดหลักฐานการชำระเงิน
          </button>
          <button
            class="button is-warning is-light has-text-grey-darker is-fullwidth"
          >
            อัปโหลดหลักฐานการชำระเงินภายหลัง
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "../components/NavBar";
export default {
  data() {
    return {};
  },
  methods: {},
  components: {
    NavBar,
  },
};
</script>

<style>
.bg_img3 {
  width: 100%;
  min-height: 100vh;
  background-image: url(../assets/bg_bakerypage.png);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>