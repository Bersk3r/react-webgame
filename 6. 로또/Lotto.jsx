import React, {useState, useRef} from "react";
import Ball from "./Ball";

function getWinNumbers() {
  console.log('getWinNumbers');
  const candidate = Array(45).fill().map((v,i) => i + 1);
  const shuffle = [];
  while(candidate.length > 0) {
    shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
  }
  const bonusNumber = shuffle[shuffle.length - 1];
  const winNumbers = shuffle.slice(0,6).sort((p,c) => p - c);
  return [...winNumbers, bonusNumber];
}

Lotto = () => {
    [winNumbers,setWinNumbers] = useState(getWinNumbers());
    [winBalls,setWinBalls] = useState([]); // 당첨 숫자들
    [bonus, setBonus] = useState(null);
    [redo,setRedo] = useState(false);
    timeouts = useRef([]);

  const runTimeouts = () => {
    // console.log('runTimeouts');
    for(let i = 0; i < winNumbers.length - 1; i++) {
      timeouts[i] = setTimeout(() => {
        setWinBalls((prevState) => {
          return [...prevState.winBalls, winNumbers[i]];
        });
      }, (i+1) * 1000);
    }
    timeouts[winNumbers.length-1] = setTimeout(() => {
      setBonus(winNumbers[winNumbers.length-1]);
      setRedo(true);
    }, winNumbers.length*1000);
  }

  useEffect(() => {
    runTimeouts();
    return {
      timeouts.forEach((v) => {
        clearTimeout(v);
      });
    }
  },[])

  if(winBalls.length === 0) {
    runTimeouts();
  }

  onClickRedo = () => {
      // console.log('onClickRedo');
      setWinNumbers(getWinNumbers()); // 당첨 숫자들
      setWinBalls([]); //
      setBonus(null); // 보너스 공
      setRedo(false);
      timeouts = [];
    }

  return (
    <>
      <div>당첨 숫자</div>
      <div id="result">
        {winBalls.map((v) => <Ball key={v} number={v} />)}
      </div>
      <div>보너스!</div>
      {bonus && <Ball number={bonus} />}
      {redo  && <button onClick={ onClickRedo }>한번 더!</button>}
    </>
  );
}

export default Lotto;