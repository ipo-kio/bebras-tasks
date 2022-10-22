'use strict';

const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const merge = require('deepmerge');
const path = require('path');
const fs = require('fs');

const sourceFolders = [
    path.join(__dirname, 'src')
];

//envirnoment env.mode = 'prod'|'dev'

function update_config_entries(config) {
    //create output html files

    config.entry = {};

    let html = fs.readFileSync('./src/XX-00.html', {encoding: "utf8"});

    if (!fs.existsSync('./dist'))
        fs.mkdirSync('./dist');

    fs.readdirSync('./src').forEach(file => {
        if (file.indexOf('.') < 0 && file.indexOf('-') > 0) {
            config.entry[file] = file + '/' + file + '.js';

            let output_html = html.replace('[TASK]', file);

            let pngFile = 'src/' + file + '/' + file + '.nocompress.png';
            let bgReplacement;
            if (fs.existsSync(pngFile))
                bgReplacement = ", 'bg': '../" + pngFile + "'";
            else
                bgReplacement = '';

            output_html = output_html.replace('[ADD BG IMAGE]', bgReplacement);

            fs.writeFileSync('./dist/' + file + '.html', output_html, {encoding: "utf8"});
        }
    });
}

module.exports = function (env) {
    let config = {
        /*entry: {
            'XX_00': 'XX_00/XX-00.js'
        },*/
        output: {
            path: path.join(__dirname, '/dist'),
            filename: '[name].js',
            library: 'task'
        },
        resolve: {
            modules: sourceFolders
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: ['babel-loader'], //Why loader instead of use?
                    // include: sourceFolders,
                }
            ]
        },
        plugins: [
            new CopyWebpackPlugin({
                patterns: [
                    'app'
                ]
            })
        ]
    };

    let debugConfig = {
        mode: 'development',
        devtool: 'source-map',
        output: {
            pathinfo: true
        }
    };

    let productionConfig = {
        mode: 'production'
    };

    let arrayMerge = function (destArray, sourceArray, options) {
        return destArray.concat(sourceArray);
    };

    update_config_entries(config);

    let final_config;
    if (env && env.mode === 'prod')
        final_config = merge(config, productionConfig, {arrayMerge: arrayMerge});
    else
        final_config = merge(config, debugConfig, {arrayMerge: arrayMerge});

    console.log(final_config);
    return final_config;
};
