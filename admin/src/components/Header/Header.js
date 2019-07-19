import React, { Component } from 'react'
import { Link } from 'react-router-dom'

// The Header creates links that can be used to navigate
// between routes.

export default class Header extends Component {
  render() {
    return (
      <header>
        <nav>
          <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/about'>about</Link></li>
            <li><Link to='/article'>article</Link></li>
          </ul>
        </nav>
      </header>
    )
  }
}