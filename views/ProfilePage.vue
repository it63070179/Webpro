<template>
  <div>
    <div>
      <NavBar />
    </div>

    <section class="hero is-fullheight">
      <div class="hero-body">
        <div class="container has-text-centered">
          <div class="column is-6 is-offset-3">
            <img src="../assets/profile.png" style="width: 30%" />
            <div class="mt-6">
              <div v-if="editToggle == 0">
                <div class="field">
                  <div class="control">
                    <input
                      class="input is-medium is-rounded"
                      type="username"
                      v-model="fname"
                      readonly
                    />
                  </div>
                </div>

                <div class="field">
                  <div class="control">
                    <input
                      class="input is-medium is-rounded"
                      type="username"
                      v-model="lname"
                      readonly
                    />
                  </div>
                </div>

                <div class="field">
                  <div class="control">
                    <input
                      class="input is-medium is-rounded"
                      type="name"
                      v-model="address"
                      readonly
                    />
                  </div>
                </div>

                <div class="field">
                  <div class="control">
                    <input
                      class="input is-medium is-rounded"
                      type="telephone"
                      v-model="phone"
                      readonly
                    />
                  </div>
                </div>

                <div class="field">
                  <div class="control">
                    <input
                      class="input is-medium is-rounded"
                      type="email"
                      v-model="age"
                      readonly
                    />
                  </div>
                </div>

                <div class="field" v-if="role == 'customer'">
                  <div class="control">
                    <input
                      class="input is-medium is-rounded"
                      type="telephone"
                      v-model="email"
                      readonly
                    />
                  </div>
                </div>

                <div class="field" v-if="role == 'customer'">
                  <div class="control">
                    <input
                      class="input is-medium is-rounded"
                      type="telephone"
                      v-model="point"
                      readonly
                    />
                  </div>
                </div>

                <button
                  class="button is-block is-medium is-fullwidth is-rounded"
                  @click="editProfile()"
                  style="background-color: #633f38; color: #f8dec7"
                >
                  แก้ไข <i class="fas fa-edit"></i>
                </button>
              </div>
              <div v-if="editToggle == 1">
                <div class="field">
                  <div class="control">
                    <input
                      class="input is-medium is-rounded"
                      type="username"
                      v-model="fname"
                    />
                  </div>
                </div>

                <div class="field">
                  <div class="control">
                    <input
                      class="input is-medium is-rounded"
                      type="username"
                      v-model="lname"
                    />
                  </div>
                </div>

                <div class="field">
                  <div class="control">
                    <input
                      class="input is-medium is-rounded"
                      type="name"
                      v-model="address"
                    />
                  </div>
                </div>

                <div class="field">
                  <div class="control">
                    <input
                      class="input is-medium is-rounded"
                      type="telephone"
                      v-model="phone"
                    />
                  </div>
                </div>

                <div class="field">
                  <div class="control">
                    <input
                      class="input is-medium is-rounded"
                      type="email"
                      v-model="age"
                    />
                  </div>
                </div>

                <div class="field" v-if="role == 'customer'">
                  <div class="control">
                    <input
                      class="input is-medium is-rounded"
                      type="telephone"
                      v-model="email"
                    />
                  </div>
                </div>

                <div class="field" v-if="role == 'customer'">
                  <div class="control">
                    <input
                      class="input is-medium is-rounded"
                      type="telephone"
                      v-model="point"
                      readonly
                    />
                  </div>
                </div>

                <div class="columns mt-6">
                  <button
                    class="
                      button
                      is-block is-info is-medium is-fullwidth is-rounded
                    "
                    @click="saveEditProfile()"
                    style="background-color: #633f38; color: #f8dec7"
                  >
                    ยืนยัน
                  </button>

                  <button
                    class="
                      button
                      is-block is-info is-medium is-fullwidth
                      ml-4
                      is-rounded
                    "
                    style="background-color: #633f38; color: #f8dec7"
                    @click="cancel"
                  >
                    ยกเลิก
                  </button>
                </div>
              </div>
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
      address: "",
      age: "",
      fname: "",
      phone: "",
      lname: "",
      editToggle: 0,
      email: "",
      role: "",
      point: 0,
    };
  },
  mounted() {
    this.role = localStorage.getItem("role");
    this.getProfile();
  },
  methods: {
    getProfile() {
      if (this.role == "employee") {
        axios
          .get(
            `http://localhost:3000/profile/employee/` +
              localStorage.getItem("userid")
          )
          .then((res) => {
            console.log(res.data);

            this.age = res.data.age;
            this.lname = res.data.lname;
            this.fname = res.data.fname;
            this.phone = res.data.phone;
            this.address = res.data.address;
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        axios
          .get(
            `http://localhost:3000/profile/customer/` +
              localStorage.getItem("userid")
          )
          .then((res) => {
            console.log(res.data);
            this.age = res.data.age;
            this.lname = res.data.lname;
            this.fname = res.data.fname;
            this.phone = res.data.phone;
            this.address = res.data.address;
            this.email = res.data.email;
            this.point = res.data.cus_point;
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    editProfile() {
      this.editToggle = 1;
    },
    saveEditProfile() {
      if (this.role == "employee") {
        axios
          .put(
            `http://localhost:3000/profile/editemployee/` +
              localStorage.getItem("userid"),
            {
              fname: this.fname,
              lname: this.lname,
              address: this.address,
              phone: this.phone,
              age: this.age,
            }
          )
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        axios
          .put(
            `http://localhost:3000/profile/editcustomer/` +
              localStorage.getItem("userid"),
            {
              fname: this.fname,
              lname: this.lname,
              address: this.address,
              phone: this.phone,
              age: this.age,
              email: this.email,
            }
          )
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      }
      
      this.editToggle = 0;
    },
    cancel(){
      this.editToggle = 0;
    }
  },
};
</script>
