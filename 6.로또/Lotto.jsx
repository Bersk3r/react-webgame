import React, {useState, useRef, useEffect, useMemo, useCallback } from "react";
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

const Lotto = () => {
    const lottoNumbers = useMemo(() => getWinNumbers(), [])
    const [winNumbers,setWinNumbers] = useState(lottoNumbers);
    const [winBalls, setWinBalls] = useState([]); // 당첨 숫자들
    const [bonus, setBonus] = useState(null);
    const [redo,setRedo] = useState(false);
    const timeouts = useRef([]);

  // const runTimeouts = () => {
  //   // console.log('runTimeouts');
  //   for(let i = 0; i < winNumbers.length - 1; i++) {
  //     timeouts.current[i] = setTimeout(() => {
  //       setWinBalls((prevState) => {
  //         return [...prevState.winBalls, winNumbers[i]];
  //       });
  //     }, (i+1) * 1000);
  //   }
  //   timeouts.current[winNumbers.length-1] = setTimeout(() => {
  //     setBonus(winNumbers[winNumbers.length-1]);
  //     setRedo(true);
  //   }, winNumbers.length*1000);
  // }

  useEffect(() => {
    console.log('useEffect');
    for(let i = 0; i < winNumbers.length - 1; i++) {
      timeouts.current[i] = setTimeout(() => {
        setWinBalls((prevState) => {
          return [...prevState.winBalls, winNumbers[i]];
        });
      }, (i+1) * 1000);
    }
    timeouts.current[winNumbers.length-1] = setTimeout(() => {
      setBonus(winNumbers[winNumbers.length-1]);
      setRedo(true);
    }, winNumbers.length*1000);
    return () => {
      timeouts.current.forEach((v) => {
        clearTimeout(v);
      });
    }
  },[timeouts.current]);

  useEffect(() => {
    console.log("로또 숫자를 생성합니다.");
  },[winNumbers])

  const onClickRedo = useCallback(() => {
      // console.log('onClickRedo');
      setWinNumbers(getWinNumbers()); // 당첨 숫자들
      setWinBalls([]); //
      setBonus(null); // 보너스 공
      setRedo(false);
      timeouts.current = [];
    },[winNumbers]);

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