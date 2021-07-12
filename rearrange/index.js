const express = require('express');
const connect = require('./schemas');
connect();
const app = express();
const mongoose = require('mongoose');
const port = 3000;
var bodyParser = require('body-parser'); 
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs'); 

const postRouter = require("./routers/post")
const boardRouter = require("./routers/board")
app.use('/post',[postRouter])
app.use('/board',[boardRouter])


app.get('/post', (req, res) => {
    res.render('post')
})

// app.get('/view', (req, res) => {
//     res.render('view')
// })


app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
})