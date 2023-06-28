<template>
  <div>
    <div>{{ message }}</div>
    <div class="droppable-element" @click="add">添加单元格</div>
    <grid-layout
      v-model:layout="layout"
      :col-num="12"
      :row-height="30"
      style="width: 100vw">
    <template #default="{ gridItemProps }">
          <grid-item
            v-for="item in layout"
            :key="item.i"
            v-bind="gridItemProps"
            :x="item.x"
            :y="item.y"
            :w="item.w"
            :h="item.h"
            :i="item.i"
            @resize="resize"
            @move="move"
            @moved="moved"
          >
            <div class="item">
              <label>{{ item.i }}</label
              ><span @click="del(item.i)">删除x</span>
            </div>
          </grid-item>
          </template>
    </grid-layout>
  </div>
</template>

<script setup>
/*
 vue3-drr-grid-layout 中文文档
 https://www.itxst.com/vue3-drr-grid-layout/tutorial.html
*/
import { ref } from "vue";
import { GridLayout,GridItem } from "vue3-drr-grid-layout";
import "vue3-drr-grid-layout/dist/style.css";

const layout = ref([
  { x: 0, y: 0, w: 2, h: 2, i: 0 },
  { x: 2, y: 0, w: 2, h: 2, i: 1 },
  { x: 4, y: 0, w: 2, h: 2, i: 2 },
  { x: 0, y: 1, w: 6, h: 2, i: 3 },
]);

const message = ref("");
//缩放事件
const resize= (i, newH, newW,newHPx, newWPx)=> {
  message.value  = "缩放中 i=" + i + ", X=" + newHPx + ", Y=" + newWPx;
            }
//单元格移动中的事件
const move = (i, newX, newY) => {
  message.value = "移动中 i=" + i + ", X=" + newX + ", Y=" + newY;
};
//单元格移动后的事件
const moved = (i, newX, newY) => {
  message.value = "移动中 i=" + i + ", X=" + newX + ", Y=" + newY;
};


//删除单元格
const del = (i) => {
  layout.value = layout.value.filter((a) => a.i != i);
};

//添加一个单元格
const add = () => {
  let y = 0;
  layout.value.forEach((a) => {
    if (a.y > y) y = a.y + 1;
  });
  layout.value.push({
    x: 0,
    y: y,
    w: 2,
    h: 2,
    i: layout.value.length,
  });
};
</script>

<style scoped>
.droppable-element {
  width: 120px;
  text-align: center;
  border: 1px solid red;
  margin: 10px 0;
  padding: 10px;
  cursor: pointer;
}
.item {
  display: flex;
  justify-content: space-between;
}
.item > span {
  margin-left: 10px;
  padding: 1px;
  border: solid 1px #ddd;
  cursor: pointer;
  background-color: rgb(171, 171, 171);
  color: #000;
  font-size: 11px;
}
</style>
