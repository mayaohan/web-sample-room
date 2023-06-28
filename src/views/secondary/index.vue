<template>
  <div>
    <!-- <router-view v-slot="{ Component }">
      <transition name="left2right">
        <keep-alive :include="cachedViews" :max="8">
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view> -->
  </div>
</template>

<script>
  import { tagsView } from "@/stores/modules/tagsView";
  import {computed,ref} from 'vue';
  export default {
    setup () {

    const visible = ref(false),top = ref(0),left = ref(0),selectedTag = ref({})
    const authStore = tagsView();
    const cachedViews = computed(() => authStore.cachedViews);

      return {visible,authStore,cachedViews}
    }
  }
</script>

<style lang="scss" scoped>
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
