<template>
  <div>
    <div>
      <NavBar />
    </div>

    <section class="hero is-fullheight">
      <div class="hero-body">
        <div class="container has-text-centered">
          <div class="column is-4 is-offset-4">
            <form>
              <div class="field">
                <div class="control">
                  <div class="file is-centered">
                    <label class="file-label">
                      <input class="file-input" type="file" name="resume" />
                      <span class="file-cta">
                        <span class="file-icon">
                          <i class="fas fa-upload"></i>
                        </span>
                        <span class="file-label"> Choose a file… </span>
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              <div class="field">
                <div class="control">
                  <input
                    class="input is-medium"
                    type="productname"
                    placeholder="Product Name"
                    :value="products.product_name"
                  />
                </div>
              </div>

              <div class="field">
                <div class="control">
                  <textarea
                    class="textarea"
                    type="Description"
                    placeholder="Description"
                    :value="products.product_desc"
                  />
                </div>
              </div>

              <div class="field">
                <div class="control">
                  <input
                    class="input is-medium"
                    type="productprice"
                    placeholder="Product Price"
                    :value="products.product_price"
                  />
                </div>
              </div>

              <div class="field">
                <div class="control">
                  <div class="select is-fullwidth is-medium">
                    <select v-model="selectedtype">
                      <option v-for="type in type" :key="type.value">
                        {{type.text}}
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              <div class="field">
                <div class="control">
                  <div class="select is-fullwidth is-medium">
                    <select v-model="selectedstatus">
                      <option v-for="stat in status" :key="stat.value">
                        {{stat.text}}
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              <div class="field">
                <div class="control">
                  <input
                    class="input is-medium"
                    type="productamount"
                    placeholder="Product Amount"
                    :value="products.product_amount"
                  />
                </div>
              </div>

              <div class="columns mt-6">
                <button
                  class="button is-block is-info is-medium is-fullwidth"
                  style="background-color: #633f38; color: #f8dec7"
                >
                  ยืนยัน
                </button>
                <button
                  class="button is-block is-info is-medium is-fullwidth ml-4"
                  style="background-color: #633f38; color: #f8dec7"
                >
                  ยกเลิก
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<style>
</style>

<script>
import axios from "axios";
import NavBar from "../components/NavBar";

export default {
  components: {
    NavBar,
  },
  data() {
    return{
      products: {},
      images: [],
      selectedtype: null,
      type: [
        {text: 'drink', value: 'drink'},
        {text: 'bakery', value: 'bakery'},
        {text: 'option', value: 'option'},
      ],
      selectedstatus: null,
      status: [
        {text: 'available', value: 'available'},
        {text: 'out of stock', value: 'out of stock'},
      ],
    };
  },
  mounted() {
    this.getProduct(this.$route.params.id)
  },
  methods: {
    getProduct(id){
       axios
        .get(`http://localhost:3000/product/${id}`)
        .then((response) => {
          this.products = response.data.products;
          this.images = response.data.images;
          this.selectedtype = response.data.products.product_type;
          this.selectedstatus = response.data.products.product_status;
          console.log(this.products);
          console.log(this.images);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  }
};
</script>
