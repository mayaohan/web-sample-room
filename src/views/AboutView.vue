<template>
  <div class="about">
    <dss-editor @get-value="getEditorContainer" @change="editorChange"></dss-editor>
    <div>分隔符</div>
    <el-input
      v-model="textarea"
      :autosize="{ minRows: 2}"
      type="textarea"
      placeholder="Please input"
    />
    <el-button type="primary" @click="getHost">请求HTML</el-button>
    <el-button type="primary" @click="getEditorValues">获取内容</el-button>
  </div>
</template>
<script>

import { ref, onMounted,getCurrentInstance,shallowRef } from 'vue'
import DssEditor from '@/components/DssEditor.vue'
export default {
  name:'AboutView',
  components: { DssEditor },
  setup() {
    const editorContainer = shallowRef()
    const editorContainer2 = shallowRef()
    const textarea = ref('')
    const escape2Html = (str)=> {
      return str.replace(/[<>&"]/g,function(c){return {'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;'}[c];});
    }
    const instance = getCurrentInstance()

    onMounted(() => {
    })
    const getEditorContainer = (param)=>{
      // console.log(param)
      editorContainer.value = param.container
    }
    const getEditorValues = ()=>{
      console.log( editorContainer.value.value.getHtml())
    }
    const getHost = ()=> {
    }
    const editorChange = (param)=>{
      textarea.value = param
    }

    return {
      mode: 'default', // 或 'simple'
      getHost,
      getEditorValues,
      getEditorContainer,
      textarea,
      editorChange,
    };
  }
}
</script>

<style>
</style>
