<template>
    <div >
        <ec-line :data="data"/>
    </div>
</template>

<script>
import ecLine from '@/components/echartsMap/businessNameEchartType/DefaultChart.vue'
import { reactive, toRefs, getCurrentInstance,defineComponent } from 'vue'
export default {
    name:"Chart",
    components:{ecLine},
    setup () {
        const data = reactive(
            {
                xAxis: {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        data: [150, 230, 224, 218, 135, 147, 260],
                        type: 'line'
                    }
                ],
                
                toolbox: {
                    show: true,
                    orient: "vertical",
                    left: "right",
                    top: "top",
                    connectedBackgroundColor:'#000',
                    feature: {
                        saveAsImage: { show: true },  // 保存图表
                    },
                    dataView:{
                        show:true
                    }
                }
            }
        )

        return {data}
    }
}
</script>

<style lang="scss" scoped>

</style>