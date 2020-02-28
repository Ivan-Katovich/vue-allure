<template>
    <div id="app">
        <div class="left-bar">
            <suite-form :suite="suites[0]" :title="titles[0]"/>
        </div>
        <div class="right-bar">
            <suite-form :suite="suites[1]" :title="titles[1]"/>
        </div>
    </div>
</template>

<script>
    import SuiteForm from './components/SuiteForm.vue';

    export default {
        name: 'App',
        data() {
            return {
                suites: ['smoke', 'regression'],
                titles: ['Smoke Test Automation Suite', 'Regression Test Automation Suite']
            }
        },
        components: {
            SuiteForm
        }
    }
</script>

<style>
    .left-bar {
        background-color: cadetblue; /* Цвет фона слоя */
        padding: 20px; /* Поля вокруг текста */
        float: left; /* Обтекание по правому краю */
        width: 45%; /* Ширина слоя */
    }
    .right-bar {
        background-color: darkolivegreen; /* Цвет фона слоя */
        padding: 20px; /* Поля вокруг текста */
        float: right; /* Обтекание по правому краю */
        width: 45%; /* Ширина слоя */
    }

</style>
