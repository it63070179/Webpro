<template>
  <div>
    <div>
      <NavBar />
    </div>

    <section class="hero is-fullheight">
      <div class="hero-body">
        <div class="container has-text-centered">
          <div class="column is-4 is-offset-4">
            <h3 class="title has-text-black">Login</h3>
            <hr class="login-hr" />
            <p class="subtitle has-text-black">Please login to proceed.</p>
            <div class="box">
              <div class="field">
                <div class="control">
                  <input
                    class="input is-large"
                    type="username"
                    placeholder="Username"
                    v-model="$v.user_name.$model"
                    :class="{ 'is-danger': $v.user_name.$error }"
                  />
                  <template v-if="$v.user_name.$error">
                    <!-- เช็ค v-if ว่ามีค่า error หรือป่าวถ้ามี error จะแสดงขึ้นมา-->

                    <p class="help is-danger" v-if="!$v.user_name.required">
                      This field is requried
                    </p>
                    <!-- ถ้าไม่ใส่ค่าอะไรเลยจะขึ้น error มา-->

                    <p class="help is-danger" v-if="!$v.user_name.minLength">
                      Username must be at least 4 letters
                    </p>
                    <!-- ถ้าใส่ค่า username ไม่ถึง5 ตัว จะขึ้น error-->

                    <p class="help is-danger" v-if="!$v.user_name.maxLength">
                      Username must not more than 20 letters
                    </p>
                    <!-- ถ้าใส่ค่า username เกิน 20 ตัว จะขึ้น error-->
                  </template>
                </div>
              </div>

              <div class="field">
                <div class="control">
                  <input
                    class="input is-large"
                    type="password"
                    placeholder="Password"
                    v-model="$v.user_password.$model"
                    :class="{ 'is-danger': $v.user_password.$error }"
                  />
                  <template v-if="$v.user_password.$error">
                    <!-- เช็ค v-if ว่ามีค่า error หรือป่าวถ้ามี error จะแสดงขึ้นมา-->

                    <p class="help is-danger" v-if="!$v.user_password.required">
                      This field is requried
                    </p>
                    <!-- ถ้าไม่ใส่ค่าอะไรเลยจะขึ้น error มา-->

                    <p
                      class="help is-danger"
                      v-if="!$v.user_password.minLength"
                    >
                      Password must be at least 8 letters
                    </p>
                    <!-- ถ้าใส่ค่า password ไม่ถึง8 ตัว จะขึ้น error-->

                    <p
                      class="help is-danger"
                      v-if="!$v.user_password.complexPassword"
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
                @click="confirmLogin"
              >
                Login <i class="fa fa-sign-in" aria-hidden="true"></i>
              </button>
            </div>
            <p class="has-text-grey">
              <router-link to="/signup" class="has-text-black">
                <span>Sign Up</span> &nbsp;·&nbsp;
              </router-link>
              <router-link to="/forgetpassword" class="has-text-black">
                <span>Forgot Password</span> &nbsp;
              </router-link>
            </p>
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
import { required, maxLength, minLength } from "vuelidate/lib/validators";

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
      user_name: "",
      user_password: "",
    };
  },
  validations: {
    user_password: {
      required,
      minLength: minLength(8),
      complexPassword,
    },
    user_name: {
      required,
      minLength: minLength(4),
      maxLength: maxLength(20),
    },
  },
  methods: {
    confirmLogin() {
      axios
        .post("http://localhost:3000/login", {
          user_name: this.user_name,
          user_password: this.user_password,
        })
        .then((res) => {
          if (res.data != "Incorrect username or password") {
            localStorage.setItem("userid", res.data.user_id);
            localStorage.setItem("username", res.data.user_login);
            localStorage.setItem("role", res.data.role);
            this.$router.push({ name: "Home" });
          } else {
            alert(res.data);
          }
        });
    },
  },
};
</script>
