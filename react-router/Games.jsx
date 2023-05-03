import React from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import GameMatcher from "./GameMatcher";

const Games = () => {
  return (
    <BrowserRouter>
      <Link to="/game/number-baseball">숫자 야구</Link>
      &nbsp;
      <Link to="/game/rock-scissors-paper">가위바위보</Link>
      &nbsp;
      <Link to="/game/response-check">반응 속도 체크</Link>
      &nbsp;
      <Link to="/game/index">게임 매쳐</Link>

      <div>
        <Routes>
          <Route path="/" element={<GameMatcher />}></Route>
          <Route path="/game/:name" element={<GameMatcher />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default Games;