import { createApp } from 'vue';
import App from './App.vue';
import store from './store';

createApp(App)
  .use(store)  // Register the store in Vue 3
  .mount('#app');