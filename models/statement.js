const mongoose = require('mongoose');

const statementSchema = mongoose.Schema({
    date: {},
    list: String,
    amount: String,
    income: Boolean,
    _user: { type : mongoose.Schema.Types.ObjectId , ref : 'User'}
});

module.exports = mongoose.model('Statement' , statementSchema)
