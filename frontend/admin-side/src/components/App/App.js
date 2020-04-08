import React from 'react';
import './App.css';
import Main from "../Main/Main";
import Sidebar from "../Sidebar/Sidebar";

function App() {
  return (
    <div className="App">
        <div id="wrapper">
      <Main/>
      <Sidebar/>
        </div>
    </div>
  );
}

export default App;
