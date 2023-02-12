const HtmlWebpackPlugin = require("html-webpack-plugin");
const OptimizeCssPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const webpackMerge = require("webpack-merge").merge;
const commonConf = require("./webpack.common");
const outputFile = "[name].[chunkhash]";
const assetFile = "[name].[contenthash]";
const path = require("path");
const outputPath = path.resolve(__dirname, "../public");
const WorkBoxWebpackPlugin = require("workbox-webpack-plugin");


const version = require('./version');

module.exports = () => webpackMerge(commonConf({ outputFile, assetFile }), {
  mode: "production",
  output: {
    publicPath: version.publicPath,
  },
  plugins: [
    new HtmlWebpackPlugin({
      favicon: './src/images/favicon.ico',
      template: "./src/index.html",
      inject: "body",
      minify: {
        collapseWhitespace: true,
        keepClosingSlash: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
      },
    }),
    new WorkBoxWebpackPlugin.GenerateSW({
      swDest: outputPath + "/sw.js",
      runtimeCaching: [
        {
          urlPattern: "index.html",
          handler: "NetworkFirst",
        },
      ],
      /*
      runtimeCaching: [
        {
          urlPattern: "/",
          handler: "NetworkFirst",
          options: {
            cacheName: "page",
            expiration: {
              maxAgeSeconds: 60 * 60 * 24,
            },
          },
        },
        {
          urlPattern: /\.(js)/,
          handler: "NetworkFirst",
          options: {
            cacheName: "js",
            expiration: {
              maxAgeSeconds: 60 * 60 * 24,
            },
          },
        },
        {
          urlPattern: /\.(png|svg|woff|ttf|eot)/,
          handler: "CacheFirst",
          options: {
            cacheName: "assets",
            expiration: {
              maxAgeSeconds: 60 * 60 * 24 * 14,
            },
          },
        },
      ],
      */
    }),
  ],
  // ここから追加
  optimization: {
    minimizer: [new TerserPlugin({
      extractComments: 'all',
      terserOptions: {
          compress: {
            drop_console: true,
          },
      },
  }), new OptimizeCssPlugin()],
  },
});