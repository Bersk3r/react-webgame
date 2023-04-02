import React, { Component } from "react";

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

class RSP extends Component {
  state = {
    imgCoord: rspCoords.바위,
    result: '',
    score: 0,
  };

  interval;

  componentDidMount() {
    this.interval = setInterval(this.changeHand, 100);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
  }

  // shouldComponentUpdate(nextProps, nextState, nextContext) {
  //     return true;
  // }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  changeHand = () => {
    const { imgCoord } = this.state;
    if(imgCoord === rspCoords.바위) {
      this.setState({
        imgCoord: rspCoords.가위,
      });
    } else if(imgCoord === rspCoords.가위) {
      this.setState({
        imgCoord: rspCoords.보,
      });
    } else if(imgCoord === rspCoords.보) {
      this.setState({
        imgCoord: rspCoords.바위,
      });
    }
  }

  onClickBtn = (choice) => {
    const { imgCoord } = this.state;
    clearInterval(this.interval);
    const myScore = scores[choice];
    const cpuScore = scores[computerChoice(imgCoord)];
    const diff = myScore - cpuScore;

    if(diff === 0) { // 비긴 경우
      this.setState({
        result: '비겼습니다!',
      })
    } else if ([-1, 2].includes(diff)) {
      this.setState((prevState) => {
        return {
          result: '이겼습니다!',
          score: prevState.score + 1,
        };
      });
    } else if  ([1, -2].includes(diff)) {
      this.setState((prevState) => {
        return {
          result: '이겼습니다!',
          score: prevState.score - 1,
        };
      });
    }
    setTimeout(() => {
      this.interval = setInterval(this.changeHand, 100);
    }, 1000);
  }

  render() {
    const { imgCoord, result, score } = this.state;
    return (
      <>
        <div id="computer" style={{ background: `url(./rsp.png) ${imgCoord} 0 no-repeat`}} ></div>
        <div>
          <button id="rock" className="btn" onClick={() => this.onClickBtn('바위')}>바위</button>
          <button id="scissor" className="btn" onClick={() => this.onClickBtn('가위')}>가위</button>
          <button id="paper" className="btn" onClick={() => this.onClickBtn('보')}>보</button>
        </div>
        <div>{result}</div>
        <div>현재 {score}점</div>
      </>
    )
  }
}

export default RSP;
