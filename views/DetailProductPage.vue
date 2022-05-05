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

              <h2 class="subtitle is-4">สามารถเลือกท็อปปิ้งได้</h2>
              <div
                v-for="val in topping"
                :key="val.product_id"
                style="float: left"
              >
                <div class="block">
                  <b-checkbox size="is-medium" style="margin: 30px">
                    {{ val.product_name }}
                  </b-checkbox>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="container">
        <center>
          <h2 class="subtitle is-3" style="padding: 40px; color: blue">
            รีวิวสินค้า
          </h2>
        </center>
        <div class="columns">
          <div class="column is-4">
            <input
              type="text"
              class="input is-link"
              v-model="reviewname"
              placeholder="Add Name "
            />
          </div>
          <div class="column is-8">
            <input
              type="text"
              class="input is-danger"
              v-model="$v.reviewTxt.$model"
              :class="{ 'is-danger': $v.reviewTxt.$error }"
              placeholder="Add new comment"
            />
            <template v-if="$v.reviewTxt.$error">
              <!-- เช็ค v-if ว่ามีค่า error หรือป่าวถ้ามี error จะแสดงขึ้นมา-->

              <p class="help is-danger" v-if="!$v.reviewTxt.required">
                This field is requried
              </p>
              <!-- ถ้าไม่ใส่ค่าอะไรเลยจะขึ้น error มา-->
            </template>
          </div>

          <div class="column is-4">
            <button class="button is-link is-outlined" @click="addreview()">
              Add Review
            </button>
          </div>
        </div>

        <div class="columns">
          <div class="column is-4">
            <button class="button" @click="boxgood()">
              good product quality
            </button>
          </div>
          <div class="column is-4">
            <button class="button" @click="boxlooks()">It looks so good</button>
          </div>
          <div class="column is-4">
            <button class="button">good value for money</button>
          </div>
        </div>
        <div
          class="box"
          style="width: 800px; border: 2px solid"
          v-for="(value, index) in reviewbox"
          :key="index"
        >
          <article class="media">
            <div class="media-left"></div>
            <div class="media-content">
              <div class="content">
                <p class="is-size-3">
                  {{ value.review_text }}
                </p>

                <input
                  v-if="
                    value.review_id == editSelectedReviews.review_id &&
                    editToggle == 1
                  "
                  type="text"
                  class="input"
                  v-model="editReviewMessage"
                  placeholder="edit Review Message"
                />
                <p class="is-size-4"><b>{{ value.review_box }}</b></p>
                <p class="is-size-4"><b>ชื่อ: {{ value.review_name }}</b></p>
                <p class="is-size-7">{{ value.review_time | formatDate }}</p>
              </div>

              <nav class="level">
                <div class="level-left">
                  <a
                    class="level-item"
                    aria-label="rating"
                    @click="addrating(value.review_id, index)"
                  >
                    <span class="icon is-small pr-3">
                      <i class="fa fa-star" aria-hidden="true"></i>
                    </span>
                    Rating Review ({{ value.review_point }})
                  </a>
                </div>

                <div class="level-right">
                  <div class="level-item">
                    <button
                      v-if="
                        editSelectedReviews.review_id != value.review_id ||
                        editToggle == -1
                      "
                      class="button is-info"
                      @click="clickEditComment(value, index)"
                    >
                      <span>Edit</span>
                      <span class="icon is-small">
                        <i class="fas fa-edit"></i>
                      </span>
                    </button>
                    <button
                      v-if="
                        editToggle == 1 &&
                        value.review_id == editSelectedReviews.review_id
                      "
                      class="button is-primary"
                      @click="saveEditReview(value.review_id, index)"
                    >
                      <span>Save Review</span>
                      <span class="icon is-small">
                        <i class="fa fa-pencil"></i>
                      </span>
                    </button>
                  </div>

                  <div class="level-item">
                    <button
                      v-if="
                        value.review_id != editSelectedReviews.review_id ||
                        editToggle == -1
                      "
                      class="button is-danger"
                      @click="DeleteReview(value.review_id, index)"
                    >
                      <span>Delete</span>
                      <span class="icon is-small">
                        <i class="fas fa-times"></i>
                      </span>
                    </button>
                    <button
                      v-if="
                        value.review_id == editSelectedReviews.review_id &&
                        editToggle == 1
                      "
                      class="button is-info is-outlined"
                      @click="editToggle = -1"
                    >
                      <span>Cancel</span>
                      <span class="icon is-small">
                        <i class="fas fa-times"></i>
                      </span>
                    </button>
                  </div>
                </div>
              </nav>
            </div>
          </article>
        </div>
      </div>
      <div class="hero-foot">
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

