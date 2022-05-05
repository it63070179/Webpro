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
      <div class="buttons is-right">
        <button class="button is-link is-outlined" style="padding: 25px">
          <router-link to="/addpromotion">เพิ่มโปรโมชัน</router-link>
        </button>
      </div>
      <div class="row columns is-multiline">
        <div
          v-for="detailpromo in promotion"
          :key="detailpromo.promoId"
          class="column is-4"
        >
          <div class="card large">
            <div class="flip-card">
              <div class="flip-card-inner">
                <div class="flip-card-front">
                  <div class="card-image">
                    <figure class="image is-5by4">
                      <img
                        :src="'http://localhost:3000/' + detailpromo.pro_image"
                        alt="Image"
                      />
                    </figure>
                  </div>
                  <br>
                  <br>
                  <div class="media">
                    <div class="media-content">
                      <p class="title is-3 no-padding has-text-centered">
                        {{ detailpromo.pro_name }}
                      </p>
                    </div>
                  </div>
                </div>
                <div class="flip-card-back">
                  <div class="content">
                    {{ detailpromo.pro_detail }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br />
          <div class="column has-text-centered">
            <router-link :to="`/editpromotion/${detailpromo.pro_id}`"
              ><i
                class="fa fa-pencil"
                aria-hidden="true"
                style="font-size: 24px; margin-right: 40px"
              ></i
            ></router-link>
            <i
              class="fa fa-trash"
              aria-hidden="true"
              style="font-size: 24px; cursor: pointer"
              @click="Modalpromo(detailpromo.pro_id)"
            ></i>
          </div>

          <!-- Modal -->
          <b-modal v-model="isCardModalActive" style="width: 100%">
            <div class="card">
              <div class="card-content">
                <div class="media">
                  <div class="media-content">
                    <p style="text-align: center; font-size: 32px">
                      ต้องการลบโปรโมชันที่ {{ deletepromotion }} หรือไม่
                    </p>
                  </div>
                </div>

                <div class="content">
                  <button
                    class="button is-success is-outlined"
                    style="margin-left: 200px; width: 100px"
                    @click="Deletepromo(deletepromotion)"
                  >
                    ยืนยัน
                  </button>
                  <button
                    class="button is-danger is-outlined"
                    style="margin-left: 300px; width: 100px"
                    @click="isCardModalActive = false"
                  >
                    ยกเลิก
                  </button>
                </div>
              </div>
            </div>
          </b-modal>
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
  font-size: 24px;
  transform: rotateY(180deg);
  padding: 25%;
  display: flex;
  align-items: center;
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
      promotion: [],
      isCardModalActive: false,
      deletepromotion: null,
    };
  },
  mounted() {
    this.getPromotion();
  },
  methods: {
    getPromotion() {
      axios
        .get("http://localhost:3000/promotion")
        .then((response) => {
          console.log(response.data);
          this.promotion = response.data;
        })
        .catch((error) => {
          this.error = error.response.data.message;
        });
    },

    Deletepromo(promoId) {
      axios
        .delete(`http://localhost:3000/promotion/${promoId}`)
        .then((response) => {
          console.log(response);
          axios
            .get("http://localhost:3000/promotion")
            .then((response) => {
              console.log(response.data);
              this.promotion = response.data;
            })
            .catch((error) => {
              this.error = error.response.data.message;
            });
        })
        .catch((err) => {
          console.log(err);
        });
      this.isCardModalActive = false;
    },
    Modalpromo(promoId) {
      this.isCardModalActive = true;
      this.deletepromotion = promoId;
      console.log(promoId);
    },
  },
};
</script>
