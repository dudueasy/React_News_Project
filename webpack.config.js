let debug = process.env.NODE_ENV !== "production";
let webpack = require('webpack');
let path = require('path');
const BabiliPlugin = require("babili-webpack-plugin");


module.exports = {
    devServer: {
        historyApiFallback: true
    },
    // performance: {
    //     hints: "warning", // 提示的类型
    //     maxEntrypointSize: 1000000, // 限制入口文件的大小, 单位为bytes
    //     maxAssetSize: 450000,// 限制每个静态资源文件的大小, 单位为bytes
    // },
    context: path.join(__dirname),
    devtool: debug ? "inline-sourcemap" : "source-map",
    entry: {
        app: "./src/js/root.js",
        vendor:["react"],
    },
    module: {
        loaders: [
            {
                test: /\.js?$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015'],
                    plugins: ['react-html-attrs'], //添加组件的插件配置

                }
            },
            //下面是使用 ant-design 的配置文件
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            // less
            {
                test: /\.less$/,
                loader: "style-loader!css-loader!less-loader"
            }
        ]
    },
    output: {
        path: __dirname,
        filename: "[name].js"
    },
    plugins: debug ? [] : [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({mangle: false, sourcemap: false}),
        new BabiliPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
        })
    ],
};
