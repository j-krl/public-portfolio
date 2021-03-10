module.exports = {
    mode: "development",
    entry: {
        rottenPotatoes: "./rotten-potatoes/RottenPotatoes.jsx",
        react4: "./react4/react4.jsx",
    },
    output: {
        path: __dirname + "/public",
        filename: "[name].js",
    },
    watch: true,
    devtool: "eval-source-map",
    module: {
        rules: [
            {
                test: /\.ts(x)?$/,
                use: ["awesome-typescript-loader"],
                exclude: /node_modules/,
            },
            {
                enforce: "pre",
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: "eslint-loader",
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"],
                    },
                },
            },
            {
                test: /\.css|scss$/,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                loader: "file-loader",
                options: {
                    outputPath: "images",
                    name: "[name].[ext]",
                },
            },
        ],
    },
    resolve: {
        extensions: [".js"],
    },
};
