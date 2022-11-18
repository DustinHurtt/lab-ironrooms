const express = require('express')
const router = express.Router();

const User = require('../models/User.model')

const bcryptjs = require('bcryptjs')

const salt = 10


router.get('/login', (req, res, next) => {
    res.render('auth-views/login')
})

router.post('/login', (req, res, next) => {
    
})

router.get('/signup', (req, res, next) => {

})


router.post('/signup', (req, res, next) => {
    
})


router.get('/logout', (req, res, next) => {

})

module.exports = router