import React from 'react'
import Image from '../image'

export default class App extends React.Component {
  render() {
    return (
      <div onClick={this._handleClick}>
        <Image />
      </div>
    )
  }

  _handleClick() {
    console.log('click')
  }
}