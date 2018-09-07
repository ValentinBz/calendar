import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import DateComponent from './date';
import Formulaire from './formulaire';
import ButtonsPN from './button'
import { Col } from 'reactstrap';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Col xs='10' style={{margin: '25px auto', padding: 0}}>
          <ButtonsPN />
        </Col>
        <Col xs='10' style={{margin: '25px auto', padding: 0}}>
          <Formulaire />
        </Col>
        <Col xs='10' style={{margin: '25px auto', padding: 0}}>
          <DateComponent />
        </Col>
      </div>
    );
  }
}

export default App;
