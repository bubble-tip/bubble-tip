module.exports = {
    entry: './src/bubbleTip.js',
    output: {
        path: __dirname,
        filename: "index.js"
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
            }
        ]
    }
}