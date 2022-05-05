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

      <div class="hero-foot mb-3">
        <div class="container">
          <div class="tabs is-right">
            <ul>
              <li style="font-size: 22px">
                สินค้าคงเหลือ {{ products.product_amount }} ชิ้น
              </li>
              <i
                class="fas fa-cart-arrow-down ml-3"
                style="font-size: 30px; cursor: pointer"
                @click="addtoCart(products)"
              ></i>
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
      cart: [],
    };
  },
  mounted() {
    this.getDetail(this.$route.params.id);
    console.log(localStorage.getItem("cart"));
    this.checkCart();
  },
  beforeDestroy() {
    this.saveProduct();
  },
  methods: {
    saveProduct() {
      const cart = JSON.stringify(this.cart);
      localStorage.setItem("cart", cart);
    },
    getDetail(id) {
      axios
        .get(`http://localhost:3000/product/${id}`)
        .then((response) => {
          this.products = response.data.products;
          this.images = response.data.images;
          this.$set(this.products, "image_path", this.images[0].image_path);
          this.$set(this.products, "order_amount", 1);
          console.log(this.products);
          console.log(this.images);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addtoCart(product) {
      let sameproduct = this.cart.find(
        (element) => element.product_id == product.product_id
      );
      let indexsameproduct = this.cart.findIndex(
        (element) => element.product_id == product.product_id
      );
      console.log(indexsameproduct);
      if (sameproduct) {
        this.cart[indexsameproduct].order_amount += 1;
        console.log({ same: this.cart });
        return;
      }
      this.cart.push(this.products);
      console.log(this.cart);
    },
    checkCart() {
      let cartItem = JSON.parse(localStorage.getItem("cart"));
      if (cartItem.length != 0) {
        this.cart = cartItem;
        console.log({ cartlocal: this.cart });
      } else {
        console.log("no item in cart");
      }
    },
  },
};
</script>
