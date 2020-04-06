<template>
    <div class="chart" v-if="series[0].data.length">
        <apexchart :options="options" :series="series"></apexchart>
    </div>
</template>

<script>
    import VueApexCharts from 'vue-apexcharts';

    export default {
        name: "CategoryChart",
        props: {
            smartCategories: Array,
            wait: Promise
        },
        data() {
            return {
                series: [{name: 'defects', data: []}],
                options: {
                    chart: {
                        id: 'defects',
                        type: 'bar',
                        height: 350
                    },
                    title: {
                        text: 'Defects categories',
                        align: 'center',
                        floating: true,
                        offsetY: -7,
                        style: {
                            fontSize:  '20px',
                            fontWeight:  'bold',
                            fontFamily:  undefined,
                            color:  '#373d3f'
                        },
                    },
                    colors: ['#800000'],
                    plotOptions: {
                        bar: {
                            horizontal: true,
                        }
                    },
                    dataLabels: {
                        enabled: true
                    },
                    yaxis: {
                        forceNiceScale: true,
                        labels: {
                            style: {
                                fontSize: '14px'
                            }
                        }
                    },
                    xaxis: {
                        categories: [],
                        labels: {
                            style: {
                                fontSize: '14px'
                            }
                        }
                    }
                }
            }
        },
        components: {
            apexchart: VueApexCharts,
        },
        async mounted() {
            await this.wait;
            this.series[0].data = this.smartCategories.map((category) => category.statistic.total);
            this.options = {...this.options, ... {
                    xaxis: {
                        categories: this.smartCategories.map((category) => category.name)
                    }}};
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
