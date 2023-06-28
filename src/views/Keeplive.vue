<script setup>
  import {reactive, toRefs,getCurrentInstance,onMounted,h,ref} from 'vue'
  import { ElMessage } from 'element-plus'
  import BusinessModule from '@/components/BusinessModule.vue'
  import { loginApi, getUserInfoApi } from '@/api'
  const { proxy } = getCurrentInstance()
  const { $t } = getCurrentInstance().proxy;
  console.log($t(("route.dashboard")))
  const views = [
    {
      type: 'vue',
      content: '/#/createwindow',
      windowName: 'window-1',
      windowTitle: 'new window'
    },
  ]
  const popFormData = reactive({})
  const options = [
    {label:'菜单1',value:1},
    {label:'菜单2',value:2},
    {label:'菜单3',value:3},
  ]
  const apis = ref(null)
  // 模拟登陆
  const login = ()=> {
    loginApi({ username: "lzp", password: "666" }).then((res) => {
      // console.log(res);
      apis.value = res
    });
  }
  // 表单提交
  const submit = ()=>{
    console.log(popFormData)
  }
  const system = ()=>{

  }
</script>

<template>
  <!--el-form 父组件-->
  <el-form
    ref="ruleForm"
    label-position="top"
    label-width="110px"
    :model="popFormData"
    style="padding: 20px"
    >
    <!--封装的子组件-->
    <business-module :child-form-data="popFormData" :select-option="options"/>
    <el-select
      v-model="popFormData.businessModule"
      class="filter"
      clearable
      filterable
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <el-button @click="submit" type="primary">提交</el-button>
  </el-form>
</template>
