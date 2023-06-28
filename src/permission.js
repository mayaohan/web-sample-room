import router from './router'

const whiteList = ['/login', '/authredirect']// no redirect whitelist

router.beforeEach((to, from, next) => {
  console.log(from.path,to.path,from.path == '/')
  // if(localStorage.getItem('token')==null){
  //   if (to.path === '/login') {
  //     next()
  //   } else {
  //     next({ path: '/login' })
  //   }
  // }else{
  //   next()
  // }
  if(to.path == '/login'){
    next({path:'/HomeView'})
  }else{
    next()
  }
  if(Cookies.get('userKey')==undefined){
    next({ path: '/index/home' })
  }else{
    next()
  }
})

router.afterEach(() => {
})
