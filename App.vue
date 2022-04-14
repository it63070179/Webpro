<template>
  <div style="background-color: #f8dec7">
    <div id="abc">
      <router-view></router-view>
    </div>
    <div id="app">
      
    </div>

    <footer class="footer" style="background-color: #b08968">
      <div class="columns">
        <div class="column">
          <div class="content has-text-left">
            <p class="has-text-white">ติดต่อเรา</p>
            <p class="has-text-white">02-9876-5432</p>
          </div>
        </div>
        <div class="column">
          <div class="content has-text-centered">
            <p class="has-text-white">ติดต่อเรา</p>
            <p class="has-text-white">02-9876-5432</p>
          </div>
        </div>
        <div class="column">
          <div class="content has-text-right">
            <p class="has-text-white">ติดต่อเรา</p>
            <p class="has-text-white">02-9876-5432</p>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>


<script>
export default {
  name: "App",
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  margin-bottom: 60px;
}

#abc {
  background-color: transparent;
}

</style>
