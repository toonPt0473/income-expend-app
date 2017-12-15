import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import pagenotfound from '../404.png'

export class NotFound extends Component {
  componentDidMount(){
    setTimeout(() => this.props.history.push('/dashboard') , 3000);
    
  }
  render() {
    return (
      <div>
          <img src={pagenotfound} alt="pagenotfound" width="100%"/>
      </div>
    )
  }
}

export default withRouter(NotFound)
