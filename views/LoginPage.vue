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
              <form>
                <div class="field">
                  <div class="control">
                    <input
                      class="input is-large"
                      type="username"
                      placeholder="Username"
                      autofocus=""
                    />
                  </div>
                </div>

                <div class="field">
                  <div class="control">
                    <input
                      class="input is-large"
                      type="password"
                      placeholder="Password"
                    />
                  </div>
                </div>
                <div class="field">
                  <label class="checkbox">
                    <input type="checkbox" />
                    Remember me
                  </label>
                </div>
                <button class="button is-block is-info is-large is-fullwidth">
                  Login <i class="fa fa-sign-in" aria-hidden="true"></i>
                </button>
              </form>
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
import NavBar from "../components/NavBar";

export default {
  components: {
    NavBar,
  },
};
</script>
