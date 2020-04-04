<template>
    <div class="time-box">
        <h1>Start: {{smartTime.start}}</h1>
        <h1>Ago: {{smartTime.ago.d}}d {{smartTime.ago.h}}h {{smartTime.ago.m}}m</h1>
        <h1>Duration: {{smartTime.duration.h}}h {{smartTime.duration.m}}m {{smartTime.duration.s}}s</h1>
    </div>
</template>

<script>
    export default {
        name: "TimeBox",
        props: {
            smartTime: Object
        }
    }
</script>

<style scoped>
    .time-box {
        height: 100%;
        width: 80%;
        float: left;
        text-align: left;
        font-size: 10px;
    }
</style>
