import React from 'react';
import { BrowserRouter, HashRouter, Route, Routes, Link } from 'react-router-dom';
import NumberBaseBallClass from '../3. 숫자 야구/NumberBaseBallClass';
import ResponseCheckClass from '../4. 반응속도체크/ResponseCheckClass';
import RSPClass from '../5. 가위바위보/RSPClass';

const Games = () => {
  return (
    <BrowserRouter>
      <Link to="/number-baseball">숫자 야구</Link>
      &nbsp;
      <Link to="/rock-scissors-paper">가위바위보</Link>
      &nbsp;
      <Link to="/response-check">반응 속도 체크</Link>
      <div>
        <Routes>
          <Route path="/number-baseball" element={<NumberBaseBallClass />}></Route>
          <Route path="/response-check" element={<ResponseCheckClass />}></Route>
          <Route path="/rock-scissors-paper" element={<RSPClass />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default Games;