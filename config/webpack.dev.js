const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpackMerge = require("webpack-merge").merge;
const commonConf = require("./webpack.common");
const outputFile = "[name]";
const assetFile = "[name]";
const path = require("path");

module.exports = () =>
  webpackMerge(commonConf({ outputFile, assetFile }), {
    mode: "development",
    devtool: "source-map",
    devServer: {
      open: true,
      contentBase: "../public",
      watchOptions: {
        ignored: /node_modules/,
      },
    },
    plugins: [
      new HtmlWebpackPlugin({
        favicon: './src/images/favicon.ico',
        template: "./src/index.html",
        inject: "body",
      }),
    ],
  });