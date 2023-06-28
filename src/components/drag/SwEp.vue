<template>
    <div>
        <swiper
            style="width:calc(100vw - 200px)"
            :modules="modules"
            :loop="true"
            :slides-per-view="4"
            :space-between="20"
            :navigation="navigation"
            :pagination="{ clickable: true }"
            :scrollbar="{ draggable: false }"
            class="swiperBox"
            @slideChange="onSlideChange"
        >
            <swiper-slide v-for="(obj,idx) in data">
                <div class="box" @click="reduce(idx,obj)">
                    {{obj.id}}
                    <div class="addOut">
                        <CirclePlus style="width: 1.5rem; height: 1.5rem;"/>
                    </div>
                </div>
            </swiper-slide>
            <div class="swiper-button-prev" @click.stop="prevEl(item, index)" >《</div>
            <!--左箭头。如果放置在swiper外面，需要自定义样式。-->
            <div class="swiper-button-next" @click.stop="nextEl" >》</div>
            <!--右箭头。如果放置在swiper外面，需要自定义样式。-->
            <!-- 如果需要滚动条 -->
            <!-- <div class="swiper-scrollbar"></div> -->
        </swiper>
    </div>
</template>

<script>
    import { Autoplay, Pagination, Navigation, Scrollbar} from "swiper";
    import { Swiper, SwiperSlide } from 'swiper/vue'
    import "swiper/swiper-bundle.min.css";//导入核心 Swiper 样式
    import 'swiper/css/pagination' // 轮播图底面的小圆点
    import 'swiper/css/navigation' // 轮播图两边的左右箭头
    import { onBeforeUnmount, ref, shallowRef, onMounted,getCurrentInstance,watch,reactive,defineExpose } from 'vue'
    export default {
        components:[Autoplay, Pagination, Navigation, Scrollbar],
        emits:['addSomeOne'],
        setup(props,context) {
            const data = ref([
                {id:21,w:1,drag:true},
                {id:22,w:1,drag:true},
                {id:23,w:1,drag:true},
                {id:24,w:1,drag:true},
                {id:25,w:1,drag:true},
                {id:26,w:1,drag:true},
                {id:27,w:1,drag:true},
                {id:28,w:1,drag:true},
                {id:29,w:1,drag:true},
                {id:10,w:1,drag:true},
                {id:11,w:1,drag:true},
                {id:12,w:1,drag:true},
                {id:13,w:1,drag:true},
                {id:14,w:1,drag:true},
                {id:15,w:1,drag:true},
            ])
            const { proxy } = getCurrentInstance()
            const navigation = ref({
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            });
            const modules = [Autoplay, Pagination, Navigation, Scrollbar]
            
            const prevEl = (item, index) => {
                // console.log('上一张' + index + item)
            };
            const nextEl = () => {
                // console.log('下一张')
            };
            // 更改当前活动swiper
            const onSlideChange = (swiper) => {
                // swiper是当前轮播的对象，里面可以获取到当前swiper的所有信息，当前索引是activeIndex
                console.log(swiper.activeIndex)
            }
            // 删除
            const reduce = (idx,item)=>{
                data.value.splice(idx,1)
                console.log(proxy)
                // addSomeOne
                context.emit('addSomeOne',item)
            }
            // 添加
            const addSin = (param)=>{
                data.value.unshift(param)
            }
            // defineExpose({
            //     addSin
            // })
            return {
                navigation,
                modules,
                prevEl,
                nextEl,
                onSlideChange,
                data,
                reduce,
                addSin
            }
        }
    }
</script>

<style scoped>
    .modellist_container {
        width: 100%;
        height: 100%;
    }
    .swiper-button-prev:after{
        display: none;
    }

    .swiper-button-next:after{
        display: none;
    }
    .swiper-button-prev,.swiper-button-next{
        color:#fff;
    }
    .box{
        width:150px;
        height:200px;
        background:blue;
        border:1px solid red;
        position:relative;
        color:#fff;
        line-height:200px;
        text-align: center;
    }
    .addOut{
        position:absolute;
        right:10px;
        top:10px;
        width:20px;
        height:20px;
        line-height:20px;
        text-align: center;
        color:#fff;
        border-radius: 50%;
        cursor: pointer;
    }
</style>