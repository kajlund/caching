/*
 * Users repository. Customized data-access module
 */

const BaseRepository = require('../../db/base.repository')

const config = {
  table: 'users',
  filter: {},
  sort: ['username'],
  limit: 25,
  skip: 0,
  descField: 'username',
}

class UserRepository extends BaseRepository {}

module.exports = new UserRepository(config)
