const mongoose = require('mongoose');

//this will create the database with what we give it
const PostSchema = mongoose.Schema({
    field1: String,
    field2: String,
    field3: String
});

module.exports = mongoose.model('Posts', PostSchema);
