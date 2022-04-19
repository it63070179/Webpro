<template>
  <div>
    <div class="bg_img4">
      <NavBar />
    </div>
    <div>
      <h1 class="mt-5 is-size-1 mb-5" style="margin-left: 10vw">Cart</h1>
      <div class="columns is-multiline">
        <div
          class="column is-half"
          style="background-color: #e7cdb7; position: relative"
        >
          <p style="margin-bottom: 10vh; margin-left: 38vw">สินค้า</p>
          <article class="media">
            <figure class="media-left">
              <img />
            </figure>
            <div class="media-content">
              <div class="content" style="margin-left: 6vw; margin-top: 5vh">
                <p>
                  <strong>ชื่อสินค้า</strong>
                  <br />
                </p>
              </div>
            </div>
          </article>
        </div>
        <div class="column is-half" style="position: relative">
          <span style="margin-bottom: 10vh; margin-left: 10vw">ราคา</span>
          <span style="margin-bottom: 10vh; margin-left: 10vw">จำนวน</span>
          <span style="margin-bottom: 10vh; margin-left: 10vw">ราคารวม</span>
          <hr
            style="
              width: 90%;
              position: absolute;
              left: 5%;
              background-color: #bfa791;
              color: #bfa791;
              border-width: 0;
              height: 2px;
            "
          />
          <br />
          <br />
          <br />
          <span style="margin-bottom: 10vh; margin-left: 10vw">ราคา</span>
          <span style="margin-bottom: 10vh; margin-left: 8.6vw">
            <a><i class="fas fa-plus" style="color: #4a4a4a"></i></a>
            <a class="is-size-6 mx-5" style="color: #4a4a4a">1</a>
            <a><i class="fas fa-minus" style="color: #4a4a4a"></i></a
          ></span>
          <span style="margin-bottom: 10vh; margin-left: 8.8vw">ราคารวม</span>
          <i
            class="fas fa-trash-alt"
            style="margin-left: 2vw; font-size: 20px"
          ></i>
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
.bg_img4 {
  width: 100%;
  min-height: 100vh;
  background-image: url(../assets/bg_cartpage.png);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

img {
  height: 200px;
  width: 300px;
  margin-left: 5vw;
  /* background-color: #fff; */
}

.columns:last-child {
  margin-bottom: 0;
}
</style>