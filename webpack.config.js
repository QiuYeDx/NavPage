const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    // 入口文件
    entry: './src/index.js',
    // 出口文件
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        // publicPath: '/NavPage/' // 部署到GitHub Pages时用
        publicPath: '/' // 部署到GitHub Pages时用(CDN)

    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                        ],
                        plugins: [
                            "babel-plugin-macros", // twin.macro使用
                            // 其他插件
                        ],
                        babelrc: true,
                    },
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif|heif)$/i,
                use: [
                    {
                        loader: 'url-loader', // file-loader
                        options: {
                            limit: 1, // 图片大小限制，超过此大小将被打包成文件
                            name: '[name].[ext]', // 重命名输出的文件名
                            outputPath: 'images/', // 输出路径
                        },
                    },
                ],
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        // alias: {
        //     Src: path.resolve(__dirname, 'src/'),
        //     Images: path.resolve(__dirname, 'src/assets/images/'),
        // },
        alias: {
            "@": path.resolve('src'),
            "images": path.resolve('src/assets/images'),
        },
    },

    // 用于指定 webpack-dev-server 的配置
    devServer: {
        static: path.resolve(__dirname, 'public'),
        compress: true,
        port: 3000,
        open: true,
        hot: true,
        historyApiFallback: true  //缺少该配置, 会出现Cannot Get的错误
    },
    devtool: "inline-source-map",    //  部署前注释掉, 不然打包的静态文件过大, 也不需要
    plugins:[
        new HtmlWebpackPlugin({
            template:path.resolve(__dirname,'public/index.html')
        })
    ]
};
