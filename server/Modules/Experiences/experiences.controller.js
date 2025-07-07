import BaseController from '../../shared/Controllers/BaseController.js'
import eh from '../../Configs/errorHandlers.js'

export default class ExperienceController extends BaseController{
  constructor (service){
    super(service)
  }
  getFeedByCountry  = eh.catchController(async (req, res)=>{
    const { id } = req.params
    const limit = req.context.query.limit || 10
    const response = await this.service.getFeedByCountry(id, limit)
    return BaseController.responder(200, true, '', null, response)
  })
  getPopularOfMonth = eh.catchController(async (req, res)=>{
    const { id } = req.params
    const { month, year, limit } =req.context.query
    const response = await this.service.getPopularOfMonth(id, month, year, limit)
    return BaseController.responder(200, true, '', response)
  })
  addLike = eh.catchController(async (req, res)=>{
    const response = await this.service.addLike()
    return BaseController.responder(200, true, '', response)
  })
  addDislike = eh.catchController(async (req, res)=>{
    const response = await this.service.addDislike()
    return BaseController.responder(200, true, '', response)
  })
  addComment = eh.catchController(async (req, res)=>{
    const response = await this.service.addComment()
    return BaseController.responder(200, true, '', response)
  })
  deleteComment = eh.catchController(async (req, res)=>{
    const response = await this.service.deleteComment()
    return BaseController.responder(200, true, '', response)
  })
  reportExperience = eh.catchController(async (req, res)=>{
    const response = await this.service.reportExperience()
    return BaseController.responder(200, true, '', response)
  })
  reportComment = eh.catchController(async (req, res)=>{
    const response = await this.service.reportComment()
    return BaseController.responder(200, true, '', response)
  })
  moderateExperience = eh.catchController(async (req, res)=>{
    const response = await this.service.moderateExperience()
    return BaseController.responder(200, true, '', response)
  })
  moderateComment = eh.catchController(async (req, res)=>{
    const response = await this.service.moderateComment()
    return BaseController.responder(200, true, '', response)
  })

}
