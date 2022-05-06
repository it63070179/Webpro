<template>
  <div>
    <div>
      <NavBar />
    </div>

    <section class="hero is-fullheight">
      <div class="hero-body">
        <div class="container has-text-centered">
          <div class="column is-4 is-offset-4">
            <h3 class="title has-text-black">Forgot Password</h3>
            <hr class="login-hr" />
            <div class="box">
              <div class="field">
                <div class="control">
                  <input
                    class="input is-large"
                    type="username"
                    placeholder="Username"
                    v-model="username"
                  />
                </div>
              </div>

              <div class="field">
                <div class="control">
                  <input
                    class="input is-large"
                    type="Email"
                    placeholder="Email"
                    v-model="email"
                  />
                </div>
              </div>

              <div class="field">
                <div class="control">
                  <input
                    class="input is-large"
                    type="newpassword"
                    placeholder="New Password"
                    v-model="$v.newpassword.$model"
                    :class="{ 'is-danger': $v.newpassword.$error }"
                  />
                  <template v-if="$v.newpassword.$error">
                    <!-- เช็ค v-if ว่ามีค่า error หรือป่าวถ้ามี error จะแสดงขึ้นมา-->

                    <p class="help is-danger" v-if="!$v.newpassword.required">
                      This field is requried
                    </p>
                    <!-- ถ้าไม่ใส่ค่าอะไรเลยจะขึ้น error มา-->

                    <p
                      class="help is-danger"
                      v-if="!$v.newpassword.minLength"
                    >
                      Password must be at least 8 letters
                    </p>
                    <!-- ถ้าใส่ค่า password ไม่ถึง8 ตัว จะขึ้น error-->

                    <p
                      class="help is-danger"
                      v-if="!$v.newpassword.complexPassword"
                    >
                      Password must be harder
                    </p>
                    <!-- ถ้าใส่ค่า password ไม่ถึง8 ตัว จะขึ้น error-->
                  </template>
                </div>
              </div>
              <button
                class="button is-block is-large is-fullwidth"
                style="background-color: #633f38; color: #f8dec7"
                @click="resetPassword()"
              >
                Reset Password
                <i class="fa fa-sign-in" aria-hidden="true"></i>
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
import { required, email, minLength } from "vuelidate/lib/validators";

function complexPassword(value) {
  if (!(value.match(/[a-z]/) && value.match(/[A-Z]/) && value.match(/[0-9]/))) {
    return false;
  }
  return true;
}

export default {
  components: {
    NavBar,
  },
  data() {
    return {
      username: "",
      email: "",
      newpassword: "",
    };
  },
  validations: {
      email: {
        required,
        email,
      },
      newpassword: {
        required,
        minLength: minLength(8),
        complexPassword,
      },
    },
  methods: {
    resetPassword() {
      this.$v.$touch();

      // เช็คว่าในฟอร์มไม่มี error
      if (!this.$v.$invalid) {
        //ถ้าค่า invalid เป็น true หมายความว่ามีค่าตัวใดตัวนึงใน form ที่มีปัญหาอยู่ ถ้าเป็น false จะผ่านหมด
        let data = {
          user_name: this.username,
          email: this.email,
          userpassword: this.newpassword,
        };

        axios.put(`http://localhost:3000/forgetpassword`, data).then((res) => {
          alert (res.data)
          this.$router.push({ name: "Login" });
        });
      }
    },
    
  },
};
</script>
