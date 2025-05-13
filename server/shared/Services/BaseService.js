import eh from '../../Configs/errorHandlers.js'

class BaseService {
  constructor (model, useImages = false, deleteImages = null, parserFunction = null, modelName='') {
    this.model = model
    this.useImages = useImages
    this.deleteImages = deleteImages
    this.parserFunction = parserFunction
    this.modelName = modelName
  }

  async create (data, whereField = '') {
    const whereClause = whereField ? { [whereField]: data[whereField] } : {}
    if (whereField && !data[whereField]) {
      eh.throwError(`Missing field '${whereField}' for uniqueness check`, 400)
    }
    console.log('whereClause:',whereClause)
    if (whereField) {
      const exists = await this.model.findOne(whereClause)
      if (exists){eh.throwError(`This ${whereField} already exists`, 400) }
    }
    const newDoc = await this.model.create(data)

    const identifier = whereField && data[whereField] ? `${data[whereField]} ` : ''
    return {
      message: `${whereField} ${identifier}created successfully`,
      results: this.parserFunction ? this.parserFunction(newDoc) : newDoc
    }
  }

  async getAll (queryObject) {
    const { page = 1, limit = 10, filters = {} } = queryObject
    const skip = (page - 1) * limit

    // Filtro base para excluir eliminados
    const query = { deleted: false }

    // Filtros dinámicos
    for (const key in filters) {
      const value = filters[key]
      if (typeof value === 'string') {
        query[key] = { $regex: value, $options: 'i' }
      } else {
        query[key] = value
      }
    }

    const [results, total] = await Promise.all([
      this.model.find(query).skip(skip).limit(limit),
      this.model.countDocuments(query)
    ])
    const finalResults = this.parserFunction ? results.map(doc => this.parserFunction(doc)) : results
    return {
      message: 'This elements was found!',
      info: {
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        totalResults: total
      },
      results: finalResults
    }
  }

  async getById (id) {
    const doc = await this.model.findOne({ _id: id, deleted: false })
    if (!doc) { eh.throwError('Not found', 404) }
    return {
      message: `The ${this.modelName} was found!`,
      results: this.parserFunction ? this.parserFunction(doc) : doc
    }
  }

  async update (id, data) {
    let imageUrl = ''
    const register = await this.model.findOne({ _id: id, deleted: false })
    if (!register) { eh.throwError(`${this.modelName} not found`, 404) }
    if (this.useImages) {
      if (register.picture !== data.picture) { imageUrl = register.picture }
    }
    const newData = await this.model.updateOne(
      { _id: id, deleted: false },
      data,
      { new: true }
    )
    if (this.useImages && imageUrl.trim()) {
      await this.deleteImages(imageUrl)
    }
    return {
      message: `${this.modelName} updated successfully!`,
      results: null
    }
  }

  async delete (id) {
    const register = await this.model.findOne({ _id: id, deleted: false })
    if (!register) { eh.throwError(`${this.modelName} not found`, 404) }
    if (this.useImages) { imageUrl = register.picture }
    // Soft delete: no elimina el documento, solo lo marca como eliminado
    const erased = await this.model.findByIdAndUpdate(id, { deleted: true }, { new: true })
    if (this.useImages && imageUrl.trim()) {
      await this.deleteImages(imageUrl)
    }
    return {
      message: `${this.modelName} deleted successfully`,
      results: erased
    }
  }

  // Si querés eliminar físicamente:
  async hardDelete (id) {
    let imageUrl = ''
    const register = await this.model.findOne({ _id: id, deleted: false })
    if (!register) { eh.throwError(`${this.modelName} not found`, 404) }

    if (this.useImages) { imageUrl = register.picture }
    await this.model.findByIdAndDelete(id)

    if (this.useImages && imageUrl.trim()) {
      await this.deleteImages(imageUrl)
    }
    return {
      message: `${this.modelName} deleted successfully`,
      results: null
    }
  }
}

export default BaseService
