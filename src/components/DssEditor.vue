
<template>
  <div class="about">
    <div style="border: 1px solid #ccc">
      <Toolbar
        style="border-bottom: 1px solid #ccc"
        :editor="editorRef"
        :defaultConfig="toolbarConfig"
        :mode="mode"
      />
      <Editor
        style="height: 300px; overflow-y: hidden;"
        v-model="valueHtml"
        :defaultConfig="editorConfig"
        :mode="mode"
        @onCreated="handleCreated"
      />
    </div>
  </div>
</template>
<script>
import '@wangeditor/editor/dist/css/style.css'; // 引入 css

import { onBeforeUnmount, ref, shallowRef, onMounted,getCurrentInstance,watch,reactive } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { Boot } from '@wangeditor/editor'
import UploadFile from '@/components/editor/UploadFile'

const callback = ()=>{
  // console.log('来个上传文件包')
}
const menuConf = {
  key: 'menu1', // 定义 menu key ：要保证唯一、不重复（重要）
  factory() {
    return new UploadFile({cb:callback}) // 把 `YourMenuClass` 替换为你菜单的 class
  },
}
// console.log(Editor,Toolbar)
Boot.registerMenu(menuConf)
export default {
  name:'DdsEditor',
  components: { Editor, Toolbar },
  props: {
    // name: {
    //   type:String,
    //   require:true
    // },
  },
  emits:{
    getValue:{
      require:true
    },
    change:{
      require:true
    }
  },
  created(){

  },
  setup(props,context) {
    // 编辑器实例，必须用 shallowRef
    const editorRef = shallowRef()
    const instance = getCurrentInstance()
    const { $ipc } = instance.appContext.config.globalProperties

    // 内容 HTML
    const valueHtml = ref('<p>hello</p>')


    watch(valueHtml, (newValue, oldValue) => {
      // console.log('watch 已触发', newValue)
      context.emit('change',newValue)
    })
    // 模拟 ajax 异步获取内容
    onMounted(() => {
        // setTimeout(() => {
        //     valueHtml.value = '<h5 style="font-size:30px;">模拟 Ajax 异步设置内容</h5>'
        // }, 1500)
        // console.log(context)
        context.emit('getValue',{
          container:editorRef,
          value:valueHtml
        })
    })

    const toolbarConfig = {
      insertKeys: {
        index: 0,
        keys: ['menu1'], // show menu in toolbar
      }
    }
    const editorConfig = reactive({
      placeholder: '请输入内容...' ,
      MENU_CONF:{
      }
    })
    editorConfig.MENU_CONF['uploadImage'] = {
      server: '/api/upload',
      // 单个文件的最大体积限制，默认为 2M
      maxFileSize: 1 * 1024 * 1024, // 1M
      // 最多可上传几个文件，默认为 100
      maxNumberOfFiles: 10,
      // 选择文件时的类型限制，默认为 ['image/*'] 。如不想限制，则设置为 []
      allowedFileTypes: ['image/*'],
      // 自定义上传参数，例如传递验证的 token 等。参数会被添加到 formData 中，一起上传到服务端。
      meta: {
          token: 'xxx',
          otherKey: 'yyy'
      },
      // 将 meta 拼接到 url 参数中，默认 false
      metaWithUrl: false,
      // 小于5kb转base64
      base64LimitSize: 5 * 1024,
      // 自定义增加 http  header
      headers: {
          Accept: 'text/x-json',
          otherKey: 'xxx'
      },
      // 跨域是否传递 cookie ，默认为 false
      withCredentials: true,
      // 超时时间，默认为 10 秒
      timeout: 5 * 1000, // 5 秒
      onBeforeUpload(file) {    // JS 语法
        // file 选中的文件，格式如 { key: file }
        return file
        // 1. return file 或者 new 一个 file ，接下来将上传
        // 2. return false ，不上传这个 file
      },
      // 上传进度的回调函数
      onProgress(progress) {  // TS 语法
      // onProgress(progress) {       // JS 语法
          // progress 是 0-100 的数字
          console.log('progress', progress)
      },
      // 单个文件上传成功之后
      onSuccess(file, res) {  // TS 语法
      // onSuccess(file, res) {          // JS 语法
          console.log(`${file.name} 上传成功`, res)
      },
      // 单个文件上传失败
      onFailed(file, res) {   // TS 语法
      // onFailed(file, res) {           // JS 语法
          console.log(`${file.name} 上传失败`, res)
      },
      // 上传错误，或者触发 timeout 超时
      onError(file, err, res) {  // TS 语法
      // onError(file, err, res) {               // JS 语法
          console.log(`${file.name} 上传出错`, err, res)
      },
    }
    // 组件销毁时，也及时销毁编辑器
    onBeforeUnmount(() => {
        const editor = editorRef.value
        if (editor == null) return
        editor.destroy()
    })

    const handleCreated = (editor) => {
      editorRef.value = editor // 记录 editor 实例，重要！
    }

    return {
      editorRef,
      valueHtml,
      mode: 'default', // 或 'simple'
      toolbarConfig,
      editorConfig,
      handleCreated,
      callback
    };
  }
}
</script>

<style scoped>
@media (min-width: 1024px) {
  .about {
    display: flex;
    align-items: center;
  }
}
</style>
