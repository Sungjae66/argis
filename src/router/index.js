import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: (resolve) => {
        require(['../views/login'], resolve)
      }
    },
    {
      path: '/',
      name: 'index',
      redirect:'/home',
      meta: {
        requireAuth: true
      },
      component: (resolve) => {
        require(['../views/Home'], resolve)
      },
      children: [
        {
          path: '/home',
          name: 'home',
          meta: {
            requireAuth: true
          },
          component: (resolve) => {
            require(['../views/Home'], resolve)
          }
        }
      ]
    }
  ]
});
// 判断是否需要登录权限 以及是否登录
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireAuth)) {// 判断是否需要登录权限
    if (localStorage.getItem('token')) {// 判断是否登录
      next()
    } else {// 没登录则跳转到登录界面
      next({
        path: '/login'
      });
      localStorage.setItem('redirect', to.fullPath);
    }
  } else {
    next()
  }
});

export default router
