const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src',
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  watch: false,
  devServer: {
    historyApiFallback: true,
    open: true,
    compress: true,
    hot: true,
    port: 8080,
  },

  module: {
    rules: [
      {
        test: /\.html$/i,
        use: "html-loader"
      },
      {
        test: /\.s[ca]ss$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { sourceMap: false } },
          'sass-loader',
        ]
      },
      {
        test: /\.css$/i,
        include: /src\\ui-kit.*\\/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { sourceMap: false } }
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/img/[name][hash][ext]'
        }
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/font/[name][hash][ext]'
        }
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'blocks.[name].build.css',
    }),
    new HtmlWebpackPlugin({
      title: 'JS Tree',
      template: './src/index.html',
      filename: 'index.html',
    }),
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],

  
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin({
        exclude: 'fus-style.css',
      }),
    ],
    splitChunks: {
      cacheGroups: {
          style: {
              name: 'style',
              test: /style\.s?css$/,
              chunks: 'all',
              enforce: true,
          },
          fusStyle: {
              name: 'ui-kit',
              test: /fus-style\.css$/,
              chunks: 'all',
              enforce: true,
          },
      },
    },
  },
};