<template>
    <div class="info-box">
        <h1 v-for="item in smartInfo" :key="item.name">{{item.name}}: {{item.values[0]}}</h1>
    </div>
</template>

<script>
    export default {
        name: "InfoBox",
        props: {
            smartInfo: Array
        }
    }
</script>

<style scoped>
    .info-box {
        height: 100%;
        width: 100%;
        float: left;
        text-align: left;
        font-size: 10px;
    }
</style>
