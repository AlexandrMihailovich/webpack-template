const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');


module.exports = {
    entry: ['./src/app.js'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    devServer: {
        inline:true
    },
    devtool: "source-map",
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
                    use: [{
                        loader: "css-loader", options: {
                            sourceMap: true
                        }
                    }, {
                        loader: "sass-loader", options: {
                            sourceMap: true
                        }
                    },{
                        loader: 'postcss-loader',
                        options: {
                          //ident: 'postcss',
                          sourceMap: true,
                          plugins: [
                            require('autoprefixer'),
                          ]
                        }
                    }
                ],
                })
            },
            {
                test: /\.(woff|woff2|eot|ttf|svg)$/,
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
                test: /\.(html|htm)$/,
                use: ['html-loader']
            },
            {
                test: /\.(jpe?g|gif|png)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'img/',
                        publicPath: url => `img/${url}`
                    }
                },{
                    loader: 'image-webpack-loader',
                    options: {
                      mozjpeg: {
                        progressive: true,
                        quality: 65
                      },
                      // optipng.enabled: false will disable optipng
                      optipng: {
                        enabled: false,
                      },
                      pngquant: {
                        quality: '40-50',
                        speed: 4
                      },
                      gifsicle: {
                        interlaced: false,
                      }//,
                      // the webp option will enable WEBP
                      //webp: {
                        //enabled: false
                        //quality: 75
                      //s}
                    }
                  },
            ]
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            'window.jQuery': 'jquery',
            jQuery: 'jquery'
          }),
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
