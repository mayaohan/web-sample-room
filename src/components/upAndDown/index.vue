<template>
    <transition name="box-animation">
      <div class="upAndDown" :style="{height:height+'px'}">
          <div class="context" ref="con">
              <slot></slot>
          </div>
      </div>
    </transition>
    <div class="up" v-if="height!=100">
        <el-divider>
            <a @click="up" href="javascript:void(0)" class="dds-btn">向上</a>
        </el-divider>
    </div>
    <div class="down" v-else>
        <el-divider>
            <a @click="down" href="javascript:void(0)" class="dds-btn">向下</a>
        </el-divider>
    </div>
</template>

<script>
import {ref,getCurrentInstance} from 'vue'
export default {
    props:{
        height:{
            type:Number,
            default:100
        }
    },
    setup (props,context) {
      const {proxy} = getCurrentInstance()
        const con = ref(null)
        const height = ref(props.height)
        const down = ()=>{
            height.value = con.value.clientHeight
        }
        const up = ()=>{
            height.value = props.height
        }
        return {height,up,down,con}
    }
}
</script>

<style lang="scss" scoped>
    .upAndDown{
        width:100%;
        overflow:hidden;
        transition: all 0.3s ease;
    }
    .box-animation-enter-active,
    .box-animation-leave-active {
      transition: height 0.3s ease;
    }

    .box-animation-enter,
    .box-animation-leave-to {
      height: 0;
    }
</style>
