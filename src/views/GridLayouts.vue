<template>
    <div>
        <el-container>
            <el-row :gutter="10">
                <TransitionGroup name="sort">
                    <el-col :span="6" class="app-item" v-for="(app,idx) in customApps"
                        :key="app.id"
                        @drop.prevent="setMouse($event,app)"
                        :draggable="true"
                        @dragstart="dragstart($event,app)"
                        @dragenter.prevent="dragenter(app,$event,customApps)"
                        @dragend.prevent="getDragend(customApps, 'customer', $event)"
                        @dragover.prevent
                        @dragleave.prevent
                    >
                        <div class="ellipsis" :class="{active:dragEnterIndex==idx}" >{{app.name}}</div>
                    </el-col>
                </TransitionGroup>
            </el-row>
        </el-container>
    </div>
</template>

<script setup>
    import { onBeforeUnmount, ref, shallowRef, onMounted,getCurrentInstance,watch,reactive } from 'vue'
    const customApps = ref([
        {id:1,name:'111'},
        {id:2,name:'222'},
        {id:3,name:'333'},
        {id:4,name:'444'},
        {id:5,name:'555'},
    ]),
        oldData = ref([]),
        newData = ref([]),
        dragStartId = ref(''),
        dragEndId = ref(''),
        dragEnterIndex = ref(-1)
    const setMouse = (e)=>{
        // e.dataTransfer.effectAllowed = 'none'
    }
    const dragstart = (e,value)=> {
        // console.log('start:',value.id,e)
        e.dataTransfer.effectAllowed = 'move'
        oldData.value = value
        dragStartId.value = value.id
    }
    const dragenter = (value,e,listData)=> {
        dragEnterIndex.value = listData.indexOf(value)
        newData.value = value
        dragEndId.value = value.id
    }
    const getDragend = (listData, type)=> {
        if (oldData.value !== newData.value) {
            let oldIndex = listData.indexOf(oldData.value)
            let newIndex = listData.indexOf(newData.value)
            let newItems = [...listData]
            // 删除之前DOM节点
            newItems.splice(oldIndex, 1)
            // 在拖拽结束目标位置增加新的DOM节点
            newItems.splice(newIndex, 0, oldData.value)
            // 每次拖拽结束后，将拖拽处理完成的数据，赋值原数组，使DOM视图更新，页面显示拖拽动画
            customApps.value = newItems
            // 每次拖拽结束后调用接口时时保存数据
            // Api(dragStartId, dragEndId).then((res) => {})
            console.log(newItems)
        }
        dragEnterIndex.value = -1
    }
</script>

<style scoped>
    .ellipsis{
        width:100px;
        height:100px;
        text-align:center;
        line-height:100px;
        float:left;
        border:1px solid red;
    }
    .active{
        color:red;
    }
    .app-item{
        margin:10px 0;
    }
    .sort-move,
    .sort-enter-active,
    .sort-leave-active {
        transition: all 0.36s ease;
    }

    .sort-enter-from,
    .sort-leave-to {
        opacity: 0;
    }
</style>