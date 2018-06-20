const path= require("path");
const htmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry:'./src/app.js',
    output:{
        publicPath:'/public',
        path:path.join(__dirname,'public'),
        filename:"bundle.js"
    },
    mode: "development",
    module:{
        rules:[{
            loader:'babel-loader',
            test: /\.js$/,
            exclude: /node_modules/
        },{
            test:/\.s?css$/,
            use:[
                'style-loader',
                'css-loader',
                'sass-loader'
            ]
        },
        { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
        { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }
        ]
    },
    devtool: 'cheap-module-eval-source-map',
    devServer:{
        contentBase: path.join(__dirname,'public'),
        historyApiFallback:true

     },
     plugins: [
       new htmlWebpackPlugin({
         template: './src/index.html'
       }),
       new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery"
      })
     ]
   
};