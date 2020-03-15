import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "../views/login/Login";
import Home from "@/views/home/Home";
import Welcome from "@/views/home/childComps/Welcome";
import Users from "@/views/users/Users";
import Right from "@/views/right/Right";
import Roles from "@/views/right/Roles";
import Goods from "@/views/goods/Goods";
import Params from "@/views/goods/Params";
import Categories from "@/views/goods/Categories";
import Orders from "@/views/orders/Orders";
import Reports from "@/views/reports/Reports";


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login,
    name: 'login'
  },
  {
    path: '/home',
    component: Home,
    name: 'home',
    redirect:'welcome',
    children:[
      {
        path:'/welcome',
        component:Welcome,
        name:'welcome'
      },
      {
        path:'/users',
        component: Users,
      },
      {
        path:'/rights',
        component: Right,
      },
      {
        path:'/roles',
        component: Roles
      },
      {
        path:'/goods',
        component:Goods
      },
      {
        path:'/params',
        component:Params
      },
      {
        path:'/categories',
        component:Categories
      },
      {
        path:'/orders',
        component:Orders
      },
      {
        path:'/reports',
        component:Reports
      }
    ]
  },

];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

//挂载路由导航守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  const tokenId = window.sessionStorage.getItem('token')
  if (!tokenId) {
    next('/login')
  }
  next()
})
export default router
