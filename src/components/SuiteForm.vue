<template>
    <div>
        <div class="title">
            <h1 class="center">{{title}} - {{env.values[0]}}</h1>
        </div>
        <div class="chart">
            <apexchart :options="chartOptions" :series="chartSeries"></apexchart>
        </div>
        <div class="time frame">
            <time-box :smart-time="this.smartTime"/>
            <div class="redirect">
                <a :href="pathToAllure" >
                    <img class="logo" src="../assets/allure.png" alt="Allure">
                </a>
            </div>
        </div>
        <svg class="border">
            <rect class="line" />
        </svg>
        <div class="info frame">
            <info-box :smart-info="this.smartInfo"/>
        </div>
        <svg class="border">
            <rect class="line" />
        </svg>
        <div class="categories">
            <div id="chart" class="chart">
                <apexchart :options="categoryOptions" :series="categorySeries"></apexchart>
            </div>
        </div>
    </div>
</template>

<script>
    import VueApexCharts from 'vue-apexcharts';
    import TimeBox from './TimeBox';
    import InfoBox from './InfoBox';
    import moment from 'moment';
    import {getSummary, getCategories, getEnvInfo} from '../support/allureDataGetter';

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
                smartInfo: {},
                smartCategories: [],
                chartSeries: [],
                chartOptions: {
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
                categorySeries: [{name: 'defects', data: []}],
                categoryOptions: {
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
                },
                env: {},
                waitData: null
            }
        },
        components: {
            apexchart: VueApexCharts,
            TimeBox,
            InfoBox
        },
        methods: {
            async organizeData() {
                const summary = await getSummary(this.suite);
                const categories = await getCategories(this.suite);
                this.smartInfo = await getEnvInfo(this.suite);
                this.smartResults = {
                    passed: summary.statistic.passed,
                    failed: summary.statistic.failed,
                    skipped: summary.statistic.skipped,
                };
                this.smartTime = {
                    start: moment(summary.time.start).format('MM/DD/YYYY HH:mm:ss (UTC Z)'),
                    ago: {
                        d: moment.duration(parseInt(moment().format('x')) - summary.time.start).days(),
                        h: moment.duration(parseInt(moment().format('x')) - summary.time.start).hours(),
                        m: moment.duration(parseInt(moment().format('x')) - summary.time.start).minutes(),
                    },
                    duration: {
                        h: moment.duration(summary.time.duration).hours(),
                        m: moment.duration(summary.time.duration).minutes(),
                        s: moment.duration(summary.time.duration).seconds(),
                    }
                };
                this.smartCategories = categories;
                this.env = this.smartInfo.find((i) => i.name === 'Environment');
            },
            applyData() {
                this.chartOptions = {...this.chartOptions, ...{
                    labels: Object.keys(this.smartResults)
                    }};
                this.chartSeries = Object.values(this.smartResults);
                this.categorySeries[0].data = this.smartCategories.map((category) => category.statistic.total);
                this.categoryOptions = {...this.categoryOptions, ... {
                    xaxis: {
                        categories: this.smartCategories.map((category) => category.name)
                    }}};
            }
        },
        async created() {
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
    .title {
        height: 100px;
        text-align: center;
        color: #373d3f;
    }
    .frame {
        height: 100px;
        text-align: center;
        color: #373d3f;
        display: table;
    }
    .time {
        height: 100%;
        width: 100%;
    }
    .title {
        font-size: 18px;
    }
    .redirect {
        float: right;
        text-align: center;
        width: 15%;
        height: 100%
    }
    .logo {
        width: 100%;
        height: 100%;
    }
    .border{
        height: 2px;
        width: 93%;
        padding: 20px;
        color: #373d3f;
    }
    .line {
        fill: #373d3f;
        width: 100%;
        height: 2px;
    }
</style>
