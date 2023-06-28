

<script setup>
  import { useRouter,useRoute } from 'vue-router'
  import {reactive, toRefs,getCurrentInstance,onMounted,h,ref,watch} from 'vue'
  import LangSelect from '@/components/LangSelect.vue'
  import SingleCenter from '@/components/SingleCenter.vue'
  import { user } from "@/stores/modules/user"
  import { tagsView } from "@/stores/modules/tagsView"
  import store from '@/utils/cacheUtils'
  import { get } from '@/utils/request-al'
  const authStore = tagsView();
  const getUser = user();
  const { proxy } = getCurrentInstance()
  const centerDialogVisible = ref(false)
  const router = useRouter()
  const route = useRoute()
  const visit = ref(false)
  const routeArr = reactive(router.getRoutes().find(obj=>obj.name=='dds'));
  const arr = reactive(authStore.routerList)
  const input2 = ref('')
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
  const toTher = (param)=>{
      if(param.children&&param.children.length>0) return
      console.log(param.path)
      router.push(param.path)
  }
  const activeIndex = ref({})
  const setListData = (param)=>{
      activeIndex.value = param
      // console.log(param)
      visit.value = true
  }
  const removeListData = ()=>{
      visit.value = false
  }
  // form

  const ruleFormRef = ref()

  const validatePass = (rule, value, callback) => {
    if (value === '') {
      callback(new Error('请输入密码'))

    } else {
      if (ruleForm.pass !== '') {
        if (!ruleFormRef.value) return
      }
      callback()
    }
  }

  const ruleForm = reactive({
    name: '',
    pass: '',
  })

  const rules = reactive({
    name: [{required: true, message:'请输入', trigger: 'blur'}],
    pass: [{ required: true,validator: validatePass, trigger: 'blur' }],
  })

  const submitForm = (formEl) => {
    if (!formEl) return
    formEl.validate((valid) => {
      if (valid) {
        console.log('submit!')
        console.log(ruleForm)
        centerDialogVisible.value = false
        getUser.setLoginKey(ruleForm.name+'/'+ruleForm.pass)
        mockRoute()
      } else {
        console.log('error submit!')
        return false
      }
    })
  }

  const resetForm = (formEl) => {
    if (!formEl) return
    formEl.resetFields()
  }
</script>

<template>
    <div class="navLayout" @mouseleave="removeListData">
    <!-- <div class="navLayout"> -->

        <ul class="firstList" mode="horizontal">
            <li class="firstList logo">
                <!-- <img src="src/assets/logo.png" style="width:24px;"/> -->
            </li>
            <li class="firstList back"><el-icon><Back /></el-icon></li>
            <li class="firstList forward"><el-icon><Right /></el-icon></li>
            <template v-for="(obj,idx) in arr">
              <li @mousemove="setListData(obj)" @click="toTher(obj)" v-if="!obj.hidden">{{obj.name}}</li>
            </template>

        </ul>
        <ul class="rightButtonGroup firstList">
            <li style="position:relative;top:-2px;">
                <el-input v-model="input2" class="w-50 m-2" placeholder="搜索" prefix-icon="Search"
                />
            </li>
            <li style="color:#505050;position:relative;top:-2px;">|</li>
            <li class=""><el-icon><Memo /></el-icon></li>
            <li style="color:#505050;position:relative;top:-2px;">|</li>
            <li class=""><el-icon><Headset /></el-icon></li>
            <li class=""><el-icon><Bell /></el-icon></li>
            <li><LangSelect class="lang" /></li>
            <li class="" v-if="getUser.user!=''&&getUser.user!=undefined"><SingleCenter /></li>
            <li v-else><el-button @click="centerDialogVisible = true" type="primary">登录</el-button></li>
        </ul>
        <transition name="slide">
            <div class="selectAllDown" v-show="visit" v-if="activeIndex.children!=undefined&&activeIndex.children.length>0">
                <slot :item="activeIndex"></slot>
            </div>
        </transition>
        <el-dialog v-model="centerDialogVisible" title="登录" width="30%" center>
          <div class="formBox">
            <el-form
              ref="ruleFormRef"
              :model="ruleForm"
              status-icon
              :rules="rules"
              label-width="60px"
              class="demo-ruleForm"
            >
              <el-form-item label="用户" prop="name">
                <el-input v-model.number="ruleForm.name" />
              </el-form-item>
              <el-form-item label="密码" prop="pass">
                <el-input v-model="ruleForm.pass" type="password" autocomplete="off" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm(ruleFormRef)"
                  >登录</el-button
                >
                <el-button @click="resetForm(ruleFormRef)">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-dialog>
    </div>
</template>


<style lang="scss" scoped>
    .navLayout{
        width:100%;
        height:34px;
        background:#000;
        position:relative;
        display:flex;
        justify-content:space-between;
        // color:#fff;
        .firstList{
            float:left;
            li{
                padding:5px 10px;
                height:36px;
                float:left;
                color:#fff;
                cursor: pointer;
                &:not(:first-child):hover{
                    background:#505050;
                }
                display:flex;
                align-items: center;
                justify-content: center;
            }
        }
        .selectAllDown{
            min-height:100px;
            position:absolute;
            left:0;
            top:34px;
            background:#fff;
            color:#505050;
            width:100%;
            z-index:9999;
            box-shadow: var(--el-box-shadow-light);
        }
    }
</style>
