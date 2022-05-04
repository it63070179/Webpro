<template>
  <section>
    <div class="photo4">
      <NavBar />
    </div>
    <br />
    <br />
    <br />
    <br />
    <div
      class="hero-body"
      v-for="(items, index) in orders"
      :key="items.order_id"
      v-show="items.order_status == 'pending'"
    >
      <nav class="level">
        <div class="level-item has-text-centered">
          <div>
            <p class="title">คำสั่งซื้อที่ {{ items.order_id }}</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="title">{{ items.order_datetime | formatDate }}</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="title">{{ items.order_status }}</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <button class="button is-black" @click="yes(items, index)">
              ยืนยัน
            </button>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <button class="button is-black" @click="no(items, index)">
              ยกเลิก
            </button>
          </div>
        </div>
      </nav>
    </div>
  </section>
</template>
<style>
.photo4 {
  width: 100%;
  min-height: 70vh;
  background-image: url(../assets/cupcoffee.jpg);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
<script>
import axios from "axios";
import NavBar from "../components/NavBar";

export default {
  components: {
    NavBar,
  },
  data() {
    return {
      orders: [],
    };
  },
  mounted() {
    this.getOrderitem();
  },
  methods: {
    getOrderitem() {
      axios
        .get("http://localhost:3000/manageorder")
        .then((response) => {
          console.log(response.data);
          this.orders = response.data;
        })
        .catch((error) => {
          this.error = error.response.data.message;
        });
    },
    yes(order, index) {
      axios
        .put(`http://localhost:3000/yes/${order.order_id}`)
        .then(() => {
          this.orders[index].order_status = "sold";
        })
        .catch((err) => {
          console.log(err);
        });
    },
    no(order, index) {
      axios
        .put(`http://localhost:3000/no/${order.order_id}`)
        .then(() => {
          this.orders[index].order_status = "canceled";
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
