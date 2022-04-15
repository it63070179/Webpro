<template>
  <div>
    <div class="photo2">
      <NavBar />
    </div>

    <!-- <img src="../assets/promotion.png" /> -->
    <div class="container is-desktop">
      <h1 class="has-text-centered is-size-3 mb-3">โปรโมชัน</h1>
      <br />
      <br />
      <div class="row columns is-multiline">
        <div v-for="card in product" :key="card.id" class="column is-4">
          <div class="card large">
            <div class="flip-card">
              <div class="flip-card-inner">
                <div class="flip-card-front">
                  <div class="card-image">
                    <figure class="image is-5by4">
                      <img :src="card.image" alt="Image" />
                    </figure>
                  </div>

                  <div class="media">
                    <div class="media-content">
                      <p class="title is-3 no-padding has-text-centered">
                        {{ card.title }}
                      </p>
                      <p class="title is-6 no-padding has-text-centered">
                        {{ card.startdate }}
                      </p>
                      <p class="title is-6 no-padding has-text-centered">
                        {{ card.expiredate }}
                      </p>
                    </div>
                  </div>
                </div>
                <div class="flip-card-back">
                  <div class="content">
                    {{ card.detail }}
                  </div>
                </div>
              </div>
            </div>
          </div>
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

.flip-card {
  width: 100%;
  height: 550px;
  background-color: #f8dec7;
  cursor: pointer;
}

.flip-card-inner {
  width: 100%;
  height: 100%;
  transition: transform 0.5s;
  transform-style: preserve-3d;
}

.flip-card:active .flip-card-inner {
  transform: rotateY(180deg);
}

.flip-card-front,
.flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}

.flip-card-back {
  background-color: #f8dec7;
  font-size: 26px;
  transform: rotateY(180deg);
  padding: 20%;
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
      product: [
        {
          id: 0,
          title: "ลดราคา",
          image: require("../assets/promotion.png"),
          detail:
            "ลูกค้าดีแทครับส่วนลด GrabFood 60.- เมื่อสั่งอาหารครบ 220. ตั้งแต่วันที่ 14 มี.ค.2565 - 31 พ.ค.2565 รายละเอียดเพิ่มเติมคลิก",
          startdate: "วันที่เริ่มโปรโมชัน :" + " 16-00-01",
          expiredate: "วันหมดอายุโปรโมชัน :" + " 16-01-02",
        },
        {
          id: 1,
          title: "ฟรี1",
          image: require("../assets/bghome.jpg"),
          detail:
            "ลูกค้าดีแทครับส่วนลด GrabFood 60.- เมื่อสั่งอาหารครบ 220. ตั้งแต่วันที่ 14 มี.ค.2565 - 31 พ.ค.2565 รายละเอียดเพิ่มเติมคลิก",
          startdate: "วันที่เริ่มโปรโมชัน :" + " 16-00-01",
          expiredate: "วันหมดอายุโปรโมชัน :" + " 16-01-02",
        },
        {
          id: 2,
          title: "ฟรี1",
          image: require("../assets/bghome.jpg"),
          detail:
            "ลูกค้าดีแทครับส่วนลด GrabFood 60.- เมื่อสั่งอาหารครบ 220. ตั้งแต่วันที่ 14 มี.ค.2565 - 31 พ.ค.2565 รายละเอียดเพิ่มเติมคลิก",
          startdate: "วันที่เริ่มโปรโมชัน :" + " 16-00-01",
          expiredate: "วันหมดอายุโปรโมชัน :" + " 16-01-02",
        },
        {
          id: 3,
          title: "ลดราคา",
          image: require("../assets/promotion.png"),
          detail:
            "ลูกค้าดีแทครับส่วนลด GrabFood 60.- เมื่อสั่งอาหารครบ 220. ตั้งแต่วันที่ 14 มี.ค.2565 - 31 พ.ค.2565 รายละเอียดเพิ่มเติมคลิก",
          startdate: "วันที่เริ่มโปรโมชัน :" + " 16-00-01",
          expiredate: "วันหมดอายุโปรโมชัน :" + " 16-01-02",
        },
        {
          id: 4,
          title: "ฟรี1",
          image: require("../assets/bghome.jpg"),
          detail:
            "ลูกค้าดีแทครับส่วนลด GrabFood 60.- เมื่อสั่งอาหารครบ 220. ตั้งแต่วันที่ 14 มี.ค.2565 - 31 พ.ค.2565 รายละเอียดเพิ่มเติมคลิก",
          startdate: "วันที่เริ่มโปรโมชัน :" + " 16-00-01",
          expiredate: "วันหมดอายุโปรโมชัน :" + " 16-01-02",
        },
        {
          id: 5,
          title: "ฟรี1",
          image: require("../assets/bghome.jpg"),
          detail:
            "ลูกค้าดีแทครับส่วนลด GrabFood 60.- เมื่อสั่งอาหารครบ 220. ตั้งแต่วันที่ 14 มี.ค.2565 - 31 พ.ค.2565 รายละเอียดเพิ่มเติมคลิก",
          startdate: "วันที่เริ่มโปรโมชัน :" + " 16-00-01",
          expiredate: "วันหมดอายุโปรโมชัน :" + " 16-01-02",
        },
      ],
    };
  },
};
</script>
