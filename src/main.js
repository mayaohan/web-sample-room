import './assets/main.scss'
import * as echarts from 'echarts'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import VueAwesomeSwiper from 'vue-awesome-swiper';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import './permission'
import i18n from './lang'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'
import { mockStart } from '../mock/index';
import VXETablePluginExportXLSX from 'vxe-table-plugin-export-xlsx'
import Websocket from '@/utils/websocket.js';
VXETable.use(VXETablePluginExportXLSX)

function useTable() {
  app.use(VXETable)
}
const { VITE_MOCK } = import.meta.env || {};
if (VITE_MOCK === 'true') {
  console.log('已开启数据mock！', import.meta.env);
  mockStart();
}

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.config.globalProperties.$websocket = new Websocket('ws://localhost:5173')
app.config.globalProperties.$echarts = echarts
app.use(VueAwesomeSwiper)
app.use(createPinia())
app.use(router)
app.use(useTable)
app.use(i18n)

app.mount('#app')
