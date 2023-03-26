// const React = require('react');
// const { Component } = React;

import React, { Component } from 'react';


function getNumbers() { // 숫자 4개를 중복 없이 뽑는 함수

}
class NumberBaseBall extends Component {
    state = {
      result: '',
      value: '',
      answer: getNumbers(),
      tries: [],
    };

    onSubmitForm = () => {

    }

    onChangeInput = () => {

    }
    render() {
      return (
        <>
          <h1>{this.state.result}</h1>
          <form onSubmit={this.onSubmitForm}>
            <input maxLength={4} value={this.state.value} onchange={this.onChangeInput} />
          </form>
          <div>시도 : {this.state.tries.length}</div>
          <ul>
            {['like','like','like','like','like'].map( () => {
                return (
                  <li>like</li>
                );
              }
            )}
          </ul>
        </>
      );
    }
}

// module.exports = NumberBaseBall;
export default NumberBaseBall; // import NumberBaseBall;