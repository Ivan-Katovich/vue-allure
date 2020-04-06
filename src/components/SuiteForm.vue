<template>
    <div>
        <div class="title">
            <h1 class="center" v-if="env.name">TA {{title}} - {{env.values[0]}} ({{client.values[0]}})</h1>
        </div>
        <div class="results">
            <results-chart :smart-results="smartResults" :wait="waitData"/>
        </div>
        <div class="time frame">
            <time-box :smart-time="smartTime"/>
            <div class="redirect">
                <a :href="pathToAllure" >
                    <img class="logo" src="../assets/allure.png" alt="Allure">
                </a>
            </div>
        </div>
        <div>
            <svg class="border">
                <rect class="line" />
            </svg>
        </div>
        <div class="info frame">
            <info-box :smart-info="smartInfo"/>
        </div>
        <div>
            <svg class="border">
                <rect class="line" />
            </svg>
        </div>
        <div class="categories">
            <category-chart :smart-categories="smartCategories" :wait="waitData"/>
        </div>
    </div>
</template>

<script>
    import TimeBox from './boxes/TimeBox';
    import InfoBox from './boxes/InfoBox';
    import CategoryChart from './charts/CategoryChart';
    import ResultsChart from './charts/ResultsChart';
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
                smartInfo: [],
                smartCategories: [],
                env: {
                    values: [],
                    name: null
                },
                client: {
                    values: [],
                    name: null
                },
                waitData: null
            }
        },
        components: {
            TimeBox,
            InfoBox,
            CategoryChart,
            ResultsChart
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
            },
            applyData() {
                this.env = {...this.env, ...this.smartInfo.find((i) => i.name === 'Environment')};
                this.client = {...this.client, ...this.smartInfo.find((i) => i.name === 'Client')};
            }
        },
        async created() {
            this.waitData = this.organizeData();
        },
        async mounted() {
            await this.waitData;
            this.applyData();
        }
    }
</script>

<style scoped>
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
