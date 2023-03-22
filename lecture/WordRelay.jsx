// 분할한 파일에서 필요한 라이브러리를 가져오는 부분
// npm에서 react를 불러오는 코드
const React = require('react');
const { Component } = React;
class WordRelay extends Component {
  state = {
    text: 'Hello, Webpack!',
  };
  render() {
    return <h1>{this.state.text}</h1>;
  }
}

// 분할한 파일에서 쓰는 컴포넌트를 바깥에서 쓰도록 만들기 위한 속성
// node의 모듈 시스템
module.exports = WordRelay;