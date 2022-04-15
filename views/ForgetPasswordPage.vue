<template>
  <div>
    <div>
      <NavBar />
    </div>

    <p class="has-text-centered is-size-1 my-3">Forget Password</p>
    <div class="columns is-mutiline">
      <div class="column is-offset-4 is-4">
      <p class="is-size-4 my-2">Username</p>
      <input class="input my-2" type="text" placeholder="Text input">
      <p class="is-size-4 my-2">Email Address</p>
      <input class="input my-2" type="text" placeholder="Text input">
      <p class="is-size-4 my-2">New Password</p>
      <input class="input my-2" type="text" placeholder="Text input">
      </div>
    </div>
    <div class="columns is-mutiline">
      <div class="column is-offset-two-fifths is-2">
      <button class="button is-medium is-fullwidth ml-5 mb-6">Reset Password</button>
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
