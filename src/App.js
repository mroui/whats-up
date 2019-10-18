import React, { Component } from 'react';
import './App.css';
import HomePage from './pages/Home/HomePage';
import RegistrationPage from './pages/Registration/RegistrationPage';
import LoginPage from './pages/Login/LoginPage';
import DiaryPage from './pages/Diary/DiaryPage';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class App extends Component {

  render () {
    return(
    <Router>
      <div className="App">
        <div className="block">
        <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/login"  component={LoginPage} />
            <Route exact path="/register" component={RegistrationPage} />
            <Route exact path="/diary" component={DiaryPage} />
        </Switch>
        </div>
      </div>
    </Router>
    );
  }

}

export default App;