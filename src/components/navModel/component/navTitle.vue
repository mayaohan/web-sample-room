<template>
    <div class="titleStyle">
        {{title}}
    </div>
</template>

<script>
export default {
    name:'navTitle',
    props:['title'],
    setup (props) {
        const title = props.title
        console.log(111)

        return {title}
    }
}
</script>

<style lang="scss" scoped>
.titleStyle{
    font-weight:700;
    padding:10px;
}
</style>