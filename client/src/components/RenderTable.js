import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const uuidv4 = require('uuid/v4');


const filter = (items , year , month , day) => {
    if(year !== "Unspecified"){
        items = items.filter(item => item.date.year === year);
    }
    if(month !== "Unspecified"){
        items = items.filter(item => item.date.month === month);
    }
    if(day !== "Unspecified"){
        items = items.filter(item => item.date.day === day)
    }
    return items
}


const renderBody = (filterStatement) => {
    if(filterStatement.length === 0) {
        return  <tr>
                    <th colSpan="5" style={{textAlign: "center"}}><strong>Not have any List on this Date</strong></th>
                </tr>
    }
    return filterStatement.map(statement => {
        return (
            <tr key={uuidv4()}>
                <th>{statement.date.dateFormat}</th>
                <th>{statement.list}</th>
                <th style={{color: "rgb(0, 165, 0)"}}>{statement.income === true ? Number(statement.amount) : ""}</th>
                <th style={{color: "rgb(235, 110, 110)"}}>{statement.income === false ? Number(statement.amount) : ""}</th>
                <th style={{textAlign: "right"}}>
                    <Link to={`/dashboard/${statement._id}`}> 
                        <button className="button" style={{marginRight: 15}}>Edit</button>
                    </Link>
                    <a className="button is-danger" href={`/api/delete/statement/${statement._id}`}>Delete</a>
                </th>
            </tr>
        )
    })  
}

const renderSumRow = filterStatement => {
    let income = 0 , expend = 0 ;
    filterStatement.forEach(statement => statement.income ? income += Number(statement.amount) : expend += Number(statement.amount))
    return (
        <tr key={uuidv4()}>
            <th></th>
            <th style={{color: `${income >= expend ? "green" : "red"}`}}>Total</th>
            <th style={{color: `${income >= expend ? "green" : "red"}`}}>{income}</th>
            <th style={{color: `${income >= expend ? "green" : "red"}`}}>{expend}</th>
            <th></th>
        </tr>
    )
}

const RenderTable = (props) => {
    const { userStatements , year , month , day } = props;
    
    if(!userStatements) {
      return <div className="containerLoader"><div className="loader"></div></div>
    }

    if(userStatements){
        const filterStatement = filter(userStatements , year , month , day)
        return (
            <div>
                <table className="table is-fullwidth is-hoverable is-striped">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>List</th>
                            <th>Income</th>
                            <th>Expend</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderBody(filterStatement)}
                        {filterStatement.length > 0 ? renderSumRow(filterStatement) : null}
                    </tbody>
                </table>
                <div className="block" style={{textAlign: "center"}}>
                    <button className="button is-primary" onClick={props.activeModal}> ADD STATEMENT THIS DAY</button>
                </div>
            </div>
        )    
    }
    return <div></div>  
  }

export default connect(state => state)(RenderTable)



