
<template>
	<el-config-provider :size="size" :z-index="zIndex" :locale="locale">
		<layout-app></layout-app>
	</el-config-provider>
</template>

<script>
import LayoutApp from './Layout/LayoutApp.vue'

import { defineComponent } from 'vue'
import { ElConfigProvider } from 'element-plus'
import zh from 'element-plus/es/locale/lang/zh-cn'
import './assets/var.scss'
export default defineComponent({
	components: {
		ElConfigProvider,
		LayoutApp
	},
	setup() {
    // console.log(AlipayCcmImSdk)
		return {
			zIndex: 3000,
      size: 'small',
      locale: zh
		}
	}


})

</script>

<style scoped>
</style>
