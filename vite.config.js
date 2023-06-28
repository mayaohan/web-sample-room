import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { visualizer } from "rollup-plugin-visualizer";

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// import Components from "unplugin-vue-components/vite"
// import { ElementPlusResolver } from "unplugin-vue-components/resolvers"

// https://vitejs.dev/config/
export default defineConfig(({mode})=>{
  console.log(mode === "development" ? "开发环境 " + mode : "生产环境 " + mode)
  return {
  publicDir:false,
  plugins: [
    vue(),
    visualizer({
      open: true, //在默认用户代理中打开生成的文件
      gzipSize: true, //从源代码中收集 gzip 大小并将其显示在图表中
      brotliSize: true //从源代码中收集 brotli 大小并将其显示在图表中
    }),
    AutoImport({
			resolvers: [ElementPlusResolver()],
		}),
		Components({
			resolvers: [ElementPlusResolver({ importStyle: "sass" })],
		}),
  ],
  build: {
    rollupOptions: {
      external: ['/public'],
      // copyPublicDir:false
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      views: fileURLToPath(new URL('./src/views', import.meta.url)),
    }
  },
  // 加载注入，改变风格需要重新启动项目
  // css: {
  //   preprocessorOptions: {
  //     scss: {
  //       additionalData: `@use "@/assets/var.scss" as *;`
  //     }
  //   }
  // },
  define: {
    'process.env': {}
  },
  server: {
    proxy: {
      // '/api': 'https://some-domain.com/api/',
      "/api": {
        target: "http://localhost:8099/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },

    }
  },
  errorHandler:(err, vm, info)=>{
    console.log('vue异常错误捕获: ', '错误发生在 ' + info)
  }
  // compilerOptions: {
  //   isCustomElement: tag => tag.startsWith('nav-') // 以 "nav-" 开头的元素都是自定义元素
  // }

}})
