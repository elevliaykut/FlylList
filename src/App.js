import React, { Component } from "react";
import Header from './components/Header';
import PlayList from './components/PlayList';
import './components/style.css';

class App extends Component {
  render(){
    return(
      <div>
        <Header />
        <PlayList />
      </div>
    )
  }
}

export default App;