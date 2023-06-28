<template>
  <div class="tags-view-container">
    <scroll-pane class='tags-view-wrapper' ref='scrollPane'>
      <router-link ref='tag' class="tags-view-item" :class="isActive(tag)?'active':''" v-for="tag in visitedViews"
        :to="tag.path" :key="tag.path" @contextmenu.prevent.native="openMenu(tag,$event)">
        <!-- {{$t('route.' + tag.meta.title)}} -->
        <el-tooltip
          class="box-item"
          effect="dark"
          :content="tag.title"
          placement="top-start"
        >
          {{tag.title}}
        </el-tooltip>
        <el-icon v-show="tag.path!='/index/home'&&isActive(tag)" style="font-size:16px;position:relative;top:4px;margin-left:5px;"><CircleClose @click.prevent.stop='closeSelectedTag(tag)'/></el-icon>
      </router-link>
    </scroll-pane>
    <ul class='contextmenu' v-show="visible" :style="{left:left+'px',top:'40px'}">
      <li @click="closeSelectedTag">Close</li>
      <li @click="closeOthersTags">Close Others</li>
      <li @click="closeAllTags">Close All</li>
      <li v-if="disable" style="color:#ccc">Close Right</li>
      <li v-else @click="closeRightTags">Close Right</li>
    </ul>
    <div class="tags-view-item">
      <el-switch
        v-model="value1"
        inline-prompt
        active-text="动画"
        inactive-text="静态"
        @change="setAnimate"
      />
    </div>
    <div v-show="route.path=='/index/home'" class="tags-view-item" style="width:100px;cursor:pointer;">
        <div @click="dialogVisible = true">
          页面设置
          <el-icon style="font-size:16px;position:relative;top:4px;margin-left:5px;"><Setting /></el-icon>
        </div>

    </div>
    <el-dialog
      v-model="dialogVisible"
      :fullscreen="true"
      title="Tips"
      :lock-scroll="true"
      :append-to-body="true"
    >
      <Drag />
    </el-dialog>
  </div>
</template>

<script>
    import {computed,ref,watch,getCurrentInstance,onMounted,nextTick} from 'vue'
    import { tagsView } from "@/stores/modules/tagsView"
    import { useRouter,useRoute } from 'vue-router'
    import scrollPane from '@/components/ScrollPane/index.vue'
    import Drag from '@/components/drag/Drag.vue'
    // console.log(scrollPane)
    export default {
        name:'tagsView',
        components:{scrollPane,Drag},
        setup(props,context) {
          const dialogVisible = ref(false)
          const { $t,$te } = getCurrentInstance().proxy;
          const authStore = tagsView();
          const visitedViews = computed(() => authStore.visitedViews);
          const visible = ref(false),top = ref(0),left = ref(0),selectedTag = ref({})
          const { proxy } = getCurrentInstance()
          // console.log(proxy)
          const router = useRouter()
          const route = useRoute()
          const tag = ref(null)
          const scrollPane = ref(null)
          const disable = ref(false)
          watch(route, (newValue, oldValue) => {
              // console.log('watch 已触发', newValue)
              context.emit('change',newValue)
              addViewTags()
              moveToCurrentTag()
          })
          watch(visible, (newValue, oldValue) => {
              if (newValue) {
                  document.body.addEventListener('click', closeMenu)
              } else {
                  document.body.removeEventListener('click', closeMenu)
              }
          })
          onMounted(()=>{
              addViewTags()
          })
          const generateRoute = ()=> {
              if (route.name) {
                  return route
              }
              return false
          },
          addViewTags = ()=> {
              const route = generateRoute()
              if (!route) {
                  return false
              }
              // console.log(route,route.name)
              authStore.addVisitedViews(route)
          },
          moveToCurrentTag = async ()=> {
              await nextTick()
              for (const tg of authStore.visitedViews) {
                  if (tg.to === route.path) {
                      scrollPane.moveToTarget(tg)
                      break
                  }
              }
          },
          isActive = (routes)=> {
            return routes.path === route.path || routes.name === route.name
          },
          closeSelectedTag = (view)=> {
            console.log(view.name)
            let action = selectedTag.value
            if(view.name!=undefined) action = view
              console.log(action)
              authStore.delVisitedViews(action)
              if (isActive(action)) {
                  const latestView = authStore.visitedViews.slice(-1)[0]
                  if (latestView) {
                      router.push(latestView.path)
                  } else {
                      router.push('/')
                  }
              }
          },
          closeOthersTags = ()=> {
            router.push(selectedTag.value.path)
            authStore.delOthersViews(selectedTag.value)
            moveToCurrentTag()
          },
          closeAllTags = ()=> {
            authStore.delAllViews()
            router.push('/')
          },
          closeRightTags = ()=>{
            const rout = authStore.delRightViews(selectedTag.value,route)
            if(rout!=1){
              router.push(rout.path)
            }
          },
          openMenu = (tag, e)=> {
            if(e.target.innerHTML=='home') return
            visible.value = true
            selectedTag.value = tag
            left.value = e.clientX
            top.value = e.clientY
            const latestView = authStore.visitedViews.slice(-1)[0]
            disable.value = latestView.path == tag.path
          },
          closeMenu = ()=> {
              visible.value = false
          }
          const value1 = ref(true)
          const setAnimate = ()=>{
            context.emit('setAnimate',value1)
          }
          context.emit('setAnimate',value1)
          return {
              authStore,visitedViews,visible,router,route,tag,scrollPane,
              generateRoute,isActive,addViewTags,moveToCurrentTag,closeSelectedTag,
              closeOthersTags,closeOthersTags,closeAllTags,openMenu,closeMenu,left,top,closeRightTags,
              disable,dialogVisible,value1,setAnimate
          }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.tags-view-container {
  background:#fff;
  padding:5px 0;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);
  position:relative;
  display:flex;
  justify-content:space-between;
  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      height: 40px;
      line-height: 40px;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      &:first-of-type {
        margin-left: 15px;
      }
      &.active {
        background-color: #42b983;
        color: #fff;
        border-color: #42b983;
      }
    }
  }
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
}
</style>

<style rel="stylesheet/scss" lang="scss">
//reset element css of el-icon-close
.tags-view-item {
  display: inline-block;
  position: relative;
  height: 40px;
  line-height: 40px;
  border: 1px solid #d8dce5;
  color: #495060;
  background: #fff;
  padding: 0 8px;
  font-size: 12px;
  margin-left: 5px;
}
</style>
