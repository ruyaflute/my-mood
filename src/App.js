import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '' 
};
this.handleChange = this.handleChange.bind(this);
this.handleSubmit = this.handleSubmit.bind(this);
}

handleChange(event) {
  this.setState({value: event.target.value});
}

handleSubmit(event) {
  alert('An essay was submitted: ' + this.state.value);
  event.preventDefault();
}


render() {

  return (
    <div className="App">
      {/*<header className="App-header"> </header>
        <img src={logo} className="App-logo" alt="logo" /> */}
      <h2>Welcome to My Mood</h2>

      <p className="Subheader">
        Show me how you feel, I will show you the weather.
        </p>

      <form onSubmit={this.handleSubmit}
      className="Form" id="Moodentry">
        <textarea
          id="textArea"
          cols="40"
          rows="5"
          placeholder="How am I feeling right now...">
            value={this.state.value} onChange={this.handleChange}
        </textarea>

        <input type="submit" value="Submit" />
        {/*
        <button 
        type="button" 
        value="save"
        className="Save-button"  
        onClick = { this.saveChange } 
        > Save</button>*/}
        </form> 

      <div id="clouds">
        <div class="cloud x1"></div>
        <div class="cloud x2"></div>
        <div class="cloud x3"></div>
        <div class="cloud x4"></div>
        <div class="cloud x5"></div>
      </div>
    </div>
  );
}
}

export default App;
