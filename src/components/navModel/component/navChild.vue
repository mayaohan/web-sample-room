<template>
    <div class="lineStyle" @click="rout">{{single.name}}</div>
</template>

<script>
import { useRouter,useRoute } from 'vue-router'
// import {reactive, toRefs,getCurrentInstance,onMounted,h,ref} from 'vue'

export default {
    name:'navChild',
    props:['single','url'],
    setup (props) {
        const router = useRouter()
        const {single,url} = props
        console.log(single,url)
        const rout = ()=>{
            // console.log(url)
            router.push(url)
        }
        return {rout}
    }
}
</script>

<style lang="scss" scoped>
.lineStyle{
    padding:5px 20px;
    cursor:pointer;
    &:hover{
        color:#0000ff
    }
}
</style>
