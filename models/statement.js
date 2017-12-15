const mongoose = require('mongoose');

const statementSchema = mongoose.Schema({
    date: {type: Date , default: new Date()},
    list: String,
    amount: String,
    income: Boolean,
    _user: { type : mongoose.Schema.Types.ObjectId , ref : 'User'}
});

module.exports = mongoose.model('Statement' , statementSchema)
