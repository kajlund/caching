/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const municiplalities = require('./places.json')

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('places').del()

  const places = []
  for (const key in municiplalities) {
    places.push({
      code: parseInt(key, 10),
      name_fi: municiplalities[key].KUNTANIMIFI,
      name_sv: municiplalities[key].KUNTANIMISV,
      province_fi: municiplalities[key].MAAKUNTANIMIFI,
      province_sv: municiplalities[key].MAAKUNTANIMISV,
    })
  }

  await knex('places').insert(places)
}
