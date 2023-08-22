/*
 * Places route definitions
 */

const ctrl = require('./place.controller')

module.exports = {
  group: {
    prefix: '/places',
    middleware: [], // TODO:Require auth for all routes
  },
  routes: [
    {
      method: 'get',
      path: '/find',
      middleware: [],
      handler: ctrl.findPlacesByName,
    },
    {
      method: 'get',
      path: '/',
      middleware: [],
      handler: ctrl.listItems,
    },
    {
      method: 'get',
      path: '/:id',
      middleware: [],
      handler: ctrl.getItemById,
    },
    {
      method: 'post',
      path: '/',
      middleware: [],
      handler: ctrl.createItem,
    },
    {
      method: 'patch',
      path: '/:id',
      middleware: [],
      handler: ctrl.updateItem,
    },
    {
      method: 'delete',
      path: '/:id',
      middleware: [],
      handler: ctrl.deleteItem,
    },
  ],
}
