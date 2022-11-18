const express = require('express')
const router = express.Router();

const User = require('../models/User.model')

const bcryptjs = require('bcryptjs')

const saltRounds = 10


router.get('/login', (req, res, next) => {
    res.render('auth-views/login')
})

router.post('/login', (req, res, next) => {

    if (!req.body.email|| !req.body.password) {
        res.render('auth-views/login', {message : "Both fields are required"})
        return;
    } 
    
    User.findOne({email: req.body.email})
    .then((foundUser) => {
        if (!foundUser) {
            res.render('auth-views/login', {message: "This User does not exist"})
        } else {
            let correctPassword = bcryptjs.compareSync(req.body.password, foundUser.password);
            if(correctPassword) {
                req.session.user = foundUser;
                res.redirect('/')
            } else {
                res.render('auth-views/login', {message: "Incorrect Password or Email"})
            }
        }
    })    
})

router.get('/signup', (req, res, next) => {
    res.render('auth-views/signup')
})


router.post('/signup', (req, res, next) => {

    if (!req.body.fullName || !req.body.email || !req.body.password)
    {
        res.render('auth-views/signup', {message: "You must fill out all fields"})
        return;
    }

    const salt = bcryptjs.genSaltSync(saltRounds)
    const hashedPass = bcryptjs.hashSync(req.body.password, salt)


    User.findOne({email: req.body.email})
        .then((foundUser) => {
            if (foundUser){
            res.render('auth-views/signup', {message: "You have already signed up"})
            return
        } else {
                User.create({
                    fullName: req.body.fullName,
                    email: req.body.email,
                    password: hashedPass
                })
                .then(() => {
                    res.redirect('/auth/login')
                })
                .catch((err) => {
                    console.log(err)
                })
            }
        })
        .catch((err) => {
            console.log(err)
        })

})


router.get('/logout', (req, res, next) => {

})

module.exports = router