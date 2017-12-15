import { connect } from 'react-redux';
import React, { Component } from 'react';

import * as actions from '../actions/actions'

const uuidv4 = require('uuid/v4');

export class Dashboard extends Component {
  constructor(props){
    super(props);
    this.renderStatements = this.renderStatements.bind(this)
  }

  async componentDidMount() {
    await this.props.devLogin()
    await this.props.fetchStatement()
  }

  renderStatements() {
    const { userStatements } = this.props
    if(!userStatements) {
      return <div>load component</div>
    }
    if(userStatements.length === 0){
      return <div>เพิ่มรายการ</div>
    }
    if(userStatements.length > 0){
      return userStatements.map((statement , index) => {
        console.log(statement)
        return (
          <div className="jumbotron" key={uuidv4()}>
            <p>รายการ: {statement.list}</p>
            <p><a className="btn btn-primary btn-lg" href="/dashboard" role="button">Learn more</a></p>
          </div>
        )
      })     
    }
    return <div></div>  
  }

  render() {
    console.log(this.props)
    return (
      <div>
        this is Dash board
        {this.renderStatements()}
        
        <div className="modal is-active">
          <div className="modal-background"></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Modal title</p>
              <button className="delete" aria-label="close"></button>
            </header>
            <section className="modal-card-body">
              <div className="field">
                <label className="label">Label</label>
                <div className="control">
                  <input className="input" type="text" placeholder="Text input" />
                </div>
                <p className="help">This is a help text</p>
              </div>
            </section>
            <footer className="modal-card-foot">
              <button className="button is-success">Save changes</button>
              <button className="button">Cancel</button>
            </footer>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(state => state , actions)(Dashboard)
