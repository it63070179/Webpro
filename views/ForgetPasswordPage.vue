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
                      type="Email"
                      placeholder="Email"
                    />
                  </div>
                </div>

                <div class="field">
                  <div class="control">
                    <input
                      class="input is-large"
                      type="newpassword"
                      placeholder="New Password"
                    />
                  </div>
                </div>
                <button class="button is-block is-info is-large is-fullwidth">
                  Reset Password <i class="fa fa-sign-in" aria-hidden="true"></i>
                </button>
              </form>
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
import NavBar from "../components/NavBar";

export default {
  components: {
    NavBar,
  },
};
</script>
