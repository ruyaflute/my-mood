import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  return (
    <div className="App">
      {/*<header className="App-header"> </header>
        <img src={logo} className="App-logo" alt="logo" /> */}
      <h2>Welcome to My Mood</h2>

      <p className="Subheader">
        Show me how you feel, I will show you the weather.
        </p>

      <form className="Form">
        <lable>
          My Mood:
          <input
          className="Loginput"
            type="text"
            id="log"
            placeholder="How am I feeling right now..."
          />
        </lable>
        <a
          className="App-link"
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          Submit
        </a>
      </form>


    </div>
  );
}

export default App;
