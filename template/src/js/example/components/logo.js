import React, { Component } from 'react'

class Logo extends Component {
  render () {
    return (
      <img className='logo' src={this.props.image} alt='' style={this.props.style} />
    )
  }
}

export default Logo
