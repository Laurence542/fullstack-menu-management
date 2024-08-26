import Vue from 'vue';
import Router from 'vue-router';
import MenuList from '@/components/MenuList.vue';
import MenuDetail from '@/components/MenuDetail.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MenuList',
      component: MenuList
    },
    {
      path: '/menu/:id',
      name: 'MenuDetail',
      component: MenuDetail
    }
  ]
});
