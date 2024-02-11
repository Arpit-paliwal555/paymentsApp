const mongoose = require('mongoose');
mongoose.connect("Database-connection-string")

// schema for users
const schema = new mongoose.Schema({
    userName: String,
    password: String,
    firstName: String,
    lastName: String
});

const accountSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'users',
        required : true
    },
    balance : {
        type : Number,
        default : 0,
        required : true
    },
});
//model the schema
const users = mongoose.model('users',schema);
const accounts = mongoose.model('accounts',accountSchema);

module.exports = {users, accounts};
