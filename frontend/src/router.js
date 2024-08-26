import Vue from 'vue';
import Router from 'vue-router';
import MenuList from './components/MenuList.vue';
import MenuForm from './components/MenuForm.vue';

Vue.use(Router);

export default new Router({
  routes: [
    { path: '/', component: MenuList },
    { path: '/add', component: MenuForm }
  ]
});