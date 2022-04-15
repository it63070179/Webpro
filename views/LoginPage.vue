<template>
  <div>
    <div>
      <NavBar />
    </div>

    <p class="has-text-centered is-size-1 my-3">LOGIN</p>
    <div class="columns is-mutiline">
      <div class="column is-offset-4 is-4">
      <p class="is-size-4 my-2">Username</p>
      <input class="input my-2" type="text" placeholder="Text input">
      <p class="is-size-4 my-2">Password</p>
      <input class="input my-2" type="text" placeholder="Text input">
      <router-link to="/forgetpassword" class="has-text-black">
      <p class="my-2 has-text-right">Forgot Password</p>
      </router-link>
      </div>
    </div>
    <div class="columns is-mutiline">
      <div class="column is-offset-two-fifths is-2">
      <button class="button is-medium is-fullwidth ml-5 mb-6">login</button>
      <router-link to="/" class="has-text-black">
      <span class="ml-6 ">Need an account?</span><span class="ml-1 is-underlined">Sign up</span>
      </router-link>
      </div>
    </div>

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
