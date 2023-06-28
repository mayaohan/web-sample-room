import { createRouter, createWebHistory,createWebHashHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import Layout from '../views/Layout/Layout.vue'
import store from '@/utils/cacheUtils'
import Cookies from 'js-cookie'
// noCache值为true的路由将不会被
// store.clear()
const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHashHistory(),
  mode: 'hash',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue'),
      hidden: true
    },
    {
      path:'/',
      redirect: '/index/home',
      hidden: true
    },
    {
      path: '/404',
      component: () => import('@/views/404.vue'),
      hidden:true
    },
    {
      path: '/401',
      component: () => import('@/views/401.vue'),
      hidden:true
    },
    {
      path: '/500',
      component: () => import('@/views/500.vue'),
      hidden:true
    },
    {
      // 找不到路由重定向到404页面
      path: '/:pathMatch(.*)',
      component: () => import('../views/404.vue'),
      redirect: '/index/home',
      hidden:true
    },
  ]
})
// 初始化首页
router.addRoute({
  path: '/index',
  name: 'dds',
  redirect: '/index/home',
  component: Layout,
  // component:HomeView,
  meta: { title: 'dds', icon: 'dashboard', noCache: false },
  children:[
    {
      path: '/index/home',
      name: 'home',
      component: () => import('@/views/home/index.vue'),
      meta: { title: 'home', icon: 'dashboard', noCache: false }
    }
  ]
})
/**
 * 拆解路由数据存储路由表
 * @param {JSON} route 要拆解的路由表
 * @param {Array<Object>} routes 路由表输出
 * @param {Number} i 菜单级别
 * @param {Number} role 用户权限等级
 */
const luo = (route,routes = [],i=2,role=100)=>{
  const child = []
  route.map(obj=>{
    if(obj.pid==undefined&&role>=obj.switch){
      routes.push({
        ...obj,
        component: ()=>import(/* @vite-ignore */ `${obj.component}`)
      })
    }else{
      child.push({
        ...obj,
        component: ()=>import(/* @vite-ignore */ `${obj.component}`)
      })
    }
  })

  i++
  routes.map((obj,idx)=>{
    child.map(ob=>{
      if(obj.id==ob.pid&&role>=ob.switch){
        if(obj.children==undefined){
          routes[idx].children = [ob]
        }else{
          routes[idx].children.push(ob)
        }
        let leave = child.filter(item=>item.leave==i)
        if(leave.length>0){
          luo(child,routes[idx].children[idx],i)
        }
      }
    })
  })

}

let route = store.get('route')
const role = store.get('role')
console.log(route,role)
let loginRole = ''
if(route==undefined||route.length==0){
  route = []
}
const user = Cookies.get('userKey')

const relRoute = route.map(obj=>{
  return {
    ...obj,
    component: ()=>import(/* @vite-ignore */ `${obj.component}`)
  }
})
if(user!=undefined&&role!=null){
  loginRole = role.role[user.split('/')[0]]
}

let routes = []
luo(route,routes,2,loginRole)
routes.unshift(
  {
    path: '/index/home',
    name: 'home',
    component: () => import('@/views/home/index.vue'),
    meta: { title: 'home', icon: 'dashboard', noCache: false }
  }
)
store.set('routerList',routes)


router.addRoute({
  path: '/index',
  name: 'dds',
  redirect: '/index/home',
  component: Layout,
  // component:HomeView,
  meta: { title: 'dds', icon: 'dashboard', noCache: false },
  children:relRoute.concat([
    {
      path: '/index/home',
      name: 'home',
      component: () => import('@/views/home/index.vue'),
      meta: { title: 'home', icon: 'dashboard', noCache: false }
    }
  ])
})


export default router
