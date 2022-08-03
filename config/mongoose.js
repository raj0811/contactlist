//require library
const mongoose = require('mongoose');

//connect to db
mongoose.connect('mongodb://localhost/contactlistdb_2');

//accuire the connectiontion
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'error i connecting to db'));

db.once('open', function() {
    console.log("successfully connected");
});