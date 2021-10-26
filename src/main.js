import Vue from 'vue';
import App from './App.vue';
import { value1, value2 } from './values';
import showValue from './showValue';

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');

showValue(value1);
showValue(value2);
