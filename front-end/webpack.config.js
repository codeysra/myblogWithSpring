const path= require("path");
const htmlWebpackPlugin = require('html-webpack-plugin');

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
        }]
    },
    devtool: 'cheap-module-eval-source-map',
    devServer:{
        contentBase: path.join(__dirname,'public'),
        historyApiFallback:true

     },
     plugins: [
       new htmlWebpackPlugin({
         template: './src/index.html'
       })
     ]
};