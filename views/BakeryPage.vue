<template>
  <div>
    <div class="bg_img3">
      <NavBar />
    </div>
    <div style="margin: 5% 8%; position: relative">
      <p class="is-size-4" style="position: absolute; left: 60vw; top: 20%">
        ชื่อสินค้า
      </p>
      <h2 class="is-size-2" style="position: absolute; left: 57vw; top: 50%">
        รายละเอียด
      </h2>
      <img
        :src="image.path_image"
        style="max-height: 400px; cursor: pointer"
        @click="ModalPic = !ModalPic"
      />
      <p class="is-size-6" style="position: relative; left: 200px">ราคา</p>
    </div>
    <div class="has-text-right mr-6" style="margin-bottom: 50px">
      <span class="is-size-5 mr-1">สินค้าคงเหลือ </span>
      <span>... </span>
      <i class="fas fa-cart-arrow-down ml-3" style="font-size: 30px"></i>
    </div>
    <div class="modal" :class="[ModalPic ? 'is-active' : '']">
      <div class="modal-background"></div>
      <div class="modal-content" style="max-width: 700px">
        <p class="image is-4by3">
          <img :src="image.path_image" />
        </p>
      </div>
      <button
        class="modal-close is-large"
        aria-label="close"
        @click="ModalPic = false"
      ></button>
    </div>
  </div>
</template>

<script>
import NavBar from "../components/NavBar";
export default {
  data() {
    return {
      image: {
        path_image: require("../assets/chocolate_cake_PNG40.png"),
      },
      ModalPic: false,
    };
  },
  methods: {
    // clickpic: function () {
    //   this.ModalPic = !this.ModalPic;
    // },
  },
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
img {
  height: 400px;
  width: 500px;
  /* background-color: #fff; */
}
</style>