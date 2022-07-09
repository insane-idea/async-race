const process = require('process');
const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const filename = (ext) => (isDev ? `[name][contenthash].${ext}` : `[name].[fullhash].${ext}`);

const baseConfig = {
  entry: path.resolve(__dirname, './application/client'),
  mode: 'development',
  stats: {
    errorDetails: true,
  },
  resolve: {
    extensions: ['.js', '.json', '.ts', '.tsx', '.png', '.css', '.scss'],
    alias: {
      '@': path.resolve(__dirname, './application/client'),
      '@assets': path.resolve(__dirname, './application/client/assets'),
      '@components': path.resolve(__dirname, './application/client/components'),
      '@styles': path.resolve(__dirname, './application/client/styles'),
    },
  },
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, './dist'),
    clean: true,
    assetModuleFilename: 'assets/[name][ext][query]',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './application/client/index.html'),
      filename: 'index.html',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, './application/client/assets'),
          to: path.resolve(__dirname, 'dist/assets'),
          noErrorOnMissing: true,
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: filename('css'),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.html$/i,
        exclude: ['/node_modules/'],
        use: {
          loader: 'html-loader',
        },
      },
      {
        test: /\.css$/i,
        exclude: ['/node_modules/'],
        use: [isDev ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [isDev ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.jsx?$/i,
        use: 'babel-loader',
        exclude: ['/node_modules/'],
      },
      {
        test: /\.tsx?$/i,
        loader: 'ts-loader',
        exclude: ['/node_modules/'],
      },
      {
        test: /.(png|gif|jpg|jpeg|ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/i,
        type: 'asset',
      },
    ],
  },
};

module.exports = ({ mode }) => {
  const isProductionMode = mode === 'prod';
  const envConfig = isProductionMode ? require('./webpack.prod.config') : require('./webpack.dev.config');

  return merge(baseConfig, envConfig);
};
