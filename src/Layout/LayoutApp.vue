<script setup>
  import { h,onMounted,getCurrentInstance,ref,reactive} from 'vue'
  import { ElMessage } from 'element-plus'
  import { RouterLink, RouterView } from 'vue-router'
  // const Mousetrap = require('mousetrap');
  import Mousetrap from 'mousetrap';
  const { proxy } = getCurrentInstance()
  const { $t } = getCurrentInstance().proxy;
  const centerDialogVisible = ref(false)
  const form = reactive({
    resource: '',
  })
  const checked1 = ref(false)
  const forms = ref(null)
  const fontSize = ref(1)
  onMounted(()=>{
    Mousetrap.bind('command+shift+j', function() {
      console.log('command shift j');
      fontSize.value-=0.1
      const html_ = document.getElementsByTagName('html')[0];
      html_.style.fontSize = fontSize.value*100 +'px';
    });
    Mousetrap.bind('command+shift+k', function() {
      console.log('command shift k');
      fontSize.value+=0.1
      const html_ = document.getElementsByTagName('html')[0];
      html_.style.fontSize = fontSize.value*100 +'px';
    });
  })
  const closeToWindow = ()=>{
    forms.value.validate((valid) => {
      if (valid) {
        // console.log(form.resource)
      } else {
        // console.log('error submit!')
        return false
      }
    })
    const param = {
      close:form.resource==1?1:2,
      remember:checked1.value?1:2
    }
    centerDialogVisible.value = false
  }
</script>

<template>

  <div class="wrapper">
     <el-container class="layout-container-demo" style="height:calc(100vh - 80px)">
      <el-main style="padding:0;">
          <!-- <el-scrollbar> -->
          <RouterView />
          <!-- </el-scrollbar> -->
      </el-main>
    </el-container>
    <el-dialog
      v-model="centerDialogVisible"
      title="请选择"
      width="30%"
      align-center
    >
      <el-form :model="form" ref="forms">

        <el-form-item label="关闭时">
          <el-radio-group v-model="form.resource">
            <el-radio :label="1">最小化到托盘</el-radio>
            <el-radio :label="2">退出程序</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-checkbox style="float:left" v-model="checked1" disabled>记住选择，下次不在提示</el-checkbox>
          <el-button @click="centerDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="closeToWindow">
            确定
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>


</template>

<style scoped>
.wrapper {
  place-items: flex-start;
  flex-wrap: wrap;
  width:100%;
}
.el-main{
  width:100%;
}
.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }
  /* .wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 0 2rem;
  } */

  .logo {
    margin: 0 2rem 0 0;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
