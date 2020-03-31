import React from 'react';
import Navbar from '../Navbar/Navbar';
import Header from '../Header/Header';
import './App.css';
import {Switch, Route} from 'react-router-dom';

function App() {
  
  return (
    <div className="App">
        <Navbar />
        <Route path='/' exact component={Header} />

        <Switch>
          <Route path='/' exact component={Header} />

          <Route render={() => <h1>Not Found :)</h1>} />
        </Switch>
    </div>
  );
}

export default App;
