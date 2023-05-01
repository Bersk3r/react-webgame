import React from 'react';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import NumberBaseBall from '../3. 숫자 야구/NumberBaseBall';
import RSP from '../5. 가위바위보/RSP';
import Lotto from '../6. 로또/Lotto';

const Games = () => {
  const [ state, dispatch ] = useReducer(reducer, initialState);
  const { tableData, halted, timer, result } = state;

  const value = useMemo(() => ({ tableData: tableData, halted: halted, dispatch }), [tableData, halted] );

  return (
    <BrowserRouter>
      <div>
        <Routes path="/number-baseball" component={NumberBaseBall}></Routes>
        <Routes path="/rock-scissors-paper" component={RSP}></Routes>
        <Routes path="/lotto-generator" component={Lotto}></Routes>
      </div>
    </BrowserRouter>
  );
};

export default Games;