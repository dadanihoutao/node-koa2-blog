import React, { Component } from 'react'
import { Link } from 'react-router-dom'

// The Header creates links that can be used to navigate
// between routes.

export default class Article extends Component {
  render() {
    return (
      <div>
        <ul>
          <li>文章列表</li>
        </ul>
      </div>
    )
  }
}