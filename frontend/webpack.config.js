const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const dotenv = require("dotenv");

module.exports = () => {
    const env = dotenv.config().parsed;
    const envKeys = Object.keys(env).reduce((prev, next) => {
        prev[`process.env.${next}`] = JSON.stringify(env[next]);
        return prev;
    }, {});
    return {
        entry: ["babel-polyfill", "./src/index.js"],
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: "build.js"
        },
        resolve: {
            extensions: [".js", ".jsx"],
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                    },
                },
                {
                    test: /\.html$/,
                    use: [
                        {
                            loader: "html-loader"
                        },
                    ],
                },
                {
                    use: [
                        "style-loader",
                        "css-loader",
                        "sass-loader",
                    ],
                    test: /\.(css|sass|scss)$/,
                },
                {
                    type: "asset",
                    test: /\.(svg|jpg|png)$/
                },
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: "./public/index.html",
                filename: "./index.html",
            }),
            new webpack.DefinePlugin(envKeys),
        ],
    }
};
