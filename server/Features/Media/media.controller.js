import BaseController from '../../Shared/Controllers/BaseController.js'
import eh from '../../Configs/errorHandlers.js'

const catchController = eh.catchController

export default class MediaController extends BaseController{
  constructor (service){
    super(service)
  }
  uploader = catchController(async (req, res)=>{
    const file = req.file

  })
}
