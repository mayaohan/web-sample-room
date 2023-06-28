<template>
    <div>
        <el-button type="primary" @click="Export">download</el-button>
        <div v-show="show" style="width:100%;height:400px;" ref="chartdom"></div>
    </div>
</template>

<script>
import { reactive, toRefs, getCurrentInstance,defineComponent,ref,watch,markRaw } from 'vue'
export default {
    props:{
        data:{
            required: true,
            default:e=>null
        },
    },
    emits:['callback'],
    mounted() {
        this.initChart()
        window.addEventListener('resize', () => {
            this.charts.value.resize();
        })
    },
    setup (props,context) {
        const show = ref(true)
        const chartdom = ref(null)
        let charts = markRaw({
            value: null,
        })
        const { proxy } = getCurrentInstance()
        const showfunc = ()=>{
            show.value = false
        }
        const data = ref(props.data)
        const initChart = () => {
            charts.value = proxy.$echarts.init(chartdom.value)
            charts.value.setOption(data.value)
            charts.value.on('click',e=>{
                context.emit('callback',e)
            })
            window.onresize = () => {
                charts.value.resize()
            }
        }
        watch(props.data, (newValue, oldValue) => {
            data.value = newValue
            charts.value.setOption(newValue)
        })
        // 导出单个图表图片
        function Export() {
            const img = new Image();
            img.src = charts.value.getDataURL({
                type: "png",
                pixelRatio: 1, //放大2倍
                backgroundColor: "#fff"
            });
            img.onload = async function () {
                const canvas = document.createElement("canvas");
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0);
                const maxPx = Math.max(img.width, img.height);
                const stepPx = Math.floor(maxPx / 12);
                let arrayX = [0];//初始水印位置 canvas坐标 0 0 点
                while (arrayX[arrayX.length - 1] < maxPx/2) {
                    arrayX.push(arrayX[arrayX.length - 1] + stepPx);

                }
                arrayX.push(...arrayX.slice(1, arrayX.length).map((el) => {
                    return -el;
                }));
                const image = new Image();
                image.src = 'src/assets/logo.png'
                image.onload = function(){
                    for (let i = 0; i < arrayX.length; i++) {
                        for (let j = 0; j < arrayX.length; j++) {
                            ctx.save();
                            ctx.translate(img.width / 2, img.height / 2);
                            ctx.rotate(-Math.PI / 5);
                            ctx.drawImage(image, arrayX[i], arrayX[j],30,30);
                            ctx.restore();
                        }
                    }

                    const dataURL = canvas.toDataURL("image/png");
                    const a = document.createElement("a");
                    const event = new MouseEvent("click");
                    a.download = "图片.png" || "下载图片名称";
                    a.href = dataURL;
                    a.dispatchEvent(event);
                    a.remove();
                }
            };
        }
        const wmConfig = {
            font: "microsoft yahei", //字体
            textArray: ['37楼都是大哥','2021/11/26 16:44'],//水印文本内容，允许数组最大长度3 即：3行水印
            density: 12  //密度 建议取值范围1-5   值越大，水印越多，可能会导致水印重叠等问题，慎重！！！
        }

        //画布添加水印
        const drawWaterMark = (ctx, imgWidth, imgHeight, wmConfig) => {


            let fontSize;
            if (imgWidth >= 3456) {
                fontSize = 50;
            } else if (imgWidth >= 2700) {
                fontSize = 30;
            } else if (imgWidth >= 2000) {
                fontSize = 26;
            } else if (imgWidth >= 1436) {
                fontSize = 20;
            } else if (imgWidth >= 800) {
                fontSize = 12;
            } else if (imgWidth >= 500) {
                fontSize = 10;
            } else {
                fontSize = 8;
            }
            console.log(imgWidth, imgHeight, fontSize);
            ctx.fillStyle = "white";

            ctx.font = `${fontSize}px ${wmConfig.font}`;
            ctx.lineWidth = 1;
            ctx.fillStyle = "rgba(55,55,55,0.3)";
            ctx.textAlign = "left";
            ctx.textBaseline = "middle";


            //文字坐标

            const maxPx = Math.max(imgWidth, imgHeight);

            const stepPx = Math.floor(maxPx / wmConfig.density);


            let arrayX = [0];//初始水印位置 canvas坐标 0 0 点
            while (arrayX[arrayX.length - 1] < maxPx/2) {
                arrayX.push(arrayX[arrayX.length - 1] + stepPx);

            }
            arrayX.push(...arrayX.slice(1, arrayX.length).map((el) => {
                return -el;
            }));

            // console.log(arrayX);
            const image = new Image();
            image.src = 'src/assets/logo.png'
            for (let i = 0; i < arrayX.length; i++) {
                for (let j = 0; j < arrayX.length; j++) {
                    ctx.save();
                    ctx.translate(imgWidth / 2, imgHeight / 2); ///画布旋转原点 移到 图片中心
                    ctx.rotate(-Math.PI / 5);
                    // if (wmConfig.textArray.length > 3) {
                    //     wmConfig.textArray = wmConfig.textArray.slice(0, 3);
                    // }
                    // wmConfig.textArray.forEach((el, index) => {
                    //     let offsetY = fontSize * index + 2;
                        // ctx.fillText(el, arrayX[i], arrayX[j] + offsetY);
                        // console.log(arrayX[i], arrayX[j])
                        ctx.drawImage(image, arrayX[i], arrayX[j],30,30);
                    // });
                    ctx.restore();
                    console.log('我是function')
                }

            }

        };
        return {
            // ...toRefs(data),
            initChart,
            charts,
            chartdom,
            Export,
            drawWaterMark,
            wmConfig,
            show,
            showfunc
        }
    }
}
</script>