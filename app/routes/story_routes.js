const express = require('express')
const passport = require('passport')

const Story = require('../models/story')

const customErrors = require('../../lib/custom_errors')

const handled404 = customErrors.handled404

const requireOwnership = customErrors.requireOwnership

const removeBlanks = require('../../lib/remove_blank_fields')

const requireToken = passport.authenticate('bearer', { seesion: false })

const router = express.Router()

router.get('/stories/:id', requireToken, (req, res, next) => {
  Story.findById(req.params.id)

    .then(handled404)

    .then(story => res.status(200).json({

      story: story.toObject()
    }))

    .catch(next)
})

module.exports = router
