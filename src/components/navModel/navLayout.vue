

<script>
import {navChild,navTitle,navContainer} from './component'

export default {
    components:{navChild,navTitle,navContainer},
    setup (props,context) {
        return {}
    }
}
</script>

<style lang="scss" scoped>
.menuDownBox{
    display:flex;
}
.menuDownItem{
    flex:1;
    max-width:200px;
    // float:left;
}
</style>
<template>
    <div>
        <nav-container>
            <template v-slot="item" >
                <div class="menuDownBox">
                    <!-- 二级 -->
                    <div v-for="obj in item.item.children" class="menuDownItem">
                        <!-- 有第三层 -->
                        <div class="menuList" v-if="obj.children!=undefined&&obj.children.length>0&&!obj.hidden">
                            <nav-title :title="obj.name"></nav-title>
                            <!-- {{item.item.path+'/'+obj.path}} -->
                            <template v-for="ox in obj.children"  >
                              <nav-child :single="ox" :url="ox.path" v-if="!ox.hidden"></nav-child>
                            </template>

                        </div>
                        <!-- 没有第三层 -->
                        <div class="menuList" v-else>
                            <nav-child :single="obj" :url="obj.path" v-if="!obj.hidden"></nav-child>
                        </div>
                    </div>
                </div>
            </template>
        </nav-container>
    </div>
</template>
