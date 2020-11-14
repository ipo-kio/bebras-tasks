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
                    loader: 'babel-loader', //Why loader instead of use?
                    include: sourceFolders,
                    options: {
                        presets: [
                            ['es2015', {"modules": false}], //this is es2015 preset with options
                        ],
                        plugins: [
                            "transform-object-rest-spread",
                            "transform-class-properties"
                            // ["transform-object-rest-spread", { "useBuiltIns": true }]
                        ]
                    }
                }
            ]
        },
        plugins: [
            new CopyWebpackPlugin([
                {from: './app/*', to: '.', flatten: true}
            ])
        ]
    };

    let debugConfig = {
        devtool: 'source-map',
        //debug: true, //TODO https://webpack.js.org/guides/migrating/#debug
        output: {
            pathinfo: true
        }
    };

    let productionConfig = {
        plugins: [
            new webpack.optimize.UglifyJsPlugin({
                comments: false
            })
        ]
    };

    let arrayMerge = function (destArray, sourceArray, options) {
        return destArray.concat(sourceArray);
    };

    update_config_entries(config);

    if (env && env.mode === 'prod')
        return merge(config, productionConfig, {arrayMerge: arrayMerge});
    else
        return merge(config, debugConfig, {arrayMerge: arrayMerge});
};
