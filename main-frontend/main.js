import Vue from 'vue'
import App from './App.vue'
import 'buefy/dist/buefy.css'
import Buefy from 'buefy'
import router from './router/index'
import Vuelidate from 'vuelidate'
import moment from 'moment'


Vue.use(Buefy)
Vue.use(Vuelidate)
Vue.config.productionTip = false

Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('YYYY/MM/DD hh:mm:ss')
  }
});

new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router,
  render: h => h(App),
}).$mount('#app')
