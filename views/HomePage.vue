<template>
  <div>
    <!-- <img src="../assets/promotion.png" /> -->
    <div class="bg_img">
      <NavBar />
    </div>
    <h1 class="has-text-centered is-size-3 mb-3" style="margin-top: 60px">
      สินค้ายอดนิยม
    </h1>
    <b-carousel>
      <b-carousel-item v-for="(popular, i) in popularproducts" :key="i">
        <div class="middle_pic" style="height: 65vh">
          <img :src="popular.image_path" style="max-height: 400px" />
        </div>
      </b-carousel-item>
    </b-carousel>
    <h1 class="has-text-centered is-size-3 mb-3" style="margin-top: 60px">
      สินค้าใหม่
    </h1>
    <div
      class="middle_pic mb-5"
      v-for="(newproduct, index) in newproducts"
      :key="index"
    >
      <img :src="newproduct.image_path" style="max-height: 400px" />
    </div>
  </div>
</template>
<style>
body {
  background-color: #f8dec7;
}
.carousel-pause {
  display: none;
}
.bg_img {
  width: 100%;
  min-height: 100vh;
  background-image: url(../assets/bg_homepage.jpg);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
img {
  height: 400px;
  width: 500px;
}

.middle_pic {
  display: flex;
  justify-content: center;
}
.carousel-arrow.is-hovered {
  opacity: 1;
}
</style>
<script>
import NavBar from "../components/NavBar";
import axios from "axios";
export default {
  components: {
    NavBar,
  },
  data() {
    return {
      popularproducts: [],
      newproducts: [],
    };
  },
  mounted() {
    this.getProduct();
  },
  methods: {
    getProduct() {
      axios
        .get(`http://localhost:3000/home`)
        .then((response) => {
          this.popularproducts = response.data.popularproduct;
          this.newproducts = response.data.newproduct;
          console.log(this.this.carousels);
          console.log(this.newproducts);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
