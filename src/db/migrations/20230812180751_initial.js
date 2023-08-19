/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')

  await knex.schema.createTable('users', (table) => {
    // table.increments('id')
    table.uuid('id', { useBinaryUuid: false, primaryKey: true }).defaultTo(knex.raw('uuid_generate_v4()'))
    table.string('username').notNullable().defaultTo('')
    table.string('email').notNullable().unique()
    table.string('password').notNullable()
    table.string('role').notNullable().defaultTo('PROSPECT')
    table.timestamps(true, true)
  })

  await knex.schema.createTable('cachetypes', (table) => {
    // table.increments('id')
    table.uuid('id', { useBinaryUuid: false, primaryKey: true }).defaultTo(knex.raw('uuid_generate_v4()'))
    table.string('name').notNullable().defaultTo('')
    table.timestamps(true, true)
  })

  await knex.schema.createTable('places', (table) => {
    // table.increments('id')
    table.uuid('id', { useBinaryUuid: false, primaryKey: true }).defaultTo(knex.raw('uuid_generate_v4()'))
    table.integer('code').notNullable().unique()
    table.string('name_fi').notNullable().defaultTo('')
    table.string('name_sv').notNullable().defaultTo('')
    table.string('province_fi').notNullable().defaultTo('')
    table.string('province_sv').notNullable().defaultTo('')
    table.timestamps(true, true)
  })

  await knex.schema.createTable('caches', (table) => {
    // table.increments('id')
    table.uuid('id', { useBinaryUuid: false, primaryKey: true }).defaultTo(knex.raw('uuid_generate_v4()'))
    table.string('gc').notNullable().unique()
    table.string('cache_type').defaultTo('')
    table.string('name').notNullable().defaultTo('')
    table.string('coords').notNullable().defaultTo('')
    table.boolean('verified').notNullable().defaultTo(false)
    table.string('place_id').defaultTo('')
    table.string('user_id').defaultTo('')
    table.datetime('deleted_at', { precision: 6 }).nullable().defaultTo(null)
    table.timestamps(true, true)
  })

  await knex.schema.createTable('cachecomments', (table) => {
    // table.increments('id')
    table.uuid('id', { useBinaryUuid: false, primaryKey: true }).defaultTo(knex.raw('uuid_generate_v4()'))
    table.uuid('cache_id').references('id').inTable('caches').onDelete('CASCADE')
    table.uuid('user_id').references('id').inTable('users').onDelete('SET NULL')
    table.text('comment').notNullable().defaultTo('')
    table.timestamps(true, true)
  })

  return true
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  // Drop the "blog" table if it exists
  await knex.schema.dropTableIfExists('cachecomments')
  await knex.schema.dropTableIfExists('caches')
  await knex.schema.dropTableIfExists('users')
  await knex.schema.dropTableIfExists('cachetypes')
  await knex.schema.dropTableIfExists('places')

  return true
}
