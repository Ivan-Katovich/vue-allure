<template>
    <div>
        <div class="title frame">
            <h1>{{title}}</h1>
        </div>
        <div class="chart">
            <apexchart :options="options" :series="series"></apexchart>
        </div>
        <div class="time frame">
            <div class="box">
                <h1>Started: {{time.start}}</h1>
                <h1>Duration: {{time.duration}}</h1>
            </div>
            <div class="redirect">
                <a :href="pathToAllure" >
                    <img class="logo" src="../assets/allure.png" alt="Allure">
                </a>
            </div>
        </div>
    </div>
</template>

<script>
    import VueApexCharts from 'vue-apexcharts'
    import moment from 'moment'
    import { getSummary } from '../support/allureDataGetter';

    export default {
        name: 'SuiteForm',
        props: {
            suite: {
                type: String
            },
            title: {
                type: String,
                default: 'Untitled'
            }
        },
        data() {
            return {
                pathToAllure: `${process.env.BASE_URL}${this.suite}/`,
                smartResults: {},
                smartTime: {},
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
                        width: 500,
                        type: 'donut',
                    },
                    plotOptions: {
                        pie: {
                            donut: {
                                size: '75%',
                                labels: {
                                    show: true,
                                    total: {
                                        label: 'Total TCs amount',
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
                series: [],
                time: {
                    start: null,
                    duration: null
                },
                waitData: null
            }
        },
        components: {
            apexchart: VueApexCharts
        },
        methods: {
            async organizeData() {
                const summary = await getSummary(this.suite);
                this.smartResults = {
                    passed: summary.statistic.passed,
                    failed: summary.statistic.failed,
                    skipped: summary.statistic.skipped,
                };
                this.smartTime = {
                    start: moment.utc(summary.time.start).format('MM/DD/YYYY HH:mm:ss'),
                    duration: {
                        h: moment.duration(summary.time.duration).hours(),
                        m: moment.duration(summary.time.duration).minutes(),
                        s: moment.duration(summary.time.duration).seconds(),
                    }
                };
            },
            applyData() {
                this.options.labels = Object.keys(this.smartResults);
                this.series = Object.values(this.smartResults);
                this.time.start = this.smartTime.start;
                this.time.duration = `${this.smartTime.duration.h}h ${this.smartTime.duration.m}m ${this.smartTime.duration.s}s`
            }
        },
        created() {
            console.log(process.env.BASE_URL);
            this.waitData = this.organizeData();
        },
        mounted() {
            this.waitData
                .then(() => {
                    this.applyData();
                });
        }
    }
</script>

<style scoped>
    .chart {
        width: 80%;
        margin-left: auto;
        margin-right: auto;
    }
    .frame {
        height: 80px;
        text-align: center;
        color: #373d3f;
    }
    .box {
        height: 100%;
        width: 70%;
        float: left;
        text-align: left;
        font-size: 12px;
    }
    .title {
        font-size: 18px;
    }
    .redirect {
        float: right;
        text-align: center;
        width: 12%;
        height: 100%
    }
    .logo {
        width: 100%;
        height: 100%;
    }
</style>
