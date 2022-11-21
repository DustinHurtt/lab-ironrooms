const Room = require('../models/Room.model')

const isOwner = (req, res, next) => {
    Room.findById(req.params.id)
    .then((foundRoom) => {
        if (String(foundRoom.owner) === req.session.user._id) {
            next()
        } else {
            res.redirect('/rooms/rooms-list')
        }
    })
    .catch((err) => {
        console.log(err)
    })
}

module.exports = isOwner