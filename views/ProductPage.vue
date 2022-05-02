<template>
  <div>
    <div class="photo2">
      <NavBar />
    </div>

    <div class="columns">
      <div class="column is-4 is-offset-4">
        <p class="has-text-centered has-text-white is-size-1 my-3">เบเกอรี่</p>
      </div>
      <div class="column mt-5 is-4 is-offset-2">
        <router-link to="/addproduct">
          <button
            class="button is-medium"
            style="background-color: #633f38; color: #f8dec7"
          >
            เพิ่มสินค้า
          </button>
        </router-link>
      </div>
    </div>

    <div class="columns is-multiline mx-3 has-text-centered">
      <div class="column is-4" v-for="bake in bakery" :key="bake.id">
        <router-link to="/adminproduct" style="color: black">
          <img :src="bake.image_path" style="width: 100%" />
          <p>{{ bake.product_name }}</p>
        </router-link>
        <router-link :to="`/editproduct/${bake.id}`" style="color:black">
          <i class="fas fa-edit" style="font-size: 20px"></i>
        </router-link>
          <i class="fas fa-trash-alt ml-3" style="font-size: 20px"></i>
      </div>
    </div>

    <p class="has-text-centered has-text-white is-size-1 my-3">เครื่องดื่ม</p>

    <div class="columns is-multiline mx-3 mb-6 has-text-centered">
      <div class="column is-4" v-for="dr in drink" :key="dr.id">
        <router-link to="/payment" style="color: black">
          <img :src="dr.image_path" style="width: 100%" />
          <p>{{ dr.product_name }}</p>
        </router-link>
        <router-link :to="`/editproduct/${dr.id}`" style="color:black">
          <i class="fas fa-edit" style="font-size: 20px"></i>
        </router-link>
          <i class="fas fa-trash-alt ml-3" style="font-size: 20px"></i>
      </div>
    </div>
  </div>
</template>

<style>
.photo2 {
  width: 100%;
  min-height: 100vh;
  background-image: url(../assets/product.png);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
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
      bakery: [],
      drink: [],
    };
  },
  mounted() {
    this.getBakery();
    this.getDrink();
  },
  methods: {
    getBakery() {
      axios
        .get("http://localhost:3000/product/bakery")
        .then((response) => {
          this.bakery = response.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getDrink() {
      axios
        .get("http://localhost:3000/product/drink")
        .then((response) => {
          this.drink = response.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
