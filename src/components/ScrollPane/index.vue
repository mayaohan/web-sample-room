<template>
  <div class="scroll-container" ref="scrollContainer" @wheel.prevent="handleScroll">
    <div class="scroll-wrapper" ref="scrollWrapper" :style="{left: left + 'px'}">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
  import {computed,ref,watch,getCurrentInstance,onMounted,nextTick} from 'vue'
  const padding = 15 // tag's padding
  const scrollContainer = ref(null)
  const scrollWrapper = ref(null)
  const left = ref(0)
  const handleScroll = (e)=> {
      const eventDelta = e.wheelDelta || -e.deltaY * 3
      const $container = scrollContainer
      const $containerWidth = $container.offsetWidth
      const $wrapper = scrollWrapper
      const $wrapperWidth = $wrapper.offsetWidth

      if (eventDelta > 0) {
        left.value = Math.min(0, left.value + eventDelta)
      } else {
        if($containerWidth - padding < $wrapperWidth) {
          if (left.value < -($wrapperWidth - $containerWidth + padding)) {
            left.value = left
          } else {
            left.value = Math.max(left.value + eventDelta, $containerWidth - $wrapperWidth - padding)
          }
        } else {
          left.value = 0
        }
      }
    },
    moveToTarget = ($target)=> {
      const $container = scrollContainer
      const $containerWidth = $container.offsetWidth
      const $targetleft = $target.offsetLeft
      const $targetWidth = $target.offsetWidth

      if ($targetLeft < -left.value) {
        // tag in the left
        left.value = -$targetLeft + padding
      } else if ($targetLeft + padding > -left.value && $targetLeft + $targetWidth < -left.value + $containerWidth - padding) {
        // tag in the current view
        // eslint-disable-line
      } else {
        // tag in the right
        left.value = -($targetLeft - ($containerWidth - $targetWidth) + padding)
      }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.scroll-container {
  height:40px;
  background: #fff;
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  width: 100%;
  .scroll-wrapper {
    position: absolute;
  }
}
</style>
