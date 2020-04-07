import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      message: 'Click the button to load data!'
    }
  }

  fetchData = () => {
    fetch('/v1/weather')
    .then(response => response.json())
    .then((response) => {
      console.log(response.message)
      this.setState({
        message: response.message
      });
    })
  }

  render() {
    return (
      <div className="App">
        <h1>{ this.state.message }</h1>
        <button onClick={this.fetchData} >
          Fetch Data
        </button>
      </div>
    );
  }
}

export default App;
