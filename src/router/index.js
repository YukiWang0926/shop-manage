import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "../components/content/Login";
import Home from "@/views/home/Home";


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect:'/login'
  },
  {
    path:'/login',
    component:Login,
    name:'login'
  },
  {
    path:'/home',
    component:Home,
    name:'home'
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

//挂载路由导航守卫
router.beforeEach((to,from,next)=>{
  if (to.path==='/login') return next()
  const tokenId = window.sessionStorage.getItem('token')
  if (!tokenId) { next('/login')}
  next()
})
export default router
