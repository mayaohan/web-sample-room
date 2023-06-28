<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { get } from '../../utils/request-al'
import { useRouter,useRoute } from 'vue-router'
import Cookies from 'js-cookie'
import store from '@/utils/cacheUtils'
const userName = ref('___')
const router = useRouter()
const route = useRoute()

function mockTest() {
  get('/api/getName')
    .then((res) => {

      userName.value = res[1].data.userName.name;
    })
    .catch((err) => {
      ElMessage({
        type: 'error',
        message: err.message
      })
    });
}
function mockRoute() {
  get('/api/getRoute')
    .then((res) => {
      store.set('route',res[1].data.route)
      store.set('role',res[1].data.role)
      window.location.reload()
      // router.addRoute
    })
    .catch((err) => {
      ElMessage({
        type: 'error',
        message: err.message
      })
    });
}
</script>

<template>
  <div>
    <h1>home content</h1>
    <div>
      <button @click="mockTest" class="App-button">数据mock</button>
      <button @click="mockRoute" class="App-button">动态路由</button>
      <p>姓名: {{ userName }}</p>
    </div>

    事例:{{$t('components.tinymceTips')}}
  </div>
  <!-- <div class="ddscontainer"></div> -->
</template>


<style lang="scss" scoped>
.App-button {
  margin-top: 30px;
  padding: 12px 48px;
  border-radius: 16px;
  background-color: #0aeeee;
  box-shadow: 0 4px 10px rgba(135, 167, 171, 0.5);
  font-size: 14px;
  color: rgb(16, 1, 1);
  font-weight: 500;
  text-shadow: 0 0.5px 1px rgba(0, 0, 0, 0.5);
  outline: none;
  cursor: pointer;
}
</style>
