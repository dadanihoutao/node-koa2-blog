import React from 'react'
import { render } from 'react-dom'
// import { HashRouter } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './App';
import { hot } from 'react-hot-loader'

/**
 * react-router-dom 教程 https://www.jianshu.com/p/5e8297858ea8
 * 
 */


// 热更新
hot(module)(App)

render((
  // <HashRouter>
  //   <App />
  // </HashRouter>
  <BrowserRouter>
      <App/>
  </BrowserRouter>
), document.getElementById('app'));
