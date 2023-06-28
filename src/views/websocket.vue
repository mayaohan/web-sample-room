<template>
  <div>
    111
  </div>
</template>

<script>
import {ref,onMounted,getCurrentInstance} from 'vue'
export default {
  setup (props,context) {
    const { $websocket } = getCurrentInstance().proxy;
    onMounted(()=>{
      console.log('111')
      $websocket.connect();
    })
    const sendMessage = (message)=> {
      $websocket.send(message);
    }

    return {sendMessage}
  }
}
</script>

<style lang="scss" scoped>

</style>
