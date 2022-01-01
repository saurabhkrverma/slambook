// webpack config
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path');

const htmlPlugin = new HtmlWebPackPlugin({
    template: "./client/index.html",
    filename: "./index.html"
});

const cssPlugin = new MiniCssExtractPlugin({
    filename: "./index.css"
});

module.exports = {
    mode: "development",
    devtool: 'source-map',
    entry: ["./client/index.js"],
    output: {
        path: path.join(__dirname, "dist"),
        filename: "index.js"
    },
    plugins: [htmlPlugin, cssPlugin],
    module: {
      rules: [{
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: [{
              "loader": "babel-loader"
          }]
      },{
          test: /\.s?css$/,
          exclude: /node_modules/,
          use: [{
              loader: MiniCssExtractPlugin.loader,
          },
              {
                  loader: "css-loader",
              },
              {
                  loader: "sass-loader"
              }]
      }]
  }
};
