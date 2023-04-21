import React, {useState, useReducer, useCallback} from 'react';
import Table from "./Table";

const initialState = {
  winner: '',
  turn: 'O',
  tableData:[['','',''],['','',''],['','','']],
};

const SET_WINNER = 'SET_WINNER';
const reducer = (state, action) => {
  switch(action.type) {
    case SET_WINNER:
      // state.winner = action.winner처럼 직접 변경하면 안 된다.
      return {
        ...state, // 스프레드 문법으로 기존 state가 얕은 복사가 된다. (불변성)
        winner: action.winner,
      };
  }
};
const TicTacToe = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  // const [winner, setWinner] = useState('');
  // const [turn, setTurn] =  useState('O');
  // const [tableData, setTableData] = useState([['','',''],['','',''],['','','']]);
  const onClickTable = useCallback(() => {
      dispatch({ type: SET_WINNER, winner: 'O' });
  },[]);
  return (
    <>
      <Table onClick={onClickTable} tableData={state.tableData}></Table>
      {state.winner && <div>{state.winner}님의 승리</div>}
    </>
  );
};

export default TicTacToe;