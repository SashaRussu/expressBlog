import React from 'react'
import ReactDOM from 'react-dom'

const ready = () => {
  ReactDOM.render(
    <h1>Hello, world!</h1>,
    document.getElementById('root')
  )
}

document.addEventListener('DOMContentLoaded', ready)