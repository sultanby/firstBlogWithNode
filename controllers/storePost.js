const BlogPost = require('../models/BlogPost.js')
const path = require('path')
const DEFAULT_IMAGE = 'post-sample-image.jpg'

const storePost = (req, res, imageName) => {
    const blogPost = {...req.body, image: '/img/' + imageName, userid: req.session.userId}
    BlogPost.create(blogPost, error => {
        if(error){
            const validationErrors = Object.keys(error.errors).map(key =>
                error.errors[key].message)
            req.flash('validationErrors', validationErrors)
            req.flash('data', req.body)
            return res.redirect('/posts/new')
        }
        res.redirect('/')
    });
}
module.exports = (req, res) => {
    if (req.files !== null){
        let image = req.files.image;
        image.mv(path.resolve(__dirname, '..', 'public/img', image.name), storePost(req, res, image.name))
    }else {
        storePost(req, res, DEFAULT_IMAGE)
    }
}