.carousel-pause {
  display: none;
}
</style>
<script>
import NavBar from "../components/NavBar";
import axios from "axios";
import { required } from "vuelidate/lib/validators";

export default {
  components: {
    NavBar,
  },
  data() {
    return {
      show_modal: false,
      products: {},
      images: [],
      topping: [],
      editToggle: -1,
      idpro: 0,
      reviewTxt: "",
      reviewname: "",
      reviewbox: {},
      editSelectedReviews: [],
      editReviewMessage: "",
      keep: '',
      cart: [],

    };
  },

  validations: {
    reviewTxt: {
      required,
    },
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
    getDetail(id) {
      this.idpro = id;
      axios
        .get(`http://localhost:3000/product/${id}`)
        .then((response) => {
          this.products = response.data.products;
          this.images = response.data.images;
          this.topping = response.data.topping;
          this.$set(this.products, "image_path", this.images[0].image_path);
          this.$set(this.products, "order_amount", 1);
          console.log(this.products);
          console.log(this.images);
        })
        .catch((err) => {
          console.log(err);
        });
      axios
        .get(`http://localhost:3000/review/${id}`)
        .then((response) => {
          this.reviewbox = response.data;
          console.log(this.reviewbox);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    addreview() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        axios
          .post(`http://localhost:3000/addreviews`, {
            product_id: this.idpro,
            review_text: this.reviewTxt,
            review_name: this.reviewname,
            review_box: this.keep
          })
          .then((response) => {
            this.reviewTxt = "";
            this.reviewname = "";
            this.keep = "",
            this.reviewbox = [...this.reviewbox, response.data[0]];
          })
          .catch((error) => {
            this.error = error.response.data.message;
          });
      }
    },

    clickEditComment(value) {
      this.editSelectedReviews = this.reviewbox.find(
        (val) => val.review_id === value.review_id
      );

      this.editReviewMessage = value.review_text;
      this.editToggle = 1;
    },

    saveEditReview(reviewId) {
      axios
        .put(`http://localhost:3000/editreview/${reviewId}`, {
          review_text: this.editReviewMessage,
        })
        .then((response) => {
          let selectedreview = this.reviewbox.find(
            (val) => val.review_id === reviewId
          );
          selectedreview.review_text = this.editReviewMessage;
          this.editToggle = -1;
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    DeleteReview(reviewId, index) {
      if (confirm("Are you sure you want delete review?")) {
        axios
          .delete(`http://localhost:3000/deletereview/${reviewId}`)
          .then((response) => {
            console.log(response);
            this.reviewbox.splice(index, 1);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        console.log("error");
      }
    },
    addrating(reviewId, index) {
      axios
        .put(`http://localhost:3000/addrating/${reviewId}`)
        .then((response) => {
          this.reviewbox[index].review_point = response.data.like;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    reviewboxadd(reviewId, index) {
      axios
        .put(`http://localhost:3000/selectboxone/${reviewId}`)
        .then((response) => {
          this.reviewbox[index].review_box = "";
          console.log(response)
        })
        .catch((err) => {
          console.log(err);
        });
    },
    boxgood(){
      this.keep = 'good product quality'
    },
    boxlooks(){
      this.keep = 'It looks so good'
    },
     saveProduct() {
      const cart = JSON.stringify(this.cart);
      localStorage.setItem("cart", cart);
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
