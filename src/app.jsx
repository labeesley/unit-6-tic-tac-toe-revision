import React, { Component } from 'react';
import { render } from 'react-dom';

//this is the parent component 
//if we want our child components to appear on the page, we must append them to the parent component
class App extends Component {
  constructor() {
    super();
    this.state = {
      //initial state
      text: '-',
    };
    //bind changeState to this
    //we gotta do this so our child elements have access to this function
    this.changeState = this.changeState.bind(this);
  }

  changeState(e, id) {
    console.log(id);
    //if property of text w/in our state is assigned to 'X': reassign the prop of text to 'O'
    //otherwise if 'O': reassign text to 'X'
    if (this.state.text === 'X') {
      //so since we're using the setState method, we can directly reference the text keyword because we're working within the state object
      this.setState({ text : 'O' });
    }
    else {
      this.setState({ text : 'X' });    
    }
  }

  render() {
    return (
      <div>
        <h1>Tic Tac Toe</h1>
        {/* this is the JSX syntax for embedding one component into another component */}
        {/* W/in the parent component, we are invoking our embedded(child) component passing in this data*/}
        {/* Letter is the key that is passed into the props obj of our component with a value of X */}
        {/* Created a key of changeState and passed into it the function definition of this.changeState so our child elements have access to this function as well */}
        <Row letter={this.state.text} changeState={this.changeState} />
      </div>
    );
  }
}

//built a child Box component
class Box extends Component {
  render() {
    console.log(this.props)
    return (
      <div>
        <button id={this.props.itemID} className="squarebtn" onClick={(e) => this.props.changeState(e, this.props.itemID)}>{this.props.letter}</button>
      </div>
    );
  }

  //want to invoke setInterval after the box has been mounted
  componentDidMount() {
    //note: this.props is the state in this situation
    const interval = setInterval(this.props.changeState, 300);
    clearInterval(interval);
  }
}

class Row extends Component {
  render() {
    //declare a variable called boxes and assigned to an empty arr
    const boxes = [];
    //use a for loop to to push our child boxes into boxes arr
    //for n amount of Box components 
    for (let i = 0; i < 3; i++) {
      boxes.push(<Box itemID={i} key={i} letter={this.props.letter} changeState={this.props.changeState}/>);
    }
    return (
      <div>
        {boxes}
      </div>
    );
  }
}

render(<App />, document.querySelector('#root'));
