/*
 * Users business logic layer
 */

const { hash } = require('bcryptjs')
const { isLength, isEmail } = require('validator')

const BaseService = require('../../utils/base.service')
const repo = require('./user.repository')

class UserService extends BaseService {
  async validateData(postData, isNew = false) {
    const errors = {}
    const data = super.validateData()

    // Build and validate patch data
    if (postData.username && postData.username.trim()) {
      data.username = postData.username.trim()
      if (!isLength(data.username, { min: 2, max: 200 })) {
        errors.username = 'The user name must be between 2 and 200 characters long'
      }
    }

    if (postData.email && postData.email.trim()) {
      data.email = postData.email.trim()
      if (!isEmail(data.email)) {
        errors.email = 'Email must be a valid email address'
      }
      const found = await this.repo.findOne({ email: data.email })
      if (found) {
        errors.duplicate = `Email: ${data.email} already registered`
      }
    }

    // don't allow any pwd changes on updates
    if (isNew && postData.password && postData.password.trim()) {
      const pwd = postData.password.trim()
      if (!isLength(pwd, { min: 8, max: 200 })) {
        errors.password = 'Password must be between 8 and 200 characters long'
      }
      data.password = await hash(pwd, 12)
    }

    // Ensure required data for new places
    if (isNew && (!data.username || !data.email || !data.password)) {
      errors.fields = 'A user must have a username, email and a password'
    }

    const isValid = Object.keys(errors).length === 0
    return { isValid, errors, data }
  }
}

module.exports = new UserService(repo)
