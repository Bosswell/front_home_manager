import React from 'react';
import { hot } from 'react-hot-loader/root';
import logo from './logo.svg';
import './App.css';
import AuthService from './services/auth.service';


function App() {
  const data = {
    username: 'hello@world.pl',
    password: 'zaq1@WSX'
  };

  AuthService.login(data).then(function (res) {
    console.log(res);
  });
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default hot(App);
