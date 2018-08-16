const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
    entry: {
        index: ['./src/bubbleTip.js', './src/index.js']
    },
    output: {
        filename: '[name].js',
        path: __dirname + '/dist'
    },
    resolve:{
        extensions: [".js", ".css", ".json"],
        alias: {}
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader?cacheDirectory"
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: { importLoaders: 1}
                    },
                    'postcss-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.html$/,
                use: ['html-loader']
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin('dist'),
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html"
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.ProvidePlugin({
            $: 'jquery'
        })

    ],
    optimization: {
        //runtimeChunk: true,
        splitChunks: {
            cacheGroups: {
                vendor: {   // 抽离第三方插件
                    test: /node_modules/,   // 指定是node_modules下的第三方包
                    chunks: 'initial',
                    name: 'jquery',  // 打包后的文件名，任意命名
                    // 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
                    priority: 10
                },
                bubbleTip: {
                    test: /bubbleTip/,
                    chunks: 'initial',
                    name: 'bubbleTip',
                    minSize: 0
                }
            }
        }

    },
    devServer: {
        contentBase: path.join(__dirname, "src"), //静态文件根目录
        port: 9090, // 端口
        host: 'localhost', // 设置热更新,需要引入webpack模块，并在插件plugins中配置new webpack.HotModuleReplacementPlugin()
        hot: true,
        overlay: true,
        compress: true // 服务器返回浏览器的时候是否启动gzip压缩
    }
}


/*loader的三种写法

一般简单的用第一种,涉及参数配置的用第三种

1.use:['xxx-loader','xxx-loader']
2.loader:['style-loader','css-loader']
3.use:[{loader:'style-loader'},{loader:'css-loader'} ]*/
