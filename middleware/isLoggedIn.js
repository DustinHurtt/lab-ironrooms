const isLoggedIn = (req, res, next) => {
    if (!req.session.user) {
        res.redirect('/auth/login')
    } else {
        next()
    }
}

module.exports = isLoggedIn