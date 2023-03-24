// 분할한 파일에서 필요한 라이브러리를 가져오는 부분
// npm에서 react를 불러오는 코드
const React = require('react');
const { useState, useRef } = React;
const WordRelay = () => {
  const [ word, setWord ] = useState('제로초');
  const [ value, setValue ] = useState('');
  const [ result, setResult ] = useState('');
  const inputRef = useRef(null);

  const onSubmitForm = (e) => {
    e.preventDefault();
    if(word[word.length - 1] === value[0]) {
      setResult("딩동댕");
      setWord(value);
      setValue('');
      inputRef.current.focus();
    } else {
      setResult("땡!");
      setValue('');
      inputRef.current.focus();
    }
  };

  const onChangeInput = (e) => {
      setValue(e.currentTarget.value);
      // 정확하게 하고 싶은 경우, target 대신 currentTarget을 사용하는 게 낫다.
  };
    return (
      <>
      <div>{word}</div>
      <form onSubmit={onSubmitForm}>
        <label htmlFor="wordInput">글자를 입력하세요.</label>
        <input id="wordInput" className="wordInput" ref={inputRef} value={value} onChange={onChangeInput} />
        <button>입력!</button>
        <div>{result}</div>
      </form>
    </>
    );
};

// 분할한 파일에서 쓰는 컴포넌트를 바깥에서 쓰도록 만들기 위한 속성
// node의 모듈 시스템
module.exports = WordRelay;