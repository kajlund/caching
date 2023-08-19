/*
 * Places route endpoints
 */

const express = require('express')
const router = express.Router()

const ctrlPlace = require('./place.controller')

router.route('/find').get(ctrlPlace.findPlaces)
router.route('/').get(ctrlPlace.gePlaces).post(ctrlPlace.createPlace)
router.route('/:id').get(ctrlPlace.getPlaceById).patch(ctrlPlace.updatePlace).delete(ctrlPlace.deletePlace)

module.exports = router
