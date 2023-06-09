const path = require('path');
const webpack = require('webpack');
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack');

module.exports = {
  name: 'gugudan-setting',
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
            debug:true
          }],
          '@babel/preset-react'
        ],
        // 웹팩에 기본으로 적용되는 내용
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
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.js'
  },
  // 개발 편의를 위해 두는 서버
  devServer: {
    publicPath: '/dist/',
    hot: true,
  },
};