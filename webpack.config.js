const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const cwd = process.cwd(); // /Users/yangtianbao/learn/javascript/zhufeng 当前文件夹的绝对路径
module.exports = {
    mode: 'development',
    devtool: false,
    entry:{
        antdn: './index.js'
    },
    output: {
        path: path.resolve('dist'),
        filename: '[name].js',
        library: 'antdn',
        libraryTarget: 'umd'
    },
    // 剔除不需要打进bundle的包
    externals: {
        react: {
            root: 'React',
            commonjs2: 'react',
            commonjs: 'react',
            amd: 'react'
        },
        'react-dom': {
            root: 'ReactDOM',
            commonjs2: 'react-dom',
            commonjs: 'react-dom',
            amd: 'react-dom'
        }
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', 'json'],
        alias: {
            antdesign: cwd
        }
    },
    module: {
        rules: [
            {
                test: /\.(j|t)sx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: ['autoprefixer']
                            },
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: ['autoprefixer'],
                            },
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            lessOptions: {
                                javascriptEnable: true
                            },
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /.(png|jpg|gif|svg)(\?v=\d+\.\d+\.\d+)?$/i,
                type: 'assets'
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css'
        })
    ]
}