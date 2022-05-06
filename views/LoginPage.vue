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
                    v-model="user_name"
                  />
                </div>
              </div>

              <div class="field">
                <div class="control">
                  <input
                    class="input is-large"
                    type="password"
                    placeholder="Password"
                    v-model="user_password"
                  />
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
  methods: {
    confirmLogin() {
      axios
        .post("http://localhost:3000/login", {
          user_name: this.user_name,
          user_password: this.user_password,
        })
        .then((res) => {
          if (res.data != 'Incorrect username or password' ) {
            localStorage.setItem('userid', res.data.user_id)
            localStorage.setItem('username', res.data.user_login)
            localStorage.setItem('role', res.data.role)
            this.$router.push({ name: "Home" });
          }
        });
    },
  },
};
</script>
