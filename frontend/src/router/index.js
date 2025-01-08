import Vue from 'vue';
import Router from 'vue-router';
import BoardList from '../components/BoardList.vue';
import BoardRegister from '../components/BoardRegister.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'BoardList',
      component: BoardList,
    },
    {
      path: '/register',
      name: 'BoardRegister',
      component: BoardRegister,
    }
  ]
});