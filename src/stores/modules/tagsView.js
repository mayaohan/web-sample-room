import { defineStore } from "pinia";
import store from '@/utils/cacheUtils'

export const tagsView = defineStore({
  id: "geeker-auth",
  state: () => ({
    visitedViews: [
      {
        name: 'home',
        path: '/index/home',
        title: 'home'
      }
    ],
    cachedViews: ['home'],
    routerList:store.get('routerList')||[
      {
        name: 'home',
        path: '/index/home',
        title: 'home'
      }
    ]
  }),
  getters: {
    // 按钮权限列表
    // authButtonListGet: state => state.authButtonList,
  },
  actions: {
    setRouterList(param){
      this.routerList = param
    },
    delAllViews(){
        this.visitedViews = [
          {
            name: 'home',
            path: '/index/home',
            title: 'home'
          }
        ]
        this.cachedViews = ['home']
    },
    delOthersViews (view){
      this.visitedViews = this.visitedViews.filter(obj=>obj.path==view.path||obj.path=='/')
      this.cachedViews = this.cachedViews.filter(obj=>obj==view.name||obj=='home')
    },
    delVisitedViews (view) {
      if(view.path=='/index/home') return
      // console.log(view,this.visitedViews)
      for (const [i, v] of this.visitedViews.entries()) {
        if (v.path === view.path) {
          this.visitedViews.splice(i, 1)
          break
        }
      }
      for (const i of this.cachedViews) {
        if (i === view.name) {
          const index = this.cachedViews.indexOf(i)
          this.cachedViews.splice(index, 1)
          break
        }
      }
    },
    addVisitedViews (view) {
      // console.log(this.cachedViews.indexOf(view.name)<=0)
      console.log(view.path,view.name)
      if (this.visitedViews.some(v => v.path === view.path)||view.path == '/') return
        this.visitedViews.push({
          name: view.name,
          path: view.path,
          title: view.meta.title || 'no-name'
        })
      if (!view.meta.noCache||view.path == '/index/home') {
        this.cachedViews.indexOf(view.name)<0&&this.cachedViews.push(view.name)
      }
    },
    delRightViews (tag,route){
      const i = this.visitedViews.findIndex(e=>e.path==tag.path)
      // console.log(i)
      this.visitedViews.splice(i+1)
      this.cachedViews.splice(i+1)
      if(this.visitedViews.find(e=>e.path==route.path)==undefined){
        return this.visitedViews[this.visitedViews.length-1]
      }else{
        return 1
      }

    }
  }
});
