const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: ['./src/app.js'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    devServer: {
        inline:true
    },
    optimization: {
        minimizer: [
            new OptimizeCssAssetsPlugin({}),
            new UglifyJsPlugin({
                sourceMap: true,
            })
        ]
    },
    module: {
        rules: [
            {
                test: /\.(scss|css)$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader'],
                })
            },
            {
                test: /\.(woff|woff2|eot|ttf)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts/',
                        publicPath: url => `fonts/${url}`
                    }
                }]
            },
            {
                test: /\.(jpe?g|gif|png|svg)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'img/',
                        publicPath: url => `img/${url}`
                    }
                }]
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('style.css'),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.optimize\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
                preset: ['default', { discardComments: { removeAll: true } }],
            },
            canPrint: true
        }),
        new HtmlWebpackPlugin({
            inject: false,
            hash: true,
            //minify: true,
            template: './src/index.html',
            filename: 'index.html'
        })
    ]
};
