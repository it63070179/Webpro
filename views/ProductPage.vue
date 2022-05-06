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
        <router-link to="/addproduct" v-if="role == 'employee'">
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
      <div
        class="column is-4"
        v-for="bake in bakery"
        :key="bake.id"
        v-show="bake.product_status == 'available' && bake.show_status == 'show'"
      >
        <router-link to="/detailproduct/:id" style="color: black">
          <img
            :src="'http://localhost:3000/' + bake.image_path"
            style="width: 400px; height: 200px"
          />
          <p>{{ bake.product_name }}</p>
        </router-link>
        <router-link
          :to="`/editproduct/${bake.product_id}`"
          style="color: black"
          v-if="role == 'employee'"
        >
          <i class="fas fa-edit" style="font-size: 20px"></i>
        </router-link>
        <i
          class="fas fa-trash-alt ml-3"
          style="font-size: 20px"
          @click="modalProduct(bake.product_id)"
          v-if="role == 'employee'"
        ></i>
      </div>
      <div
        class="column is-4"
        v-for="bake in bakery"
        :key="bake.id"
        v-show="bake.product_status == 'out of stock' && bake.show_status == 'show'"
      >
        <img
          :src="'http://localhost:3000/' + bake.image_path"
          style="width: 400px; height: 200px"
        />
        <p>{{ bake.product_name }} (สินค้าหมด)</p>
        <router-link
          :to="`/editproduct/${bake.product_id}`"
          style="color: black"
          v-if="role == 'employee'"
        >
          <i class="fas fa-edit" style="font-size: 20px"></i>
        </router-link>
        <i
          class="fas fa-trash-alt ml-3"
          style="font-size: 20px"
          @click="modalProduct(bake.product_id)"
          v-if="role == 'employee'"
        ></i>
      </div>
    </div>

    <p class="has-text-centered has-text-white is-size-1 my-3">เครื่องดื่ม</p>

    <div class="columns is-multiline mx-3 mb-6 has-text-centered">
      <div
        class="column is-4"
        v-for="dr in drink"
        :key="dr.id"
        v-show="dr.product_status == 'available' && dr.show_status == 'show'"
      >
        <router-link to="/detailproduct/:id" style="color: black">
          <img
            :src="'http://localhost:3000/' + dr.image_path"
            style="width: 400px; height: 200px"
          />
          <p>{{ dr.product_name }}</p>
        </router-link>
        <router-link
          :to="`/editproduct/${dr.product_id}`"
          style="color: black"
          v-if="role == 'employee'"
        >
          <i class="fas fa-edit" style="font-size: 20px"></i>
        </router-link>
        <i
          class="fas fa-trash-alt ml-3"
          style="font-size: 20px"
          @click="modalProduct(dr.product_id, index)"
          v-if="role == 'employee'"
        ></i>
      </div>
      <div
        class="column is-4"
        v-for="dr in drink"
        :key="dr.id"
        v-show="dr.product_status == 'out of stock' && dr.show_status == 'show'"
      >
        <img
          :src="'http://localhost:3000/' + dr.image_path"
          style="width: 400px; height: 200px"
        />
        <p>{{ dr.product_name }} (สินค้าหมด)</p>
        <router-link
          :to="`/editproduct/${dr.product_id}`"
          style="color: black"
          v-if="role == 'employee'"
        >
          <i class="fas fa-edit" style="font-size: 20px"></i>
        </router-link>
        <i
          class="fas fa-trash-alt ml-3"
          style="font-size: 20px"
          @click="modalProduct(dr.product_id)"
          v-if="role == 'employee'"
        ></i>
      </div>
    </div>

    <div>
      <b-modal v-model="isCardModalActive" style="width: 100%">
        <div class="card">
          <div class="card-content">
            <div class="media">
              <div class="media-content">
                <p style="text-align: center; font-size: 32px">
                  ต้องการลบสินค้าที่ {{ deleteproduct }} หรือไม่
                </p>
              </div>
            </div>

            <div class="content">
              <button
                class="button is-success is-outlined"
                style="margin-left: 200px; width: 100px"
                @click="deleteProduct(deleteproduct)"
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
      isCardModalActive: false,
      deleteproduct: null,
      role: ''
    };
  },
  mounted() {
    this.getBakery();
    this.getDrink();
    this.role = localStorage.getItem("role");
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
    modalProduct(productId) {
      this.isCardModalActive = true;
      this.deleteproduct = productId;
      console.log(productId);
    },
    deleteProduct(productId) {
      axios
        .put(`http://localhost:3000/product/delete/${productId}`)
        .then((response) => {
          console.log(response);
          axios
            .get("http://localhost:3000/product/bakery")
            .then((response) => {
              this.bakery = response.data;
            })
            .catch((err) => {
              console.log(err);
            });
          axios
            .get("http://localhost:3000/product/drink")
            .then((response) => {
              this.drink = response.data;
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });

      this.isCardModalActive = false;
    },
  },
};
</script>
