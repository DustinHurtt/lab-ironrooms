const express = require('express');
const router = express.Router();

const Review = require('../models/Review.model');

const Room = require('../models/Room.model');


const isNotOwner = require('../middleware/isNotOwner')

router.get('/:id/add-reviews', isNotOwner, (req, res, next) => {
    res.render('comment-views/add-review.hbs', {roomId: req.params.id})
})

router.post('/:id/add-reviews', isNotOwner, (req, res, next) => {
    Review.create({
        user: req.session.user._id,
        comment: req.body.comment
    })
    .then((newReview) => {
        Room.findByIdAndUpdate(
            req.params.id,
            { $addToSet: { reviews: newReview._id } }
             , 
            {new: true}
            )
            .then((updatedRoom) => {
                console.log("WITH NEW REVIEW", updatedRoom)
                res.redirect('/rooms/rooms-list')
            })
            .catch((err) => {
                console.log(err)
            })
    })
    .catch((err) => {
        console.log(err)
    })
})


module.exports = router