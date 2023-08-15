/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('cachetypes').del()

  await knex('cachetypes').insert([
    { name: 'Traditional' },
    { name: 'Mystery' },
    { name: 'Multi' },
    { name: 'Earth' },
    { name: 'Letterbox' },
    { name: 'Event' },
    { name: 'CITO' },
    { name: 'Mega' },
    { name: 'Giga' },
    { name: 'Wherigo' },
    { name: 'HQ' },
    { name: 'Lab' },
    { name: 'Virtual' },
    { name: 'Webcam' },
  ])
}
