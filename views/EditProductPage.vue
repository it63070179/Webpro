<template>
  <div>
    <div>
      <NavBar />
    </div>

    <section class="hero is-fullheight">
      <div class="hero-body">
        <div class="container">
          <div class="column is-4 is-offset-4">
            <img v-for="img in images" :key="img.id"
            :src="'http://localhost:3000/' + img.image_path"
            style="width: 400px; height: 200px"
          />
            <div class="field">
              <label class="file-label">
                <input class="file-input" type="file" name="resume" />
                <span class="file-cta">
                  <span class="file-icon">
                    <i class="fas fa-upload"></i>
                  </span>
                  <span class="file-label"> รูปสินค้า เลือกได้มากกว่า 1 </span>
                </span>
                <input
                  class="file-input"
                  multiple
                  type="file"
                  name="myImage"
                  accept="image/png, image/jpeg, image/webp"
                  @change="selectImages"
                />
              </label>
            </div>

            <div v-if="pic" class="columns is-multiline">
              <div
                v-for="(pic, index) in pic"
                :key="pic.id"
                class="column is-one-quarter"
              >
                <div class="card">
                  <div class="card-image">
                    <figure class="image is-4by3">
                      <img
                        :src="showSelectImage(pic)"
                        alt="Placeholder image"
                      />
                    </figure>
                  </div>
                  <footer class="card-footer">
                    <a
                      @click="deleteSelectImage(index)"
                      class="card-footer-item has-text-danger"
                      >Delete</a
                    >
                  </footer>
                </div>
              </div>
            </div>

            <div class="field">
              <div class="control">
                <strong>ชื่อสินค้า</strong>
                <input
                  class="input is-medium"
                  type="productname"
                  placeholder="Product Name"
                  v-model="productname"
                />
              </div>
            </div>

            <div class="field">
              <div class="control">
                <strong>รายละเอียดสินค้า</strong>
                <textarea
                  class="textarea"
                  type="Description"
                  placeholder="Description"
                  v-model="productdesc"
                />
              </div>
            </div>

            <div class="field">
              <div class="control">
                <strong>ราคาสินค้า</strong>
                <input
                  class="input is-medium"
                  type="productprice"
                  placeholder="Product Price"
                  v-model="productprice"
                />
              </div>
            </div>

            <div class="field">
              <div class="control">
                <strong>ประเภทสินค้า</strong>
                <div class="select is-fullwidth is-medium">
                  <select v-model="selectedtype">
                    <option v-for="type in type" :key="type.value">
                      {{ type.text }}
                    </option>
                  </select>
                </div>
              </div>
            </div>

            <div class="field">
              <div class="control">
                <strong>สถานะของสินค้า</strong>
                <div class="select is-fullwidth is-medium">
                  <select v-model="selectedstatus">
                    <option v-for="stat in status" :key="stat.value">
                      {{ stat.text }}
                    </option>
                  </select>
                </div>
              </div>
            </div>

            <div class="field">
              <div class="control">
                <strong>จำนวนสินค้า</strong>
                <input
                  class="input is-medium"
                  type="productamount"
                  placeholder="Product Amount"
                  v-model="productamount"
                />
              </div>
            </div>

            <div class="columns mt-6">
              <button
                class="button is-block is-info is-medium is-fullwidth"
                style="background-color: #633f38; color: #f8dec7"
                @click="editProduct(productId)"
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
    return {
      images: [],
      pic: [],
      productId: 0,
      productname: "",
      productdsec: "",
      productprice: "",
      productamount: "",
      selectedtype: "",
      type: [
        { text: "drink", value: "drink" },
        { text: "bakery", value: "bakery" },
        { text: "option", value: "option" },
      ],
      selectedstatus: null,
      status: [
        { text: "available", value: "available" },
        { text: "out of stock", value: "out of stock" },
      ],
    };
  },
  mounted() {
    this.getProduct(this.$route.params.id);
  },
  methods: {
    getProduct(id) {
      axios
        .get(`http://localhost:3000/product/${id}`)
        .then((response) => {
          console.log(response.data);
          this.productId = response.data.products.product_id;
          this.productname = response.data.products.product_name;
          this.productdesc = response.data.products.product_desc;
          this.productprice = response.data.products.product_price;
          this.productamount = response.data.products.product_amount;
          this.images = response.data.images;
          this.selectedtype = response.data.products.product_type;
          this.selectedstatus = response.data.products.product_status;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    selectImages(event) {
      this.pic = event.target.files;
    },
    showSelectImage(pic) {
      // for preview only
      return URL.createObjectURL(pic);
    },
    deleteSelectImage(index) {
      console.log(this.pic);
      this.pic = Array.from(this.pic);
      this.pic.splice(index, 1);
    },
    editProduct() {
      let formData = new FormData();
      formData.append("product_name", this.productname);
      formData.append("product_desc", this.productdesc);
      formData.append("product_price", this.productprice);
      formData.append("product_type", this.selectedtype);
      formData.append("product_status", this.selectedstatus);
      formData.append("product_amount", this.productamount);
      Array.from(this.pic).forEach((image) => {
        formData.append("myImage", image);
      });
      axios
        .post(`http://localhost:3000/product/edit/${this.productId}`, formData)
        .then((response) => {
          this.$router.push({ name: "Product" });
          console.log(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
