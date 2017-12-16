import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import { withRouter, Link } from 'react-router-dom'

export class EditList extends Component {
    constructor(props){
        super(props);
        this.renderEditForm = this.renderEditForm.bind(this)
        this.filterList = this.filterList.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.state = {
            onSendForm: false,
            validateList: true,
            validateAmount: true
        }
    }
    componentDidMount(){
        setTimeout(() => {
            if(!this.props.userStatements) return this.props.history.push('/dashboard')
        }, 2000);
    }

    filterList(userStatements){
        const { id } = this.props.match.params;
        const filterStatement = userStatements.filter(statement => statement._id === id)
        return filterStatement
    }

    renderEditForm(){
        if(!this.props.userStatements){
            return <div className="containerLoader"><div className="loader"></div></div>
        }
        const filterStatement = this.filterList(this.props.userStatements)[0];
        return (
                <form onSubmit={this.handleSubmit}>
                    <div className="field">
                        <label className="label">List</label>
                        <p className="control">
                            <input className="input is-medium" type="text" defaultValue={filterStatement.list} ref="list"/>
                            {this.state.onSendForm && !this.state.validateList ? <span className="help is-danger">Please fill field</span> : null}
                        </p>
                    </div>
                    <div className="field">
                        <label className="label">Amount</label>
                        <p className="control">
                            <input className="input is-medium" defaultValue={filterStatement.amount} ref="amount"/>
                            {this.state.onSendForm && !this.state.validateAmount ? <span className="help is-danger">Incorect Amount</span> : null}
                        </p>
                    </div>

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

                    <div className="block" style={{textAlign: "center"}}>
                        <Link to="/dashboard">
                            <button className="button is-medium" style={{marginRight: 30}}>
                                Back to Dashboard
                            </button>
                        </Link>
                        <button type="submit" className="button is-medium is-success">
                            Edit Statement
                        </button>
                    </div>
                </form>
        )
    }

    async handleSubmit(e){    
        e.preventDefault();
        await this.setState({onSendForm: true})
        const list = this.refs.list.value;
        const amount = this.refs.amount.value;
        if(list.length === 0){
            return this.setState({validateList: false})
        }
      
        if(!/^[0-9]+$/.test(amount)){
            return this.setState({validateAmount: false})
        }
        const values = {
            list,
            amount,
            income: this.refs.income.checked,
            id: this.props.match.params.id
        }
        console.log(values)
        await this.props.EditStatement(values)
        await this.props.fetchStatement()
        this.props.history.push('/dashboard')

    }

    render() {
        return (
        <div>
            {this.renderEditForm()}
        </div>
        )
    }
}

export default connect(state => state , actions)(withRouter(EditList))
