const express = require('express');
const connect = require('./schemas');
connect();
const app = express();
const port = 3000;

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

const postsRouter = require("./routers/posts")
app.use("/api",[postsRouter])

app.use(express.urlencoded({extended: false}))
app.use(express.json())


app.get('/board', (req, res) => {
    res.render('board')
})
  
app.get('/post', (req, res) => {
    res.render('post')
})

app.get('/view', (req, res) => {
    res.render('view')
})

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
})