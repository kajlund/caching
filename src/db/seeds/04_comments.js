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

const finCacheIdByGC = async (gc) => {
  let cacheId = ''
  const cache = await db('caches').where('gc', gc).first()
  if (cache) {
    cacheId = cache.id
  }
  // console.log(`userId = ${userId}`)
  return cacheId
}

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('cachecomments').del()

  let commentList = []
  const userId = await finUserIdByEmail('kaj.lund@gmail.com')

  for (const key in caches) {
    let cacheId = await finCacheIdByGC(caches[key].cacheId)
    let note = caches[key].notes
    if (cacheId && note) {
      commentList.push({ cache_id: cacheId, user_id: userId, comment: note })
    }
  }

  if (commentList.length) {
    // console.log(commentList)
    await knex('cachecomments').insert(commentList)
  }
}
