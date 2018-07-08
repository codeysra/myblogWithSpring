const path= require("path");
const htmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = env => {

    const isProduction = env === 'production';

    return {
        entry:'./src/app.js',
        output:{
            publicPath:'../src/main/webapp/resources/',
            path:
                path.join(__dirname,'../src/main/webapp/resources/') ,
                
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
            },{
                test: /\.(png|jpg|gif)$/,
                loader: 'file-loader',
                query:{
                    outputPath: './img/',
                    name: '[path][name]-[hash:8].[ext]'
                }
            },
                // { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000" },
                // { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }
                {
                    // Capture eot, ttf, woff, and woff2
                    test: /\.(otf|eot|ttf|woff|svg|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                    use: [
                    {
                        loader: 'file-loader',
                        options: {
                        outputPath: './fonts/',
                        name: '[name].[ext]',
                        },
                    },
                    ],
                }
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
            }),
            new webpack.DefinePlugin({
                'process.env':{
                   'NODE_ENV': JSON.stringify('production'),
                   'URL': isProduction ? JSON.stringify('https://youscodes.herokuapp.com'):
                            JSON.stringify('http://localhost:8080')
                   
                 }
             })
        ]
    }
};