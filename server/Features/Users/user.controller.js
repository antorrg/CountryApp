import BaseController from '../../Shared/Controllers/BaseController.js'
import eh from '../../Configs/errorHandlers.js'
const catchController = eh.catchController

export default class UserController extends BaseController{
  constructor (service){
    super(service)
  }
  login = catchController(async (req, res) => {
    const data = req.body
    const response = await this.service.login(data)
    return BaseController.responder(res, 200, true, response.message, null, response.results)
  })
  verifyPassword = catchController(async (req, res)=>{
    const data = req.body
    const response = await this.service.verifyPassword(data)
    return BaseController.responder(res, 200, true, response.message, null, response.results)
  })
}
