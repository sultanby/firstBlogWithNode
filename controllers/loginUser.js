const bcrypt = require('bcrypt')
const User = require('../models/User')
module.exports = (req, res) =>{
    const { username, password } = req.body;
    if (!username && !password){
        req.flash('validationErrors', "please provide username and password")
        req.flash('data', req.body)
        res.redirect('/auth/login')
    }
    else if(!username){
        req.flash('validationErrors', "please provide username")
        req.flash('data', req.body)
        res.redirect('/auth/login')
    }
    else if(!password){
        req.flash('validationErrors', "please provide password")
        req.flash('data', req.body)
        res.redirect('/auth/login')
    }
    else{
        User.findOne({username:username}, (error,user) => {
            if (user){
                bcrypt.compare(password, user.password, (error, same) =>{
                    if(same){ // if passwords match
                        req.session.userId = user._id
                        res.redirect('/')
                    }
                    else{
                        req.flash('validationErrors', "wrong password or username")
                        req.flash('data', req.body)
                        res.redirect('/auth/login')
                    }
                })
            }
        })
    }

}
