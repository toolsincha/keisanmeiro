const path = require("path");
const paths = require("./paths");
const version = require("./version");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const WorkBoxWebpackPlugin = require("workbox-webpack-plugin");
const { ProvidePlugin, DefinePlugin } = require("webpack");
const outputPath = path.resolve(__dirname, "../public");
const WebpackPwaManifest = require('webpack-pwa-manifest')

module.exports = ({ outputFile, assetFile }) => ({
  entry: "./src/app.js",
  output: {
    path: outputPath,
    filename: `${outputFile}.js`,
    chunkFilename: `${outputFile}.js`,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", "sass-loader"],
      },
      {
        test: /\.(jpe?g|gif|png|svg|woff2?|ttf|ept|mp3|ttf)$/,
        type: "asset/resource",
        generator: {
          filename: "./images/[name]_" + version.version_dir_name + "[ext]",
        },
      },
      {
        test: /\.ico$/i,
        type: "asset/resource",
        generator: {
          filename: "./[name]_" + version.version_dir_name + "[ext]",
        },
      },
      {
        test: /\.(mp3)$/,
        type: "asset/resource",
        generator: {
          filename: "./audio/[name]_" + version.version_dir_name + "[ext]",
        },
      },
      {
        test: /\.(ttf)$/,
        type: "asset/resource",
        generator: {
          filename: "./fonts/[name]_" + version.version_dir_name + "[ext]",
        },
      },
      {
        test: /\.html$/,
        use: ["html-loader"],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `${outputFile}.css`,
    }),
    new DefinePlugin({
      __VERSION__: JSON.stringify(version.version),
      __NAME__: JSON.stringify(version.name),
      __TITLE__: JSON.stringify(version.title),
      __PATH__: JSON.stringify(version.publicPath),
    }),
    new WebpackPwaManifest({
      lang: "ja-jp",
      short_name: "けいさんめいろ",
      name: "けいさんめいろ",
      display: "standalone",
      orientation: "portrait",
      description: "楽しく学べるけいさんめいろ。",
      start_url: "index.html",
      background_color: "#000000",
      theme_color: "#000000",
      publicPath: version.publicPath,
      inject: true,
      writeToFileEmit: true,
      icons: [
        {
          src: path.resolve("src/images/icon-512x512.png"),
          sizes: [96, 128, 192, 256, 384, 512],
        },
      ],
    }),
/*
    new WorkBoxWebpackPlugin.GenerateSW({
      swDest: outputPath + "/sw.js",
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
    }),
*/

  ],
  optimization: {
    splitChunks: {
      chunks: "all",
      minSize: 0,
      cacheGroups: {
        vendors: {
          name: "vendors",
          test: /node_modules/,
          priority: -10,
        },
        utils: {
          name: "app",
          test: /src[\\/]js/,
        },
        default: false,
      },
    },
  },
  // ここから追加
  resolve: {
    alias: {
      "@scss": path.resolve(__dirname, "../src/scss"),
      "@imgs": path.resolve(__dirname, "../src/images"),
      "@audio": path.resolve(__dirname, "../src/audio"),
      "@fonts": path.resolve(__dirname, "../src/fonts"),
      "@config": path.resolve(__dirname, "../src/config"),
      "@": paths.src,
    },
    extensions: [".js", ".scss"],
    modules: [path.resolve(__dirname, "src"), "node_modules"],
  },
  // ここまで
});
