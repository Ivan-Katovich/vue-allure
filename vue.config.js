const path = require('path');

module.exports = {
    // chainWebpack: config => {
    //     console.log(process.env.NODE_ENV);
    //     config.plugin('copy').tap(([options]) => {
    //         options[0].ignore.push('src/support/allureDataGetter.js');
    //         return [options]
    //     })
    // },
    configureWebpack: {
        mode: 'production',
        externals: {
            dataGetter: path.resolve(__dirname,'src/support/allureDataGetter.js'),
            // regressionSummary: path.resolve(__dirname, 'allure-regression/allure-report/widgets/summary.json')
        },
        // module: {
        //     rules: [
        //         {
        //             // test: /\.js$/,
        //             exclude: [
        //                 path.resolve(__dirname, 'src/support/allureDataGetter.js')
        //             ],
        //             // use: [
        //             //     {
        //             //         loader: path.resolve(__dirname, 'node_modules/babel-loader/lib/index.js')
        //             //     }
        //             // ]
        //         }
        //     ]
        // }
    }
};
