// const React = require('react');
// const { Component } = React;

import React, { useRef, useState, useMemo, useCallback } from 'react';
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

const NumberBaseBall = () =>{
  const [result, setResult] = useState('');
  const [value, setValue] = useState('');
  const [answer, setAnswer] = useState(getNumbers);
  const [tries, setTries] = useState([]);
  const inputEl = useRef(null);

  const onSubmitForm = (e) => {
    e.preventDefault();
    if(value === answer.join('')) {
      setResult('홈런!');
      setTries((prevTries) => {
        return [...tries, { try : value, result: '홈런!'}];
      });

      alert('게임을 다시 시작합니다!');

      setValue('');
      setAnswer(getNumbers());
      setTries([]);
      inputEl.current.focus();

    } else {
      const answerArray = value.split('').map((v) => parseInt(v));
      let strike = 0;
      let ball = 0;

      if(tries.length >= 9) { // 10번 이상 틀렸을 때
        setResult(`10번 넘게 틀려서 실패! 답은 ${answer.join(',')}였습니다!`)

        alert('게임을 다시 시작합니다!');

        setValue('');
        setAnswer(getNumbers());
        setTries([]);
        inputEl.current.focus();

      } else { // 10번 이내에 틀렸을 때
        for(let i = 0; i < 4; i += 1) {
          if(answerArray[i] === answer[i]) {
            strike += 1;
          } else if(answer.includes(answerArray[i])) {
            ball += 1;
          }
        }
        setValue('');
        setTries((prevTries) => {
          return [...tries, { try: value, result: `${strike} 스트라이크, ${ball} 볼입니다.`}];
        });
        inputEl.current.focus();
      }
    }
    console.log(value);
  }

  const onChangeInput = (e) => {
    setValue(e.target.value);
  }

  return (
    <>
      <h1>{result}</h1>
      <form onSubmit={onSubmitForm}>
        <input
          ref={inputEl}
          maxLength={4}
          value={value}
          onChange={onChangeInput}
        />
        <button>입력!</button>
      </form>
      <div>시도 : {tries.length}</div>
      <ul>
        {/*{(() => {*/}
        {/*  const array = [];*/}
        {/*  for (let i = 0; i < tries.length; i++)*/}
        {/*  {*/}
        {/*    array.push(<Try key={`${i + 1}차 시도 :`} tryInfo={v} />);*/}
        {/*  }*/}
        {/*  return array;*/}
        {/*})()}*/}
        {tries.map( (v, i) => {
              <Try key={`${i + 1}차 시도 :`} tryInfo={v} />
          })}
      </ul>
    </>
  );
}

// module.exports = NumberBaseBall;
export default NumberBaseBall; // import NumberBaseBall;