import React, { useState, useRef, useEffect } from "react";

const rspCoords = {
  가위: '-13px',
  바위: '-140px',
  보: '-270px',
}

const scores = {
  가위: 1,
  바위: 0,
  보: -1,
}

const computerChoice = (imgCoord) => {
  ready();
  return Object.entries(rspCoords).find(function(v) {
    return v[1] === imgCoord;
  })[0];
}

const RSP = () => {
  const [imgCoord, setImgcoord] = useState(rspCoords.바위);
  const [result, setResult] = useState('');
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState('');
  const interval = useRef();

  const ready = () => {
    setTimeout(changeHand, 1000);
    setTimeout(changeHand, 2000);
    setTimeout(changeHand, 3000);
  }

  useEffect(() => { // componentDidMount,  componentDidUpdate 역할

    interval.current = setInterval(randomHand, 1000);
    return () => {
      clearInterval(interval.current);
    }
  }, [imgCoord]);

  const randomHand = () => {
    setMessage('디비~');
    setMessage('디비~');
    setTimeout(() => {
        setMessage('딥!');
        setImgcoord(rspCoords[Object.keys(rspCoords)[Math.floor(Math.random()*3)]]);
    }, 1000);
  }

  const changeHand = () => {
    if(imgCoord === rspCoords.바위) {
      setMessage('우주선에서');
      setImgcoord(rspCoords.가위);
    } else if(imgCoord === rspCoords.가위) {
      setMessage('제로초 형이 내려와');
      setImgcoord(rspCoords.보);
    } else if(imgCoord === rspCoords.보) {
      setMessage('하는 말!');
      setImgcoord(rspCoords.바위);
    }
  }


  const onClickBtn = (choice) => () => {
    const myScore = scores[choice];
    const cpuScore = scores[computerChoice(imgCoord)];
    const diff = myScore - cpuScore;

    if(diff === 0) { // 비긴 경우
      setResult('맞췄습니다!');
      setScore((prevScore) => prevScore + 100);
      setTimeout(() => {
        interval.current = setInterval(randomHand, 1000);
      }, 1000);
    } else if ([-1, 2, 1, -2].includes(diff)) {
      setResult('틀렸습니다!');
      clearInterval(interval.current);
    }
  }

  return (
    <>
      <div>{message}</div>
      <div id="computer" style={{ background: `url(./dibidibidip.jpg) ${imgCoord} 0 no-repeat`}} ></div>
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