const express = require('express');
const mongoose = require('mongoose');
require('dotenv/config');
const  cors = require('cors');
const path = require('path');


const app = express();

// Middleware
app.use(express.urlencoded({extended: true})); 
app.use(express.json());

app.use(cors());

app.use(express.static('/dist/frontend'));



// Import Routes
const booksRoute = require('./routes/books');
const usersRoute = require('./routes/users');

// app.use('/books',express.raw({ type: '*/*' }),booksRoute);
// app.use('/users',express.raw({ type: '*/*' }),usersRoute);

app.use('/books',booksRoute);
app.use('/users',usersRoute);

const PORT = process.env.PORT || 8080;


// Connect to DB
mongoose.connect(process.env.dbUrl, { useNewUrlParser: true }, () => { 
    console.log("Connected to DB")
});

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname + '/dist/frontend/index.html'))
   });
   

app.listen(PORT)