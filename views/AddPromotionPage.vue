<template>
  <div>
    <div>
      <NavBar />
    </div>

    <section class="hero is-fullheight">
      <div class="hero-body">
        <div class="container has-text-centered">
          <div class="column">
            <div class="field">
              <label class="file-label" style="margin-left:570px">
                <input
                  class="file-input"
                  type="file"
                  ref="pro_image"
                  name="pro_image"
                  @change="selectFile"
                />

                <span class="file-cta">
                  <span class="file-icon">
                    <i class="fas fa-upload"></i>
                  </span>
                  <span class="file-label"> Choose an image… </span>
                </span>
                <span v-if="file" class="file-name">{{ file.name }}</span>
              </label>
            </div>
            <br />

            <div class="field">
              <div class="control">
                <input
                  class="input is-medium"
                  type="text"
                  placeholder="Promotion Name"
                  v-model="pro_name"
                />
              </div>
            </div>
            <br />

            <div class="field">
              <div class="control">
                <date-picker
                  v-model="start_date"
                  type="datetime"
                  style="padding: 5px"
                  placeholder="Start Date"
                ></date-picker>
                <date-picker
                  v-model="expired_date"
                  type="datetime"
                  style="padding: 5px"
                  placeholder="Expired Date"
                ></date-picker>
              </div>
            </div>
            <br />
            <div class="field">
              <div class="control">
                <textarea
                  class="textarea is-medium"
                  type="text"
                  placeholder="Description"
                  v-model="pro_detail"
                />
              </div>
            </div>
            
            <div class="columns mt-6">
              <button
                class="button is-block is-info is-medium"
                style="background-color: #633f38; color: #f8dec7; width:150px; margin-left:500px"
                @click="addpromo()"
              >
                ยืนยัน
              </button>
              <router-link to="/adminpromotion"><button
                class="button is-block is-info is-medium ml-4"
                style="background-color: #633f38; color: #f8dec7; width:150px"
              >
                ยกเลิก
              </button></router-link>
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
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";

export default {
  components: {
    NavBar,
    DatePicker,
  },
  data() {
    return {
      pro_name: "",
      start_date: null,
      expired_date: null,
      pro_detail: "",
      pro_image: "",
      datestart: "",
      dateend: "",
      file: "",

    };
  },
  methods: {
    selectFile(event) {
      this.file = event.target.files[0];
    },

    addpromo() {
      this.datestart = new Date(this.start_date)
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");
      this.dateend = new Date(this.expired_date)
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");

      const formData = new FormData();
      formData.append("pro_name", this.pro_name);
      formData.append("start_date", this.datestart);
      formData.append("expired_date", this.dateend);
      formData.append("pro_detail", this.pro_detail);
      formData.append("pro_image", this.file);
      console.log(this.file);

      axios
        .post("http://localhost:3000/promotion/add", formData)
        .then((res) => {
          this.file = res.data;
          this.$router.push({ name: "Adminpromotion" });
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
