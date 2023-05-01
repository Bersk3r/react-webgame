const path = require('path');
const webpack = require('webpack');
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
  name: 'app',
  mode: 'development', // 실 서비스 : production
  devtool: 'eval', // 실 서비스 : hidden-source-map
  resolve: {
    extensions: ['.js', '.jsx']
  },

  entry: {
    app: './client'
  },
  module: {
    rules: [{
      test:/\.jsx?$/,
      loader: 'babel-loader',
      options: {
        presets: [
          ['@babel/preset-env',{
            targets: {
              // 호환 가능한 브라우저 이름 및 버전 작성
              // 최신이 70이라고 가정 시, 69와 70만 지원하도록 설정 ('last 2 chrome versions')
              // 하기 내용은 한국에서 5%이상 사용되는 브라우저 지원 내용
              browsers: ['> 5% in KR',],
            },
          }],
          '@babel/preset-react'
        ],
        // 웹팩에 기본으로 적용되는 내요
        plugins: [
          '@babel/plugin-proposal-class-properties',
          'react-refresh/babel',
        ],
      }
    }],
  },
  // 플러그인은 확장 프로그램과 유사
  // 추가적으로 무언가 하고 싶을 때,
  plugins: [
    new RefreshWebpackPlugin()
  ],

  cache: true,

  output: {
    path: path.join(__dirname, '/dist/'),
    filename: '[name].js',
    publicPath: '/dist/',
  },
  // 개발 편의를 위해 두는 서버
  devServer: {
    // dist 폴더 내부에 생성
    // dev 서버는 메모리에 생성
    historyApiFallback: true,
    devMiddleware: { publicPath: '/dist/' }, // app.use('/dist', express.static(__dirname, 'dist'))
    static: { directory: path.resolve(__dirname) },
    hot: true,
  },
};