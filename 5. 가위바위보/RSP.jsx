import React, { useState, useRef, useEffect } from "react";

const rspCoords = {
  바위: '-13px',
  가위: '-157px',
  보: '-325px',
}

const scores = {
  가위: 1,
  바위: 0,
  보: -1,
}

const computerChoice = (imgCoord) => {
  return Object.entries(rspCoords).find(function(v) {
    return v[1] === imgCoord;
  })[0];
}

const RSP = () => {
  const [imgCoord, setImgcoord] = useState(rspCoords.바위);
  const [result, setResult] = useState('');
  const [score, setScore] = useState(0);
  const interval = useRef();

    useEffect(() => { // componentDidMount,  componentDidUpdate 역할
      interval.current = setInterval(changeHand, 100);
      return () => {
        clearInterval(interval.current);
      }
    }, [imgCoord]);
  const changeHand = () => {
    if(imgCoord === rspCoords.바위) {
      setImgcoord(rspCoords.가위);
    } else if(imgCoord === rspCoords.가위) {
      setImgcoord(rspCoords.보);
    } else if(imgCoord === rspCoords.보) {
      setImgcoord(rspCoords.바위);
    }
  }

  const onClickBtn = (choice) => () => {
    clearInterval(interval.current);
    const myScore = scores[choice];
    const cpuScore = scores[computerChoice(imgCoord)];
    const diff = myScore - cpuScore;

    if(diff === 0) { // 비긴 경우
      setResult('비겼습니다!');
    } else if ([-1, 2].includes(diff)) {
      setResult('이겼습니다!');
      setScore((prevScore) => prevScore + 1);
    } else if  ([1, -2].includes(diff)) {
      setResult('졌습니다!');
      setScore((prevScore) => prevScore - 1);
    }
    setTimeout(() => {
      interval.current = setInterval(changeHand, 100);
    }, 1000);
  }

  return (
    <>
      <div id="computer" style={{ background: `url(./rsp.png) ${imgCoord} 0 no-repeat`}} ></div>
      <div>
        <button id="rock" className="btn" onClick={onClickBtn('바위')}>바위</button>
        <button id="scissor" className="btn" onClick={onClickBtn('가위')}>가위</button>
        <button id="paper" className="btn" onClick={onClickBtn('보')}>보</button>
      </div>
      <div>{result}</div>
      <div>현재 {score}점</div>
    </>
  )
}

RSP.displayName = 'RSP';
export default RSP;