/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const caches = require('./caches.json')
const db = require('../index')

const finUserIdByEmail = async (email) => {
  let userId = ''
  const user = await db('users').where('email', email).first()
  if (user) {
    userId = user.id
  }
  // console.log(`userId = ${userId}`)
  return userId
}

const findPlaceIdByName = async (name) => {
  let placeId = ''
  let nameParam = name ? name.toLowerCase().trim() : ''
  if (nameParam) {
    const place = await db('places')
      .whereRaw(`lower(name_sv) = ?`, [`${nameParam}`])
      .orWhereRaw(`lower(name_fi) = ?`, [`${nameParam}`])
      .first()
    if (place) {
      placeId = place.id
    }
  }
  // console.log(`placeId = ${placeId}`)
  return placeId
}

const finTypeIdByName = async (name) => {
  let typeId = ''
  const kind = await db('cachetypes')
    .whereRaw(`LOWER(name) = ?`, [`${name.toLowerCase()}`])
    .first()
  if (kind) {
    typeId = kind.id
  }
  // console.log(`typeIdId = ${typeId}`)
  return typeId
}

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('caches').del()

  let cacheList = []
  const userId = await finUserIdByEmail('kaj.lund@gmail.com')

  for (const key in caches) {
    let placeId = await findPlaceIdByName(caches[key].municipality)
    let typeId = await finTypeIdByName(caches[key].cacheType)

    let cache = {
      gc: caches[key].cacheId,
      cache_type: typeId,
      name: caches[key].name,
      coords: caches[key].coords,
      verified: caches[key].verifiedCoords,
      place_id: placeId,
      user_id: userId,
    }
    cacheList.push(cache)
    if (cacheList.length >= 100) {
      // console.log(cacheList)
      await knex('caches').insert(cacheList)
      cacheList = []
    }
  }
  if (cacheList.length) {
    await knex('caches').insert(cacheList)
  }
}
