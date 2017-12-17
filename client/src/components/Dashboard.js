import { connect } from 'react-redux';
import React, { Component } from 'react';
import RenderTable from './RenderTable';
import * as actions from '../actions/actions';

const uuidv4 = require('uuid/v4');

export class Dashboard extends Component {
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this)
    this.renderDateOption = this.renderDateOption.bind(this)
    this.state = {
      day: new Date().getDate().toString(),
      month: (new Date().getMonth() + 1).toString(),
      year: new Date().getFullYear().toString(),
      modalActive: false,
      onSendForm: false,
      list: "",
      amount: "",
      validateList: true,
      validateAmount: true,
      validateDate: true
    }
  }

  async componentDidMount() {
    //dev login for session data
    if(process.env.NODE_ENV === 'development'){
      await this.props.devLogin(null , null , this.props.history)
    }
    await this.props.fetchStatement()
  }

  async handleSubmit(e){
    e.preventDefault();
    await this.setState({onSendForm: true , validateAmount: true , validateDate: true , validateList: true})
    
    if(this.state.year === "Unspecified" || this.state.month === "Unspecified" || this.state.day === "Unspecified"){
      return this.setState({validateDate: false})
    }

    if(this.state.list.length === 0){
      return this.setState({validateList: false})
    }

    if(!/^[0-9]+$/.test(this.state.amount)){
      return this.setState({validateAmount: false})
    }
    const date = {
      day: this.state.day,
      month: this.state.month,
      year: this.state.year,
      dateFormat: `${this.state.year}-${this.state.month}-${this.state.day}`,
      time: new Date(`${this.state.year}-${this.state.month}-${this.state.day}`).getTime()
    }
    const values = {
      list: this.state.list,
      amount: this.state.amount,
      income: this.refs.income.checked,
      date
    }
    await this.props.sendFormStatement(values)
    this.props.fetchStatement()
    this.setState({modalActive: false , validateAmount: true , validateDate: true , validateList: true , list: "" , amount: ""})
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
    if(value === "year"){
      return new Array(100).fill(null).map((day , index) => {
        return <option key={uuidv4()}>{index + 2000}</option>
      })
    }
    return <div><option key={uuidv4()}>render error</option></div>
  }

  render() {
    return (
      <div>
          <div className="block" style={{textAlign: "right"}}>
            <a className=" button is-medium is-danger" href='/logout'>Log Out</a>
          </div>

          <div className="field is-grouped">
            <p className="control">
              <label className="label">Day</label>
              <span className="select is-info">
                <select name="day" onChange={(e) => this.setState({day:e.target.value})} value={this.state.day}>
                  <option key={uuidv4()}>Unspecified</option>
                  {this.renderDateOption("day")}
                </select>
              </span>
            </p>

            <p className="control">
              <label className="label">Month</label>
              <span className="select is-info">
                <select name="month" onChange={(e) => this.setState({month:e.target.value})} value={this.state.month}> 
                  <option key={uuidv4()}>Unspecified</option>
                  {this.renderDateOption("month")}
                </select>
              </span>
            </p>

            <p className="control">
              <label className="label">Year</label>
              <span className="select is-info">
                <select name="year" onChange={(e) => this.setState({year:e.target.value})} value={this.state.year}>
                  <option key={uuidv4()}>Unspecified</option>
                  {this.renderDateOption("year")}
                </select>
              </span>
            </p>
          </div>

        <RenderTable day={this.state.day} month={this.state.month} year={this.state.year} activeModal={() => this.setState({modalActive: true})}/>

        <div className={`modal ${this.state.modalActive ? "is-active" : ""}`}>
          <div className="modal-background"></div>
            <div className="modal-card">
            
              <header className="modal-card-head">
                <p className="modal-card-title">
                  Add Statement on {this.state.day}/{this.state.month}/{this.state.year}<br/>
                  {this.state.onSendForm && !this.state.validateDate ? <span className="help is-danger">Can't Add Statement on Unspecified</span> : null}
                </p>
                <button 
                  className="delete" 
                  aria-label="close" 
                  onClick={() => this.setState({modalActive: false , validateAmount: true , validateDate: true , validateList: true , list: "" , amount: ""})}
                ></button>
              </header>

              <section className="modal-card-body">

                <form onSubmit={this.handleSubmit}>

                  <label className="label">List</label>
                  <div className="control">
                    <input 
                      className="input" 
                      type="text" 
                      name="list" 
                      placeholder="List" 
                      ref="list" 
                      value={this.state.list}
                      onChange={(e) => this.setState({list: e.target.value})}
                    />
                    {this.state.onSendForm && !this.state.validateList ? <span className="help is-danger">Please fill field</span> : null}
                  </div>

                  <label className="label">Amount</label>
                  <div className="control">
                    <input 
                      className="input" 
                      type="text" 
                      name="amount" 
                      placeholder="Only Number" 
                      ref="amount" 
                      value={this.state.amount}
                      onChange={(e) => this.setState({amount: e.target.value})}/>
                    {this.state.onSendForm && !this.state.validateAmount ? <span className="help is-danger">Incorect Amount</span> : null}
                  </div>

                  <br/>

                  <div className="field is-horizontal">
                    <div className="field-body">
                      <div className="field is-narrow">
                        <div className="control">
                          <label className="radio">
                            <input type="radio" name="income" ref="income" defaultChecked/>
                            &nbsp;INCOME&nbsp;
                          </label>
                          <label className="radio">
                            <input type="radio" name="income" />
                            &nbsp;EXPEND&nbsp;
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                </form>

              </section>
              <footer className="modal-card-foot">
                <button className="button is-success" onClick={this.handleSubmit}>Add</button>
                <button 
                  className="button" 
                  onClick={() => this.setState({modalActive: false , validateAmount: true , validateDate: true , validateList: true , list: "" , amount: ""})}
                >Cancel</button>
              </footer>
            </div>
          </div>
      </div>
    )
  }
}

export default connect(state => state , actions)(Dashboard)
