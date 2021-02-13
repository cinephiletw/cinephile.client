import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import Movies from './components/moviePage/Movies';

// 所有component 都以function component 搭配hook 撰寫，然後在App.js 中render
// 路由表還沒定義

class App extends Component {
  componentDidMount() {
  }

  render() {
    return (
      <div className="container">
        <Route path="/" exact component={HomePage} />
        <Route path="/581392" component={Movies} />
      </div>
    );
  }
}

export default App;
