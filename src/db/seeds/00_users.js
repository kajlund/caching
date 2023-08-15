/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const { hash } = require('bcryptjs')
const users = require('./users.json')

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('users').del()

  for (let u of users) {
    u.password = await hash(u.password, 12)
  }

  await knex('users').insert(users)
}
