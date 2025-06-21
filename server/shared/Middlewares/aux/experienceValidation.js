import { AuxValid } from './auxValid.js'
import mongoose from 'mongoose'

const allowedCategories = ['adventure', 'cultural', 'gastronomic', 'family', 'business', 'romantic']
const allowedBudgets = ['low', 'medium', 'high', 'luxury']

export class validateExperienceInput{

  static validateExperienceInput (req, res, next){
    let data = req.body
    // userId y countryId deben ser ObjectId válidos
    if (!data.userId || !mongoose.Types.ObjectId.isValid(data.userId)) {
      return next(AuxValid.middError('Invalid or missing userId', 400))
    }
    if (!data.countryId || !mongoose.Types.ObjectId.isValid(data.countryId)) {
      return next(AuxValid.middError('Invalid or missing countryId', 400))
    }

    // title
    if (!data.title || typeof data.title !== 'string' || data.title.length > 100) {
      return next(AuxValid.middError('Title is required and must be at most 100 characters', 400))
    }

    // description
    if (!data.description || typeof data.description !== 'string' || data.description.length > 2000) {
      return next(AuxValid.middError('Description is required and must be at most 2000 characters', 400))
    }

    // rating
    if (
      typeof data.rating !== 'number' ||
    data.rating < 1 ||
    data.rating > 5
    ) {
      return next(AuxValid.middError('Rating is required and must be a number between 1 and 5',400))
    }

    // visitDate
    if (!data.visitDate || isNaN(Date.parse(data.visitDate))) {
      return next(AuxValid.middError('visitDate is required and must be a valid date', 400))
    }

    // category (opcional)
    if (data.category && !allowedCategories.includes(data.category)) {
      return next(AuxValid.middError('Invalid category', 400))
    }

    // budget (opcional)
    if (data.budget && !allowedBudgets.includes(data.budget)) {
      return next(AuxValid.middError('Invalid budget',400))
    }

    // tags (opcional)
    if (data.tags && !Array.isArray(data.tags)) {
      errors.push('Tags must be an array')
    }
    if (data.media && data.media.photos) {
      if (!Array.isArray(data.media.photos)) {
        errors.push('media.photos must be an array')
      } else if (!data.media.photos.every(url => typeof url === 'string')) {
        return next(AuxValid.middError('All media.photos must be strings', 400))
      }
    }

    // media.videos (opcional)
    if (data.media && data.media.videos) {
      if (!Array.isArray(data.media.videos)) {
        errors.push('media.videos must be an array')
      } else if (!data.media.videos.every(url => typeof url === 'string')) {
        return next(AuxValid.middError('All media.videos must be strings', 400))
      }
    }
    next()
  }
}
