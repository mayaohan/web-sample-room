<script setup>
import Cookies from 'js-cookie';
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n';
import { user } from "@/stores/modules/user"
import {reactive, toRefs,getCurrentInstance,onMounted,h,ref} from 'vue'
import { tagsView } from "@/stores/modules/tagsView"
import { useRouter } from 'vue-router'
import store from '@/utils/cacheUtils'
import { get } from '@/utils/request-al'
const authStore = tagsView();
const router = useRouter()
const getUser = user();

const i18n = useI18n()
const centerDialogVisible = ref(false)
function mockRoute() {
  get('/api/getRoute')
    .then((res) => {
      store.set('route',res[1].data.route)
      store.set('role',res[1].data.role)
      window.location.reload()
      // router.addRoute
    })
    .catch((err) => {
    });
}
const handleSetLanguage = (param) => {
  if(param == 'exit'){
    store.remove('route')
    getUser.removeLoginKey()
    authStore.delAllViews()
    store.remove('routerList')
    window.location.reload()
  }else{
    console.log(getUser.localhostUser)
    centerDialogVisible.value = true
  }
}
const changeUser = (param)=>{
  getUser.changeUser(param)
  centerDialogVisible.value = false
  mockRoute()
}
</script>

<template>
  <el-dropdown @command="handleSetLanguage">
    <span class="el-dropdown-link">
      {{getUser.user}}
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="other"> 切换用户 </el-dropdown-item>
        <el-dropdown-item command="exit"> 退出登录 </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  <el-dialog v-model="centerDialogVisible" title="切换用户" width="30%" center>
    <div class="formBox">
        <div v-for="size in getUser.localhostUser" :key="size" class="block" @click="changeUser(size)">
          <el-avatar :size="15" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
          <p class="font"> {{ size.user}}</p>
        </div>
    </div>
  </el-dialog>
</template>

<style lang="scss" scoped>
// .el-dropdown-link{
//   width:25px;
// }
// .img {
//   width: 25px;
//   height: 25px;
// }
.block{
  display:flex;
  align-items: center;
  .font{
    padding-left:10px;
    min-width:200px;
    &:hover{
      color:red;
    }
  }
}
</style>
