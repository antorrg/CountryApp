import BaseController from '../../Shared/Controllers/BaseController.js'
import eh from '../../Configs/errorHandlers.js'

export default class ExperienceController extends BaseController{
  constructor (service, secondService){
    super(service)
    this.secondService = secondService
  }
  create = eh.catchController(async (req, res)=>{
    const data = req.body
    response = await this.secondService.createExperience(data)
    return BaseController.responder(res, 201, true, response.message, response.results)
  })
  getFeedByCountry  = eh.catchController(async (req, res)=>{
    const { countryId } = req.params
    const limit = req.query.limit ?? 10
    const response = await this.service.getFeedByCountry(countryId, limit)
    return BaseController.responder(res, 200, true, 'ExpByCountry', null, response)
  })
  getPopularOfMonth = eh.catchController(async (req, res)=>{
    const { countryId } = req.params
    const { month, year, limit } =req.context.query
    const response = await this.service.getPopularOfMonth(countryId , month, year, limit)
    return BaseController.responder(res, 200, true, '', response)
  })

  addLike = eh.catchController(async (req, res)=>{
    const { id } = req.params
    const response = await this.service.addLike()
    return BaseController.responder(res, 200, true, '', response)
  })
  addDislike = eh.catchController(async (req, res)=>{
    const response = await this.service.addDislike()
    return BaseController.responder(res, 200, true, '', response)
  })
  addComment = eh.catchController(async (req, res)=>{
    const response = await this.service.addComment()
    return BaseController.responder(res, 200, true, '', response)
  })
  deleteComment = eh.catchController(async (req, res)=>{
    const response = await this.service.deleteComment()
    return BaseController.responder(res, 200, true, '', response)
  })
  reportExperience = eh.catchController(async (req, res)=>{
    const response = await this.service.reportExperience()
    return BaseController.responder(res, 200, true, '', response)
  })
  reportComment = eh.catchController(async (req, res)=>{
    const response = await this.service.reportComment()
    return BaseController.responder(res, 200, true, '', response)
  })
  moderateExperience = eh.catchController(async (req, res)=>{
    const response = await this.service.moderateExperience()
    return BaseController.responder(res, 200, true, '', response)
  })
  moderateComment = eh.catchController(async (req, res)=>{
    const response = await this.service.moderateComment()
    return BaseController.responder(res, 200, true, '', response)
  })

}
