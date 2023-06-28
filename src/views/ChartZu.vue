<template>
    <div >
        <up-and-down :height="100">
            <ec-line :data="data"/>
            <Chart />
        </up-and-down>
    </div>
</template>

<script>
import ecLine from '@/components/echartsMap/businessNameEchartType/DefaultChart.vue'
import { reactive, toRefs, getCurrentInstance,defineComponent,ref } from 'vue'
import upAndDown from '@/components/upAndDown/index.vue'
import Chart from './Chart.vue'
export default {
    name:"ChartZu",
    components:{ecLine,upAndDown,Chart},
    setup () {
        const data = reactive(
            {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                    // Use axis to trigger tooltip
                    type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
                    }
                },
                legend: {},
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'value'
                },
                yAxis: {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                series: [
                    {
                    name: 'Direct',
                    type: 'bar',
                    stack: 'total',
                    label: {
                        show: true
                    },
                    emphasis: {
                        focus: 'series'
                    },
                    data: [200, 302, 301, 334, 390, 330, 320]
                    },
                    {
                    name: 'Mail Ad',
                    type: 'bar',
                    stack: 'total',
                    label: {
                        show: true
                    },
                    emphasis: {
                        focus: 'series'
                    },
                    data: [120, 132, 101, 134, 90, 230, 210]
                    },
                    {
                    name: 'Affiliate Ad',
                    type: 'bar',
                    stack: 'total',
                    label: {
                        show: true
                    },
                    emphasis: {
                        focus: 'series'
                    },
                    data: [220, 182, 191, 234, 290, 330, 310]
                    },
                    {
                    name: 'Video Ad',
                    type: 'bar',
                    stack: 'total',
                    label: {
                        show: true
                    },
                    emphasis: {
                        focus: 'series'
                    },
                    data: [150, 212, 201, 154, 190, 330, 410]
                    },
                    {
                    name: 'Search Engine',
                    type: 'bar',
                    stack: 'total',
                    label: {
                        show: true
                    },
                    emphasis: {
                        focus: 'series'
                    },
                    data: [820, 832, 901, 934, 1290, 1330, 1320]
                    }
                ]
            }
        )
        setTimeout(e=>{
            data.series[0].data = [ 301,334,390,302,330,320,200]
            console.log(data)
        },5000)

        return {data}
    }
}
</script>

<style lang="scss" scoped>

</style>
