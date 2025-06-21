import BaseService from '../../shared/Services/BaseService.js'
import eh from '../../Configs/errorHandlers.js'
import { ExperiencesHelper } from './experienceHelpers/ExperiencesHelper.js'
import { ExperienceSocialMethods } from './experienceHelpers/ExperienceSocialMethods.js'
import { ExperienceReport } from './experienceHelpers/ExperienceReport.js'

export default class ExperienceService extends BaseService{
  constructor (model, useImages = false, deleteImages = null,useMedia = false, deleteMedia = null, parserFunction = null, modelName = ''){
    super(model, useImages, deleteImages, parserFunction, modelName)
    this.useMedia = useMedia
    this.deleteMedia = deleteMedia
  }
  async getFeedByCountry (countryId, limit){
    const response = await ExperiencesHelper.getFeedByCountry(this.model, countryId, limit)
    return response
  }
  async getPopularOfMonth (countryId, month, year, limit){
    const response = await ExperiencesHelper.getPopularOfMonth(this.model, countryId, month, year, limit)
    return response
  }
  async addLike(experienceId, userId){//Experience , experienceId, userId
    const response = await ExperienceSocialMethods.addLike(this.model, experienceId, userId)
    return response
  }
  async addDisLike(experienceId, userId){
    const response = await ExperienceSocialMethods.addDislike(this.model, experienceId, userId)
    return response
  }
  async addComment(experienceId, userId, data){//Experience , experienceId, userId, data
    const response = await ExperienceSocialMethods.addComment(this.model, experienceId, userId, data)
    return response
  }
  async deleteComment(experienceId, userId){
    const response = await ExperienceSocialMethods.deleteComment(this.model, experienceId, userId)
    return response
  }

  async reportExperience(experienceId, userId, reason ){
    const response = ExperienceReport.reportExperience(this.model, experienceId, userId, reason)
    return response
  }
  //async reportComment (Experience, experienceId, commentId, userId, reason = ''
  async reportComment(experienceId, commentId, userId, reason ){
    const response = await ExperienceReport.reportComment(this.model, experienceId, commentId, userId, reason )
  }
  //  async moderateExperience (Experience, experienceId, action = 'restore'
  async moderateExperience(experienceId, action ){
    const response = await ExperienceReport.moderateExperience(this.model, experienceId, action )
    return response
  }
  // async moderateComment (Experience, experienceId, commentId, action = 'restore'
  async moderateComment(experienceId, commentId, action){
    const response = await ExperienceReport.moderateComment(this.model, experienceId, commentId, action)
    return response
  }
}
