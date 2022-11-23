const express = require('express')
const router = express.Router();

const isLoggedIn = require('../middleware/isLoggedIn')
const isOwner = require('../middleware/isOwner')

const Room = require('../models/Room.model')

router.get('/create-room', (req, res, next) => {
    res.render('room-views/create-room.hbs')
})

router.post('/create-room', isLoggedIn, (req, res, next) => {
    Room.create({
        name: req.body.name,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        owner: req.session.user._id
    })
    .then((createdRoom) => {
        console.log("THIS IS THE ROOM I CREATED", createdRoom)
        res.redirect('/rooms/rooms-list')
    })
    .catch((err) => {
        console.log(err)
    })
})

router.get('/rooms-list', (req, res, next) => {
    Room.find()
    .then((foundRooms) => {
        res.render('room-views/all-rooms.hbs', {foundRooms})
    })
    .catch((err) => {
        console.log(err)
    })
})

router.post('/:id/delete-room', isOwner, (req, res, next) => {
    Room.findById(req.params.id)
        .then((foundRoom) => {
            foundRoom.delete()
            res.redirect('/rooms/rooms-list')
        })
        .catch((err) => {
            console.log(err)
        })
});

router.get('/:id/edit-room', isOwner, (req, res, next) => {
    Room.findById(req.params.id)
      .then((foundRoom) => {
        console.log("THIS IS THE ROOM I WANT TO EDIT", foundRoom)
        res.render('room-views/edit-room.hbs', foundRoom)
      })
      .catch((err) => {
        console.log(err)
      })
})

router.post('/:id/edit-room', isOwner, (req, res, next) => {
  Room.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    description: req.body.description,
    imageUrl: req.body.imageUrl
  },
  {new: true}
  )
  .then((updatedRoom) => {
    console.log("Changed room:", updatedRoom)
    res.redirect('/rooms/rooms-list')
  })
  .catch((err) => {
    console.log(err)
  })

})










module.exports = router