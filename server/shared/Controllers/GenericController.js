import eh from '../../Configs/errorHandlers.js'
const catchController = eh.catchController

class GenericController {
  constructor (service) {
    this.service = service
  }

  // Methods:
  static responder (res, status, success, message = null, results = null) {
    res.status(status).json({ success, message, results })
  }

  // Controllers:
  create = catchController(async (req, res) => {
    const data = req.body
    const response = await this.service.create(data)
    return GenericController.responder(res, 201, true, response.message, response.results)
  })

  getAll = catchController(async (req, res) => {
    const response = await this.service.getAll()
    return GenericController.responder(res, 200, true, response.message, response.results)
  })

  getById = catchController(async (req, res) => {
    const { id } = req.params
    const response = await this.service.getById(id)
    return GenericController.responder(res, 200, true, response.message, response.results)
  })

  update = catchController(async (req, res) => {
    const { id } = req.params
    const newData = req.body
    const response = await this.service.update(id, newData)
    return GenericController.responder(res, 200, true, response.message, response.results)
  })

  delete = catchController(async (req, res) => {
    const { id } = req.params
    const response = await this.service.delete(id)
    return GenericController.responder(res, 200, true, response.message, response.results)
  })
};

export default GenericController
