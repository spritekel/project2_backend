//importing express
const express = require('express');
//importing mongoose to talk to db
const mongoose = require('mongoose');
//importing .env package for api
require('dotenv/config');
//running express ontop of app
const app = express();
//importing routes
const postsRoute = require('./routes/posts');
//importing body parser
const bodyParser = require('body-parser');
//importing cors
const cors = require('cors'); 
//middleware
app.use(cors());

app.use(bodyParser.json());
app.use('/posts', postsRoute);

//Routes
//this is what is sent back when a request is sent to it
app.get('/', (req,res) => {
    res.send('We are on home')
});

//connect to db
mongoose.connect(
    process.env.DB_CONNECTION,
    {useUnifiedTopology: true, useNewUrlParser: true}, 
    () => console.log('Connected to db'));

//How to boot up server
app.listen(process.env.PORT || 5000);
