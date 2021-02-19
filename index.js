const express = require('express')

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/my_database', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const app = new express()
const ejs = require('ejs')
app.set('view engine','ejs')
app.use(express.static('public'))

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

const fileUpload = require('express-fileupload')
app.use(fileUpload())

const validateMiddleware = require("./middleware/validationMiddleware");

const newPostController = require('./controllers/newPost')
const homeController = require('./controllers/home')
const storePostController = require('./controllers/storePost')
const getPostController = require('./controllers/getPost')

app.listen(4000, ()=>{
    console.log('App listening on port 4000')
})

app.get('/',homeController)
app.get('/post/:id',getPostController)
app.post('/posts/store', validateMiddleware, storePostController)
app.get('/posts/new',newPostController)
