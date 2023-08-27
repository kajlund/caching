/*
 * Place services Singleton
 */
const { isLength } = require('validator')

const BaseService = require('../../utils/base.service')
const repo = require('./place.repository')

class PlaceService extends BaseService {
  async findPlacesByName(search) {
    // Find places based on search
    const result = await this.repo.searchPlace(search)

    return {
      success: true,
      msg: `Found ${result.length} places on search: ${search}`,
      search,
      count: result.length,
      data: [...result],
    }
  }

  validateData(postData, isNew = false) {
    const errors = {}
    const data = super.validateData()

    // Build and validate patch data
    if (postData.code) {
      data.code = parseInt(postData.code)
      if (!data.code) {
        errors.code = 'The code must be a valid number'
      }
    }

    if (postData.name_fi && postData.name_fi.trim()) {
      data.name_fi = postData.name_fi.trim()
      if (!isLength(data.name_fi, { min: 2, max: 200 })) {
        errors.name_fi = 'Place name must be between 2 and 50 characters log'
      }
    }

    if (postData.name_sv && postData.name_sv.trim()) {
      data.name_sv = postData.name_sv.trim()
      if (!isLength(data.name_sv, { min: 2, max: 200 })) {
        errors.name_sv = 'Place name must be between 2 and 50 characters log'
      }
    }

    if (postData.province_fi && postData.province_fi.trim()) {
      data.province_fi = postData.province_fi.trim()
      if (!isLength(data.province_fi, { min: 2, max: 200 })) {
        errors.province_fi = 'Province name must be between 2 and 50 characters log'
      }
    }

    if (postData.province_sv && postData.province_sv.trim()) {
      data.province_sv = postData.province_sv.trim()
      if (!isLength(data.province_sv, { min: 2, max: 200 })) {
        errors.province_sv = 'Province name must be between 2 and 50 characters log'
      }
    }

    // Ensure required data for new places
    if (isNew && (!data.name_sv || !data.name_fi)) {
      errors.fields = 'A place name in finnish or swedish must be provided'
    }

    const isValid = Object.keys(errors).length === 0
    return { isValid, errors, data }
  }
}

module.exports = new PlaceService(repo)
