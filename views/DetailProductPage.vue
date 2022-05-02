<template>
  <div>
    <div class="photo3">
      <NavBar />
    </div>

    <section class="hero is-fullheight">
      <div class="hero-body">
        <div class="container has-text-centered">
          <div class="columns is-vcentered">
            <div class="column">
              <div class="container is-fluid">
                <div class="columns">
                  <div class="column">
                    <b-carousel>
                      <b-carousel-item
                        v-for="imgs in images"
                        :key="imgs.image_id"
                      >
                        <figure class="image" style="cursor: pointer">
                          <img
                            :src="'http://localhost:3000/' + imgs.image_path"
                            alt="Image"
                          />
                        </figure>
                      </b-carousel-item>
                    </b-carousel>
                  </div>
                </div>
                <div
                  v-for="imgs in images"
                  :key="imgs.image_id"
                  class="modal"
                  id="myModal"
                  v-bind:class="{ 'is-active': show_modal }"
                >
                  <div
                    class="modal-content is-vcentered"
                    @click="show_modal = !show_modal"
                  >
                    <img
                      :src="'http://localhost:3000/' + imgs.image_path"
                      alt="Image"
                    />
                  </div>
                </div>
              </div>
              <p style="font-size: 30px; text-align: center">
                ราคา {{ products.product_price }} บาท
              </p>
            </div>
            <div class="column">
              <h1 class="title is-2">{{ products.product_name }}</h1>
              <h2 class="subtitle is-4">{{ products.product_desc }}</h2>
              <br />
            </div>
          </div>
        </div>
      </div>

      <div class="hero-foot">
        <div class="container">
          <div class="tabs is-right">
            <ul>
              <li style="font-size: 22px">
                สินค้าคงเหลือ {{ products.product_amount }} ชิ้น
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<style>
.photo3 {
  width: 100%;
  min-height: 100vh;
  background-image: url(../assets/Coffee.png);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.pdicon-hot {
  background-image: url(../assets/Coffee.png);
}

.modal img {
  cursor: pointer;
  height: 100%;
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
      show_modal: false,
      products: {},
      images: [],
    };
  },
  mounted() {
    this.getDetail(this.$route.params.id);
  },
  methods: {
    getDetail(id) {
      axios
        .get(`http://localhost:3000/product/${id}`)
        .then((response) => {
          this.products = response.data.products;
          this.images = response.data.images;
          console.log(this.products);
          console.log(this.images);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
