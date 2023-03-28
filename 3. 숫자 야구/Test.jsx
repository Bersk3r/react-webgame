import React, { PureComponent } from "react";

class Test extends PureComponent {
  state = {
    counter: 0,
    string:'hello',
    number: 1,
    boolean: true,
    object: {},
    array: [],
  };

  onClick = () => {
    const array = this.state.array;
    this.state.array.push(1);
    this.setState({
      array: array,
    });
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