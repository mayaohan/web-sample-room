<script setup>
import Cookies from 'js-cookie';
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n';

const i18n = useI18n()

const handleSetLanguage = (lang) => {
  i18n.locale.value = lang;
  Cookies.set('language', lang);
  ElMessage({
    message: 'Switch Language Success',
    type: 'success',
  });
}
</script>

<template>
  <el-dropdown @command="handleSetLanguage">
    <span class="el-dropdown-link">
      <img class="img" src="@/assets/international.svg" alt="" />
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="zh"> 中文 </el-dropdown-item>
        <el-dropdown-item command="en"> English </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style lang="scss" scoped>
.el-dropdown-link{
  width:25px;
}
.img {
  width: 25px;
  height: 25px;
}
</style>
