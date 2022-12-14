const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/codeial-database');

db = mongoose.connection;

db.on('error', console.error.bind(console, "Error in connecting to Codial Database"));

db.once('open', function(){
    console.log("Successfully connected to Codial Database :: MongoDB");
});

module.exports = db;
