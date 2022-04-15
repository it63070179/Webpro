<template>
  <div>
    <!-- <img src="../assets/promotion.png" /> -->
    <div class="bg_img">
      <NavBar />
    </div>
    <h1 class="has-text-centered is-size-3 mb-3" style="margin-top: 60px;">สินค้ายอดนิยม</h1>
    <b-carousel>
      <b-carousel-item v-for="(carousel, i) in carousels" :key="i">
        <div class="middle_pic" style="height: 65vh">
          <img :src="carousel.image" style="max-height: 400px" />
        </div>
      </b-carousel-item>
    </b-carousel>
    <h1 class="has-text-centered is-size-3 mb-3" style="margin-top: 60px;">
      สินค้าใหม่
    </h1>
    <div
      class="middle_pic"
      v-for="(newproduct, index) in newproducts"
      :key="index"
    >
      <img :src="newproduct.path_image" style="max-height: 400px" />
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

export default {
  data() {
    return {
      carousels: [
        {
          text: "Slide 1",
          image: require("../assets/chocolate_cake_PNG5.png"),
        },
        {
          text: "Slide 2",
          image: require("../assets/chocolate_cake_PNG40.png"),
        },
      ],
      newproducts: [
        {
          path_image: require("../assets/chocolate_cake_PNG5.png"),
        },
        {
          path_image: require("../assets/chocolate_cake_PNG40.png"),
        },
      ],
    };
  },
  components: {
    NavBar,
  },
};
</script>