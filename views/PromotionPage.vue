<template>
  <div>
    <div class="photo2">
      <NavBar />
    </div>

    <!-- <img src="../assets/promotion.png" /> -->
    <h1 class="has-text-centered is-size-3 mb-3">โปรโมชัน</h1>
    <div class="columns">
      <div class="column" v-for="(promo, i) in product1" :key="i">
        <div style="height: 65vh">
          <img :src="promo.image" style="width: 100%" />
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="column" v-for="(promo, i) in product2" :key="i">
        <div style="height: 65vh">
          <img :src="promo.image" style="width: 100%" />
        </div>
      </div>
    </div>
  </div>
</template>
<style>
body {
  background-color: #f8dec7;
}
.photo2 {
  width: 100%;
  min-height: 100vh;
  background-image: url(../assets/promotion.png);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
<script>
import NavBar from "../components/NavBar";

export default {
  components: {
    NavBar,
  },
  data() {
    return {
      product1: [
        {
          id: 0,
          title: "ลดราคา",
          image: require("../assets/promotion.png"),
        },
        {
          id: 1,
          title: "ฟรี1",
          image: require("../assets/bghome.jpg"),
        },
        {
          id: 2,
          title: "ฟรี1",
          image: require("../assets/bghome.jpg"),
        },
      ],
      product2: [
        {
          id: 3,
          title: "ลดราคา",
          image: require("../assets/promotion.png"),
        },
        {
          id: 4,
          title: "ฟรี1",
          image: require("../assets/bghome.jpg"),
        },
        {
          id: 5,
          title: "ฟรี1",
          image: require("../assets/bghome.jpg"),
        },
      ],
    };
  },
};
</script>
