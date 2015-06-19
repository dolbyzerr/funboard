import React from 'react'

export default class App extends React.Component {
  render() {
    return (
      <div onClick={this._handleClick}>Hello world</div>
    )
  }

  _handleClick() {
    console.log('click')
  }
}

if (typeof window !== 'undefined') {
  React.render(<App />, window.document.getElementById('app'))
}