import React from 'react'
import { connect } from 'react-redux'

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
                <th>{statement.income === true ? statement.amount : ""}</th>
                <th>{statement.income === false ? statement.amount : ""}</th>
                <th style={{textAlign: "center"}}>
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
            <th>Total</th>
            <th>{income}</th>
            <th>{expend}</th>
            <th></th>
        </tr>
    )
}

const RenderTable = (props) => {
    const { userStatements , year , month , day } = props;
    
    if(!userStatements) {
      return <div>load component</div>
    }

    if(userStatements.length === 0){
      return <div>เพิ่มรายการ</div>
    }

    if(userStatements.length > 0){
        const filterStatement = filter(userStatements , year , month , day)
        return (
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
        )    
    }
    return <div></div>  
  }

export default connect(state => state)(RenderTable)



