<template>
  <section class="app-main" style="min-height: 100%" @contextmenu.prevent.native="openMenu(tag,$event)">
    <div>
      <!-- {{cachedViews}} -->
      <router-view v-slot="{ Component }">
        <transition name="left2right">
          <keep-alive :include="cachedViews" :max="8">
            <component :is="Component" />
          </keep-alive>
        </transition>
      </router-view>
    </div>
    <ul class='contextmenu' v-show="visible" :style="{left:left+'px',top:top+'px'}">
      <li @click="closeSelectedTag">Close</li>
      <li @click="closeSelectedTag">Close Others</li>
    </ul>
  </section>
</template>

<script setup>
  import { tagsView } from "@/stores/modules/tagsView";
  import {computed,ref} from 'vue';
  const visible = ref(false),top = ref(0),left = ref(0),selectedTag = ref({})
  const authStore = tagsView();
  const cachedViews = computed(() => authStore.cachedViews);
  const openMenu = (tag, e)=> {
    if(e.target.innerHTML=='home') return
    visible.value = true
    selectedTag.value = tag
    left.value = e.clientX
    top.value = e.clientY-100
    console.log(e.clientY)
  }
  const closeSelectedTag = ()=>{
    visible.value = false
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .contextmenu {
      margin: 0;
      background: #fff;
      z-index: 2;
      position: absolute;
      list-style-type: none;
      padding: 5px 0;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 400;
      color: #333;
      box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);
      li {
        margin: 0;
        padding: 7px 16px;
        cursor: pointer;
        &:hover {
          background: #eee;
        }
      }
    }


    .left2right-enter-from,
    .left2right-leave-to {
      transform: translateX(-120%);
    }

    .left2right-enter-to,
    .left2right-leave-from {
      transform: translateX(0%);
    }

    .left2right-enter-active {
      transition: transform 0.1s linear;
      transition-delay: 0.1s;
    }
    .left2right-leave-active {
      transition: transform 0.1s linear;
    }
</style>
