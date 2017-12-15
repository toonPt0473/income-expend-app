import { connect } from 'react-redux';
import React, { Component } from 'react';
import RenderTable from './RenderTable'

import * as actions from '../actions/actions'

const uuidv4 = require('uuid/v4');

export class Dashboard extends Component {
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this)
    this.renderDateOption = this.renderDateOption.bind(this)
    this.state = {
      day: new Date().getDate().toString(),
      month: (new Date().getMonth() + 1).toString(),
      year: new Date().getFullYear().toString()
    }
  }

  async componentDidMount() {
    
    //dev login for session data
    if(process.env.NODE_ENV === 'development'){
      await this.props.devLogin()
    }
    await this.props.fetchStatement()
  }

  handleSubmit(e){
    e.preventDefault();
    const values = {
      list: this.refs.list.value,
      amount: this.refs.amount.value,
      income: this.refs.income.checked
    }
    this.props.sendFormStatement(values)
  }

  renderDateOption(value){
    if(value === "day"){
      return new Array(31).fill(null).map((day , index) => {
        return <option key={uuidv4()}>{index + 1}</option>
      })
    }
    if(value === "month"){
      return new Array(12).fill(null).map((day , index) => {
        return <option key={uuidv4()}>{index + 1}</option>
      })
    }
    return new Array(100).fill(null).map((day , index) => {
      return <option key={uuidv4()}>{index + 2000}</option>
    })
  }

  render() {
    return (
      <div>
        <div className="select is-primary">
          <select name="day" onChange={(e) => this.setState({day:e.target.value})} value={this.state.day}>
            <option key={uuidv4()}>ไม่กำหนด</option>
            {this.renderDateOption("day")}
          </select>
        </div>

        <div className="select is-primary">
          <select name="month" onChange={(e) => this.setState({month:e.target.value})} value={this.state.month}> 
            <option key={uuidv4()}>ไม่กำหนด</option>
            {this.renderDateOption("month")}
          </select>
        </div>

        <div className="select is-primary">
          <select name="year" onChange={(e) => this.setState({year:e.target.value})} value={this.state.year}>
            <option key={uuidv4()}>ไม่กำหนด</option>
            {this.renderDateOption("year")}
          </select>
        </div>

        <RenderTable day={this.state.day} month={this.state.month} year={this.state.year}/>
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="list" placeholder="รายการ" ref="list"/>
          <input type="text" name="amount" placeholder="จำนวนเงิน" ref="amount"/>
          <input type="checkbox" name="income" ref="income"/>
          <button>submit</button>
        </form>
      </div>
    )
  }
}

export default connect(state => state , actions)(Dashboard)
