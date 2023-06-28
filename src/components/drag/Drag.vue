<template>
    <el-container>
        <el-row :gutter="10" class="drag-test-page">
            <!--  vue3  TransitionGroup 组件  https://cn.vuejs.org/guide/built-ins/transition-group.html-->
            <TransitionGroup name="drag-tes-list">
            <!--   盒子容器   -->
            <!-- <el-row :gutter="10"> -->
                <div :class="{item:item.drag}" class="box" v-for="(item,index) in dataList" :key="item">
                    <!--    盒子 为啥在这写含有动画样式的类 因为在外边那一层写动画样式会影响Sortable的效果    -->
                    <div class="box-content" :style="{width:200+ 'px'}" v-if="item.w==1" >
                        {{ item.id }}
                        <!--     删除按钮     -->
                        <div class="box-btn" @click="removeBox(index,item)" v-if="isDrag&&item.drag">
                            <!-- <span class="iconfont icon-close"></span> -->
                            <Close />
                        </div>
                        <el-button type="primary" @click="Scale(1,item)">1倍大</el-button>
                        <el-button type="info" @click="Scale(2,item)">2倍大</el-button>
                    </div>
                    <div class="box-content" :style="{width:200*item.w+10 + 'px'}" v-else>
                        {{ item.id }}
                        <!--     删除按钮     -->
                        <div class="box-btn" @click="removeBox(index,item)" v-if="isDrag&&item.drag">
                            <!-- <span class="iconfont icon-close"></span> -->
                            <Close />
                        </div>
                        <el-button type="primary" @click="Scale(1,item)">1倍大</el-button>
                        <el-button type="info" @click="Scale(2,item)">2倍大</el-button>
                    </div>
                </div>
            <!-- </el-row> -->
            </TransitionGroup>
        </el-row>
    </el-container>
  <!-- <el-button @click="add" type="primary">添加</el-button> -->
  <el-button @click="edit" type="primary">{{ isDrag ? '保存' : '编辑' }}</el-button>
  <SwEp ref="wheel" @add-some-one="add"/>
</template>

<script setup>
import Sortable from 'sortablejs'
import { onMounted, ref } from 'vue'
import SwEp from './SwEp.vue'
// 列表数据
const dataList = ref([])
// 是否数据拖动状态
const isDrag = ref(false)
// 拖动组件
let sortable = null
const screenW = ref(8)
const wheel = ref(null);
const Scale = (param,item)=>{
    if(isDrag.value&&item.drag){
        item.w = param
    }
}
const add = (item)=>{
    console.log(wheel.value)
    dataList.value.push(item)
}

// 编辑
function edit () {
  isDrag.value = !isDrag.value
  if (isDrag.value) {
    createSortable()
  } else {
    sortable?.destroy()
  }
}

// 删除元素
function removeBox (index,item) {
  dataList.value.splice(index, 1)
  wheel.value.addSin(item)
}

// 创建拖动组件
function createSortable () {
  const parentDom = document.querySelector('.drag-test-page')
  if (parentDom) {
    sortable = Sortable.create(parentDom, {
      // 动画时间
        animation: 100,
        // 允许拖拽的项目
        draggable: ".item",
        // 延迟拖动时间，100ms以内算点击 100ms以后算拖动，以此来区分是点击还是拖动
        delay: 40,
        // 拖动结束
        onEnd: (event) => {
            // 移动之后改变数据
            if (event.oldIndex !== undefined && event.newIndex !== undefined) {
            const element = dataList.value.splice(event.oldIndex, 1)
            dataList.value.splice(event.newIndex, 0, element[0])
                console.log(dataList.value)
            }
        }
    })
  }
}

onMounted(() => {
    if(document.body.clientWidth>1024){
        screenW.value = 6
    }else{
        screenW.value = 8
    }
    window.addEventListener('resize',()=>{
        console.log(document.body.clientWidth)
        if(document.body.clientWidth>1024){
            screenW.value = 6
        }else{
            screenW.value = 8
        }
    });
    // 初始化数据
    for (let i = 0; i < 9; i++) {
        dataList.value.push(
            {w:i==0?2:1,id:i,drag:i!=0}
        )
    }
})
</script>

<style lang="scss">
// 颤动动画
@keyframes shake {
  0% {
    transform: rotateZ(-2deg);
  }
  100% {
    transform: rotateZ(2deg);
  }
}
@media (min-width: 1050px) {
    .drag-test-page{
        width:1050px;
    }
}
@media (max-width: 1049px) {
    .drag-test-page{
        width:840px;
    }
}
@media (max-width: 900px) {
    .drag-test-page{
        width:630px;
    }
}


.drag-test-page {
    margin:0 auto!important;
    display: flex;
    flex-wrap: wrap;
    // align-items: center;
    .box {
        margin: 5px;
        min-height:100px;
        .box-content {
            height: 100%;
            background: #0287FF;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            // 颤动动画
            &.drag {
                animation-name: shake;
                animation-duration: 0.12s;
                animation-iteration-count: infinite;
                animation-direction: alternate;
                animation-timing-function: linear;
            }

            .box-btn {
                width: 20px;
                height: 20px;
                line-height: 1;
                position: absolute;
                right: 0px;
                top: 10px;
                transform: translate(-30%, -30%);
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                .iconfont {
                font-size: 25px;
                }

            }
        }
    }

  // 列表动画
  .drag-tes-list-move,
  .drag-tes-list-enter-active,
  .drag-tes-list-leave-active {
    transition: all 0.36s ease;
  }

  .drag-tes-list-enter-from,
  .drag-tes-list-leave-to {
    opacity: 0;
  }
}
</style>
