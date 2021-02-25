const express = require('express')

const mongoose = require('mongoose')
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

const expressSession = require('express-session');
app.use(expressSession({
    secret: 'keyboard cat'
}))

const flash = require('connect-flash')
app.use(flash())

global.loggedIn = null;

app.use("*", (req, res, next) => {
    loggedIn = req.session.userId;
    next()
});

const validateMiddleware = require("./middleware/validationMiddleware")
const authMiddleware = require('./middleware/authMiddleware')
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware')

const newPostController = require('./controllers/newPost')
const homeController = require('./controllers/home')
const storePostController = require('./controllers/storePost')
const getPostController = require('./controllers/getPost')
const newUserController = require('./controllers/newUser')
const storeUserController = require('./controllers/storeUser')
const loginController = require('./controllers/login')
const loginUserController = require('./controllers/loginUser')
const logoutController = require('./controllers/logout')

app.listen(4000, ()=>{
    console.log('App listening on port 4000')
})

app.get('/',homeController)
app.get('/post/:id',getPostController)
app.post('/posts/store', authMiddleware, storePostController)
app.get('/posts/new', authMiddleware, newPostController)
app.get('/auth/register', redirectIfAuthenticatedMiddleware, newUserController)
app.post('/users/register', redirectIfAuthenticatedMiddleware, storeUserController)
app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController)
app.post('/users/login', redirectIfAuthenticatedMiddleware, loginUserController)
app.get('/auth/logout', logoutController)
app.use((req, res) => res.render('notfound'));
