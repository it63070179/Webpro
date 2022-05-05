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
          <article class="media" v-for="cart in cart" :key="cart.product_id">
            <figure class="media-left">
              <img :src="cart.image_path" />
            </figure>
            <div class="media-content">
              <div class="content" style="margin-left: 6vw; margin-top: 5vh">
                <p>
                  <strong>{{ cart.product_name }}</strong>
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
          <div
            style="margin-top: 20vh; padding-top: 5vh"
            v-for="(cart, index) in cart"
            :key="index"
          >
            <span style="margin-bottom: 10vh; margin-left: 10vw">{{
              cart.product_price
            }}</span>
            <span style="margin-bottom: 10vh; margin-left: 8.6vw">
              <a
                ><i
                  class="fas fa-minus"
                  style="color: #4a4a4a"
                  @click="reduceorderAmount(index)"
                ></i
              ></a>
              <a class="is-size-6 mx-5" style="color: #4a4a4a">{{
                cart.order_amount
              }}</a>
              <a
                ><i
                  class="fas fa-plus"
                  style="color: #4a4a4a"
                  @click="addorderAmount(index)"
                ></i></a
            ></span>
            <span style="margin-bottom: 10vh; margin-left: 8.8vw">{{
              cart.order_amount * cart.product_price
            }}</span>
            <i
              class="fas fa-trash-alt"
              style="margin-left: 2vw; font-size: 20px"
              @click="ModalActive(index)"
            ></i>
            <div class="modal" :class="{ 'is-active': isModalActive }">
              <div class="modal-background"></div>
              <div class="modal-card">
                <header class="modal-card-head">
                  <p class="modal-card-title"></p>
                  <button
                    class="delete"
                    aria-label="close"
                    @click="isModalActive = false"
                  ></button>
                </header>
                <section class="modal-card-body">
                  {{ textinModal }}
                </section>
                <footer class="modal-card-foot">
                  <button class="button is-danger" @click="deleteProduct()">
                    ใช่
                  </button>
                  <button class="button" @click="isModalActive = false">
                    ยกเลิก
                  </button>
                </footer>
              </div>
            </div>
          </div>
        </div>
        <div class="column is-3 is-offset-9 mt-2">
          <p class="is-size-3">ราคารวม {{ sumPriceProduct }} ฿</p>
        </div>
      </div>
      <div class="buttons has-addons is-right mr-5 mb-3 mt-1">
        <button
          class="button is-medium is-warning is-light has-text-grey-darker mr-6"
          @click="OrderItem()"
        >
          <div>
            <!-- <router-link :to="{ path: `/order/` + OrderNum }"> -->
            สั่งซื้อสินค้า
            <!-- </router-link> -->
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "../components/NavBar";
import axios from "axios";
export default {
  components: {
    NavBar,
  },
  data() {
    return {
      cart: [],
      isModalActive: false,
      textinModal: "",
      sumPrice: 0,
      delete: null,
      OrderNum: 0,
    };
  },
  mounted() {
    console.log(localStorage.getItem("cart"));
    this.checkCart();
  },
  methods: {
    saveProduct() {
      const cart = JSON.stringify(this.cart);
      localStorage.setItem("cart", cart);
    },
    addorderAmount(index) {
      this.cart[index].order_amount += 1;
      console.log(this.cart[index]);
      this.sumPrice = 0;
      this.saveProduct();
    },
    reduceorderAmount(index) {
      this.cart[index].order_amount -= 1;
      console.log(this.cart[index]);
      this.sumPrice = 0;
      this.saveProduct();
    },
    ModalActive(index) {
      console.log(index);
      this.delete = index;
      this.textinModal =
        "คุณต้องการลบสินค้าชิ้นที่(" + Number(index + 1) + ")ใช่หรือไม่";
      this.isModalActive = true;
    },
    deleteProduct() {
      let del = this.cart.splice(this.delete, 1);
      console.log(del);
      this.sumPrice = 0;
      this.saveProduct();
      this.isModalActive = false;
    },
    OrderItem() {
      axios
        .post(`http://localhost:3000/order/${this.$route.params.id}`, {
          cart: this.cart,
          sumPrice: this.sumPrice,
        })
        .then((response) => {
          this.OrderNum = response.data.orderId;
          console.log(this.OrderNum);
          this.$router.push({
            path: `/order/${this.OrderNum}`,
            params: { orderNum: this.OrderNum },
          });
        })
        .catch((error) => {
          this.error = error.response.data.message;
        });
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
  computed: {
    sumPriceProduct() {
      this.cart.forEach((element) => {
        this.sumPrice += element.product_price * element.order_amount;
      });
      return this.sumPrice;
    },
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
}

.media + .media {
  margin-top: 0;
}

.columns:last-child {
  margin-bottom: 0;
}

.modal-card-foot {
  justify-content: flex-end;
}
</style>
