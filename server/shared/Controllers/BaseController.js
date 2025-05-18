import eh from '../../Configs/errorHandlers.js'
const catchController = eh.catchController

export default class BaseController {
  constructor (service) {
    this.service = service
  }

  // Methods:
  static responder (res, status, success, message = null, info= null, results = null) {
    res.status(status).json({ success, message, info, results })
  }

  // Controllers:
  create = catchController(async (req, res) => {
    const data = req.body
    const response = await this.service.create(data)
    return BaseController.responder(res, 201, true, response.message, null, response.results)
  })

  getAll = catchController(async (req, res) => {
    const queryObject = req.context?.query || req.query
    const response = await this.service.getAll(queryObject)
    return BaseController.responder(res, 200, true, response.message, response.info, response.results)
  })
  getAdmin = catchController(async (req, res) => {
    const queryObject = req.context?.query || req.query
    const response = await this.service.getAllAdmin(queryObject)
    return BaseController.responder(res, 200, true, response.message, response.info, response.results)
  })

  getById = catchController(async (req, res) => {
    const { id } = req.params
    const response = await this.service.getById(id)
    return BaseController.responder(res, 200, true, response.message, null, response.results)
  })

  update = catchController(async (req, res) => {
    const { id } = req.params
    const newData = req.body
    const response = await this.service.update(id, newData)
    return BaseController.responder(res, 200, true, response.message, null, response.results)
  })

  delete = catchController(async (req, res) => {
    const { id } = req.params
    const response = await this.service.delete(id)
    return BaseController.responder(res, 200, true, response.message, null, response.results)
  })
}

