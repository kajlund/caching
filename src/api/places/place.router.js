/*
 * Places route definitions
 */

const express = require('express')
const router = express.Router()

const ctrl = require('./place.controller')

router.route('/find').get(ctrl.findPlaces)
router.route('/').get(ctrl.listItems).post(ctrl.createItem)
router.route('/:id').get(ctrl.getItemById).patch(ctrl.updateItem).delete(ctrl.deleteItem)

module.exports = router
