const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.
module.exports = {
  mode: 'development',
  entry: './assets/js/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    assetModuleFilename: 'assets/icons/[name][ext]',
  },

  plugins: [
    new WebpackPwaManifest({
      name: "JATE text editor",
      short_name: "JATE",
      description: "Just another text editor!",
      background_color: "#7eb4e2",
      theme_color: "#7eb4e2",
      filename: 'manifest.json',
      fingerprints: false,
      inject: false,
      start_url: "./",
      publicPath: "./",

      icons: [
        {
          src: path.resolve("assets/images/logo.png"),
          sizes: [96, 128, 192,256, 384, 512],
          destination: 'assets/icons',
          filename: '[name]-[width].png',
          purpose: 'maskable any',
          useHash: false,
          /*
          destination: path.join("assets", "icons"),
          */
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: './index.html',
      title: 'Webpack Plugin',
    }),

    new MiniCssExtractPlugin(),

    new InjectManifest({
      swSrc: './src-sw.js',
      swDest: 'service-worker.js',
    }),

  new CopyWebpackPlugin({
    patterns: [
      {
        from: 'assets/images', // directory to copy from
        to: 'assets/images' // directory to copy to in the output folder
      }
    ]
  }) 
  ],

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
          },
        },
      },
    ],
  },
};
