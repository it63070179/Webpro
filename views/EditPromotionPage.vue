<template>
  <div>
    <div>
      <NavBar />
    </div>

    <section class="hero is-fullheight">
      <div class="hero-body">
        <div class="container has-text-centered">
          <div class="column">
            <div class="field" style="margin-left: 565px">
              <label class="file-label">
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
                <b
                  ><p style="font-size: 20px; color: #633f38">
                    แก้ไขชื่อโปรโมชัน
                  </p></b
                >
                <input
                  class="input is-medium"
                  type="productname"
                  placeholder="Promotion Name"
                  v-model="$v.pro_name.$model"
                  :class="{ 'is-danger': $v.pro_name.$error }"
                />
              </div>
              <template v-if="$v.pro_name.$error">
                <!-- เช็ค v-if ว่ามีค่า error หรือป่าวถ้ามี error จะแสดงขึ้นมา-->

                <p
                  class="help is-danger"
                  style="font-size: 20px"
                  v-if="!$v.pro_name.required"
                >
                  This field is requried
                </p>
              </template>
            </div>
            <br />

            <br />
            <div class="field">
              <div class="control">
                <div class="columns">
                  <div class="column">
                    <b
                      ><p style="font-size: 20px; color: #633f38">
                        แก้ไขวันเริ่มโปรโมชัน
                      </p></b
                    >
                    <date-picker
                      v-model="$v.start_date.$model"
                      :class="{ 'is-danger': $v.start_date.$error }"
                      type="datetime"
                      placeholder="Start Date"
                    ></date-picker>
                    <template v-if="$v.start_date.$error">
                      <!-- เช็ค v-if ว่ามีค่า error หรือป่าวถ้ามี error จะแสดงขึ้นมา-->

                      <p
                        class="help is-danger"
                        style="font-size: 20px"
                        v-if="!$v.start_date.required"
                      >
                        This field is requried
                      </p>
                    </template>
                  </div>

                  <div class="column">
                    <b
                      ><p style="font-size: 20px; color: #633f38">
                        แก้ไขวันหมดโปรโมชัน
                      </p></b
                    >
                    <date-picker
                      v-model="$v.expired_date.$model"
                      :class="{ 'is-danger': $v.expired_date.$error }"
                      type="datetime"
                      placeholder="Expired Date"
                    ></date-picker>
                    <template v-if="$v.expired_date.$error">
                      <!-- เช็ค v-if ว่ามีค่า error หรือป่าวถ้ามี error จะแสดงขึ้นมา-->

                      <p
                        class="help is-danger"
                        style="font-size: 20px"
                        v-if="!$v.expired_date.required"
                      >
                        This field is requried
                      </p>
                    </template>
                  </div>
                </div>
              </div>
            </div>

            <br />
            <div class="field">
              <div class="control">
                <b
                  ><p style="font-size: 20px; color: #633f38">
                    แก้ไขรายละเอียดโปรโมชัน
                  </p></b
                >
                <textarea
                  class="textarea"
                  v-model="$v.pro_detail.$model"
                  :class="{ 'is-danger': $v.pro_detail.$error }"
                  type="Description"
                  placeholder="Promotion Detail"
                />
              </div>
              <template v-if="$v.pro_detail.$error">
                <!-- เช็ค v-if ว่ามีค่า error หรือป่าวถ้ามี error จะแสดงขึ้นมา-->

                <p
                  class="help is-danger"
                  style="font-size: 20px"
                  v-if="!$v.pro_detail.required"
                >
                  This field is requried
                </p>
              </template>
            </div>
            <br />
            <div class="columns mt-6" style="margin-left:500px">
              <button
                class="button is-block is-info is-medium ml-4"
                style="background-color: #633f38; color: #f8dec7 ; width: 150px; "
                @click="saveEdit(promotionId)"
              >
                ยืนยัน
              </button>
              <router-link to="/adminpromotion"><button
                class="button is-block is-info is-medium ml-4"
                style="background-color: #633f38; color: #f8dec7 ; width: 150px;"
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
import { required } from "vuelidate/lib/validators";

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
      promotionId: 0,
      pro_image: "",
      datestart: "",
      dateend: "",
      images: [],
      promotions: {},
      file: "",
    };
  },
  validations: {
    pro_name: {
      required,
    },
    pro_detail: {
      required,
    },
    start_date: {
      required,
    },
    expired_date: {
      required,
    },
  },
  mounted() {
    this.getPromotion(this.$route.params.promoId);
  },
  methods: {
    selectFile(event) {
      this.file = event.target.files[0];
    },
    getPromotion(promoId) {
      axios
        .get(`http://localhost:3000/editpromotion/${promoId}`)
        .then((response) => {
          this.promotionId = response.data.promotions.pro_id;
          this.pro_name = response.data.promotions.pro_name;
          this.datestart = response.data.promotions.datestart;
          this.dateend = response.data.promotions.dateend;
          this.pro_detail = response.data.promotions.pro_detail;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    saveEdit() {
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

      axios
        .put(
          `http://localhost:3000/saveeditpromo/${this.promotionId}`,
          formData
        )

        .then((res) => {
          this.file = res.data;
          this.$router.push({ name: "Adminpromotion" });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
