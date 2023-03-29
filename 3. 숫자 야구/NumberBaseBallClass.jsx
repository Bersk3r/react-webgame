// const React = require('react');
// const { Component } = React;


import React, { Component, createRef } from 'react';
import Try from './Try';

function getNumbers() { // 숫자 4개를 중복 없이 뽑는 함수
  const candidate = [1,2,3,4,5,6,7,8,9];
  const array = [];
  for(let i = 0; i < 4; i +=1) {
    const chosen = candidate.splice(Math.floor(Math.random() * candidate.length),1)[0];
    array.push(chosen);
  }
  return array;
}

class NumberBaseBall extends Component {
  state = {
    result: '',
    value: '',
    answer: getNumbers(),
    tries: [], //
  };

  onSubmitForm = (e) => {
    const {value, tries, answer } = this.state;
    e.preventDefault();
    if(value === answer.join('')) {
        this.setState( (prevState) => {
          return {
            result: '홈런!',
            tries: [...prevState.tries, { try : value, result: '홈런!'}],
          }
        });

        alert('게임을 다시 시작합니다!');
        this.setState({
          value:'',
          answer: getNumbers(),
          tries: [],
        });
        this.inputRef.current.focus();
    } else {
      const answerArray = value.split('').map((v) => parseInt(v));
      let strike = 0;
      let ball = 0;

      if(tries.length >= 9) { // 10번 이상 틀렸을 때
        this.setState({
          result: `10번 넘게 틀려서 실패! 답은 ${answer.join(',')}였습니다!`
        })
        alert('게임을 다시 시작합니다!');
        this.setState({
          value:'',
          answer: getNumbers(),
          tries: [],
        });
        this.inputRef.current.focus();
      } else { // 10번 이내에 틀렸을 때
        for(let i = 0; i < 4; i += 1) {
          if(answerArray[i] === answer[i]) {
            strike += 1;
          } else if(answer.includes(answerArray[i])) {
            ball += 1;
          }
        }
        this.setState((prevState) => {
          return {
            tries: [...prevState.tries, { try: value, result: `${strike} 스트라이크, ${ball} 볼입니다.`}],
            value: '',
          }
          this.inputRef.current.focus();
        });
      }
    }
    console.log(value);
  }

  onChangeInput = (e) => {
    const { answer } = this.state;
    console.log(answer);
    this.setState({
      value: e.target.value,
    });
  }

  inputRef = createRef(); // this.inputRef를 선언

  render() {
    return (
      <>
        <h1>{this.state.result}</h1>
        <form onSubmit={this.onSubmitForm}>
          <input ref={this.inputRef} maxLength={4} value={this.state.value} onChange={this.onChangeInput} />
        </form>
        <div>시도 : {this.state.tries.length}</div>
        <ul>
          {this.state.tries.map( (v, i) => {
              return (
                <Try key={`${i + 1}차 시도 :`} tryInfo={v} />
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