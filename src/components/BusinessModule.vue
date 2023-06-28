<template>
  <el-form-item
    label="业务模块"
    :prop="'formData.' + 'businessModule'"
  >
    <el-select
      v-model="formData.businessModule"
      class="filter"
      clearable
      filterable
      @change="viewsOperate.chooseBusinessHandle"
    >
      <el-option
        v-for="item in options.formData"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    {{ formData }}
  </el-form-item>
</template>

<script>
  import { reactive, toRefs,defineComponent,onMounted } from 'vue'
  export default defineComponent({
    props: {
      childFormData: {
        type: Object,
        default() {
            return {}
        },
      },
      selectOption:{
        type: Array,
        default() {
            return []
        },
      }
    },
    setup(props) {
      // 视图数据
      const viewsData = reactive({
        formData: props.childFormData,
      })
      const options = reactive({
        formData: props.selectOption
      })
      onMounted(e=>{
          // console.log(options.formData)
      })

      // 视图操作
      const viewsOperate = {
        chooseBusinessHandle(e) {
          viewsData.formData.businessModule = e
        },
      }

      return {
        viewsOperate,
        ...toRefs(viewsData), // 视图数据
        // ...toRefs(viewsOperate), //视图操作
        options,
      }
    },
  })
</script>

<style lang="scss" scoped>
  .filter {
    width: 100%;
  }
</style>