const express = require('express')

const passport = require('passport')

const Story = require('../models/story')

const customErrors = require('../../lib/custom_errors')

const handle404 = customErrors.handled404

const requireOwnership = customErrors.requireOwnership

const removeBlanks = require('../../lib/remove_blank_fields')

const requireToken = passport.authenticate('bearer', {
  seesion: false
})

const router = express.Router()

// Create/ Add Story
router.post('/stories', requireToken, (req, res, next) => {
  req.body.story.owner = req.user.id

  Story.create(req.body.story)

    .then(story => {
      res.status(201).json({ story: story.toObject() })
    })
    .catch(next)
})

// Read/ All Stories
router.get('/stories', requireToken, (req, res, next) => {
  Story.find()
    .then(stories => {
      return stories.map(story => story.toObject())
    })
    .then(stories => res.status(200).json({
      stories: stories
    }))
    .catch(next)
})

// Read/ Single Story
router.get('/stories/:id', requireToken, (req, res, next) => {
  Story.findById(req.params.id)
    .then(handle404)
    .then(story => res.status(200).json({
      story: story.toObject()
    }))
    .catch(next)
})

// Update
router.patch('/stories/:id', requireToken, removeBlanks, (req, res, next) => {
  delete req.body.story.owner
  Story.findById(req.params.id)
    .then(handle404)
    .then(story => {
      requireOwnership(req, story)
      return story.updateOne(req.body.story)
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

// Destroy/ Done
router.delete('/stories/:id', requireToken, (req, res, next) => {
  Story.findById(req.params.id)
    .then(handle404)
    .then(story => {
      requireOwnership(req, story)
      story.deleteOne()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
