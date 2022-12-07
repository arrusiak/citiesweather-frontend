import Vue from 'vue';
import VueToast from 'vue-toast-notification';
// Import one of the available themes
//import 'vue-toast-notification/dist/theme-default.css';
import 'vue-toast-notification/dist/theme-sugar.css';

const toast = Vue.use(VueToast, {
  position: 'bottom-right',
  duration: 3000
});

export default toast