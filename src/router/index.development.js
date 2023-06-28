import { createRouter, createWebHistory,createWebHashHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import Layout from '../views/Layout/Layout.vue'

// noCache值为true的路由将不会被

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
      path: '/',
      name: 'dds',
      redirect: '/home',
      component: Layout,
      // component:HomeView,
      meta: { title: 'dds', icon: 'dashboard', noCache: false },
      children:[
        {
          path: '/home',
          name: 'home',
          component: () => import('@/views/home/index.vue'),
          meta: { title: 'home', icon: 'dashboard', noCache: false }
        },
        {
          path: '/HomeView',
          name: 'HomeView',
          component: () => import('../views/HomeView.vue'),
          meta: { title: 'HomeView', icon: 'dashboard', noCache: false },
        },
        {
          path: '/job',
          name: 'job',
          component: () => import('../views/systemJob/index.vue'),
          meta: { title: 'Job', icon: 'dashboard', noCache: false }
        },
        {
          path: '/about',
          name: 'AboutView',
          component: () => import('../views/AboutView.vue'),
          meta: { title: 'AboutView', icon: 'dashboard', noCache: false },
        },
        {
          path: '/createwindow',
          name: 'createwindow',
          component: () => import('../views/CreateWindow.vue'),
          meta: { title: 'createwindow', icon: 'dashboard', noCache: true },
          hidden:true
        },
        {
          path: '/someChart',
          name: 'someChart',
          component: () => import('../views/ChartDemo/index.vue'),
          meta: { title: 'ChartDemo', icon: 'dashboard', noCache: false },
          children:[
            {
              path: 'Chart',
              name: 'Chart',
              component: () => import('../views/Chart.vue'),
              meta: { title: 'Chart', icon: 'dashboard', noCache: false }
            },
            {
              path: 'ChartLine',
              name: 'ChartLine',
              component: () => import('../views/ChartLine.vue'),
              meta: { title: 'ChartLine', icon: 'dashboard', noCache: false }
            },

            {
              path: 'ChartZu',
              name: 'ChartZu',
              component: () => import('../views/ChartZu.vue'),
              meta: { title: 'ChartZu', icon: 'dashboard', noCache: false }
            },
          ]
        },
        {
          path: '/Grid',
          name: 'Grid',
          component: () => import('../views/GridLayouts.vue'),
          meta: { title: 'Grid', icon: 'dashboard', noCache: false }
        }
      ]
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
      // 找不到路由重定向到404页面
      path: '/:pathMatch(.*)',
      component: () => import('../views/404.vue'),
      redirect: '/404',
      hidden:true
    },
  ]
})

export default router
