// Webpack uses this to work with directories
const webpack = require('webpack');
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const projectPath = './src/';
const devMode = process.env.NODE_ENV !== 'production';

// This is the main configuration object.
// Here you write different options and tell Webpack what to do
module.exports = {
  context: path.resolve(__dirname, projectPath),

  devtool: 'cheap-module-source-map',
  // Path to your entry point. From this file Webpack will begin his work
  entry: {
    main: ['./js/main.js', './scss/main.scss'],
  },

  // Path and filename of your result bundle.
  // Webpack will bundle all JavaScript into this file
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle-[name].js',
  },
  externals: {
    fs: "require('fs')",
    path: "require('path')",
  },
  resolve: {
    extensions: ['.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
          sourceMaps: devMode,
          ignore: [/jquery/],
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              esModule: false,
              sourceMap: devMode,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: devMode,
              postcssOptions: {
                plugins: [
                  ['autoprefixer'],
                ],
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: devMode,
            },
          },
        ],
      },

    ],
  },
  devServer: {
    contentBase: "./",
    hot: true,
    port: 3333,
    historyApiFallback: true
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
    new MiniCssExtractPlugin({
      ignoreOrder: true,
      filename: 'layout-[name].css',
    })
  ],
};
