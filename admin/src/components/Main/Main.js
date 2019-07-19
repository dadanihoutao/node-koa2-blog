import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from '@/components/Home/Home.js'
import About from '@/components/About/About.js'
import Article from '@/components/Article/Article.js'

// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"

export default class Main extends Component {
  render(){
    return (
      <main>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/home' component={Home}/>
          <Route path='/about' component={About}/>
          <Route path='/article' component={Article}/>
        </Switch>
      </main>
    )
  }
}