import { defineStore } from "pinia";
import Cookies from 'js-cookie'
import store from '@/utils/cacheUtils'
// console.log(Cookies.get('userKey'))
export const user = defineStore({
  id: "user-auth",
  state: () => ({
    user:Cookies.get('userKey'),
    localhostUser:store.get('userList')
  }),
  getters: {
    // 按钮权限列表
    // authButtonListGet: state => state.authButtonList,
  },
  actions: {
    setLoginKey (view){
      this.user = view.split('/')[0]
      console.log(view)
      Cookies.set('userKey',view)
      console.log(store.get('userList'))
      let arr = store.get('userList')
      let ex = 0
      if(arr == undefined){
        arr = []
      }else{
        arr.map(obj=>{
          if(obj.user==view.split('/')[0]){
            ex++
          }
        })
      }
      if(ex==0){
        arr.push(
          {
            user:view.split('/')[0],
            password:view.split('/')[1]
          }
        )
        store.set('userList',arr)
      }
    },
    removeLoginKey(){
      Cookies.remove('userKey')
      this.user = ''
      this.localhostUser = store.get('userList')
    },
    changeUser(param){
      this.user = param.user
      Cookies.set('userKey',param.user+'/'+param.password)
    }

  }
});
