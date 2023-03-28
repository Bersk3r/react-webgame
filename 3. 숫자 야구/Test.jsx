import React, { Component } from "react";

class Test extends Component {
  state = {
    counter: 0,
  };

  shouldComponentUpdate(nextProps, nextState, nextContext) {
      if(this.state.counter !== nextState.counter) {
        // 현재 state 값이 변경되지 않으면, 바뀌는 값이 다르면 렌더링을 한다.
        return true;
      }
      return false;
  }

  onClick = () => {
    this.setState({});
  }

  render() {
    console.log('렌더링', this.state);
    return (
        <div>
          <button onClick={this.onClick}>클릭</button>
        </div>
    )
  }
}

export default Test;