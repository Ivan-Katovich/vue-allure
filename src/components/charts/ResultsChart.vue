<template>
    <div class="chart" v-if="series.length">
        <apexchart :options="options" :series="series"></apexchart>
    </div>
</template>

<script>
    import VueApexCharts from 'vue-apexcharts';

    export default {
        name: "ResultsChart",
        props: {
            smartResults: Object,
            wait: Promise
        },
        data() {
            return {
                series: [],
                options: {
                    labels: [' passed', ' failed', ' skipped'],
                    colors:['#336600', '#800000', '#7c7e7a'],
                    legend: {
                        position: 'right',
                        offsetY: 0,
                        height: 400,
                        fontSize: '20px',
                        markers: {
                            width: 14,
                            height: 14,
                            strokeWidth: 0,
                            strokeColor: '#fff',
                            fillColors: undefined,
                            radius: 12,
                            customHTML: undefined,
                            onClick: undefined,
                            offsetX: 0,
                            offsetY: 0
                        },
                    },
                    chart: {
                        id: 'statistic',
                        type: 'donut',
                    },
                    plotOptions: {
                        pie: {
                            donut: {
                                size: '75%',
                                labels: {
                                    show: true,
                                    total: {
                                        label: 'Total TCs run',
                                        showAlways: true,
                                        show: true,
                                        fontSize: '150%',
                                    },
                                    value: {
                                        show: true,
                                        fontSize: '200%',
                                        offsetY: 25,
                                    },
                                }
                            }
                        }
                    },
                    responsive: [{
                        breakpoint: 480,
                        options: {
                            chart: {
                                width: 10
                            },
                            legend: {
                                position: 'bottom'
                            }
                        }
                    }]
                },
            };
        },
        components: {
            apexchart: VueApexCharts
        },
        async mounted() {
            await this.wait;
            this.options = {...this.options, ...{
                    labels: Object.keys(this.smartResults)
                }};
            this.series = Object.values(this.smartResults);
        }
    }
</script>

<style scoped>
    .chart {
        width: 80%;
        margin-left: auto;
        margin-right: auto;
    }
</style>
