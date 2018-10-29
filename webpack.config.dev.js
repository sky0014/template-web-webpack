const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
  devtool: "source-map",
  // devtool: "cheap-module-eval-source-map",

  entry: {
    bunder: "./src/js/index.js"
  },
  output: {
    path: __dirname + "/dist",
    filename: "js/[name].js"
  },

  // webpack-dev-server配置
  devServer: {
    contentBase: "./dist",
    port: 9003,
    progress: true, //显示进度
    compress: true //开启压缩
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.ejs"
    }),
    new CleanWebpackPlugin("dist")
  ],

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["es2015", { modules: false }], "stage-2"]
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              camelCase: true,
              localIdentName: "[local]-[hash:6]"
            }
          }
        ]
      },
      {
        test: /\.(png)|(jpg)|(jpeg)|(gif)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 20000,
            name: "res/img/[name].[ext]"
          }
        }
      },
      {
        test: /\.swf$/,
        use: {
          loader: "file-loader",
          options: {
            name: "res/flash/[name].[ext]"
          }
        }
      },
      {
        test: /\.(eot|woff|woff2|svg|ttf)([\?]?.*)$/,
        use: {
          loader: "file-loader",
          options: {
            limit: 20000,
            name: "res/font/[name].[ext]"
          }
        }
      }
    ]
  }
};
