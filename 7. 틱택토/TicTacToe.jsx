import React, {useState, useReducer} from 'react';
import Table from "./Table";

const initialState = {
  winner: '',
  turn: 'O',
  tableData:[['','',''],['','',''],['','','']],
};

const reducer = (state, action) => {
  // state를 변경할 내용을 작성
};
const TicTacToe = () => {
  const [state,dispatch] = useReducer(reducer, initialState);
  // const [winner, setWinner] = useState('');
  // const [turn, setTurn] =  useState('O');
  // const [tableData, setTableData] = useState([['','',''],['','',''],['','','']]);

  return (
    <>
      <Table></Table>
      {winner && <div>{winner}님의 승리</div>}
    </>
  );
};

export default TicTacToe;