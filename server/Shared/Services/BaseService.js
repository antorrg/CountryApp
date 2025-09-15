import eh from '../../Configs/errorHandlers.js'

export default class BaseService {
  constructor (model, useImages = false, deleteImages = null, parserFunction = null, modelName = '', emptyObject = null) {
    this.model = model
    this.useImages = useImages
    this.deleteImages = deleteImages
    this.parserFunction = parserFunction
    this.modelName = modelName
    this.emptyObject = emptyObject
  }

  async create (data, whereField = '') {
    try {
      const whereClause = whereField ? { [whereField]: data[whereField] } : {}
      if (whereField && !data[whereField]) {
        eh.throwError(`Missing field '${whereField}' for uniqueness check`, 400)
      }
      //console.log('whereClause:', whereClause)
      if (whereField) {
        const exists = await this.model.findOne(whereClause)
        if (exists) { eh.throwError(`This ${whereField} already exists`, 400) }
      }
      const newDoc = await this.model.create(data)

      const identifier = whereField && data[whereField] ? `${data[whereField]} ` : ''
      return {
        message: `${whereField} ${identifier}created successfully`,
        results: this.parserFunction ? this.parserFunction(newDoc) : newDoc
      }
    } catch (error) {
      eh.processError(error, 'Error created')
    }
  }

  async #findElements (queryObject, isAdmin=false) {
    const { page = 1, limit = 10, filters = {}, sort = {} } = queryObject
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
    const sortOptions = {}
    for (const key in sort) {
      const order = sort[key]
      sortOptions[key] = order === 'desc' ? -1 : 1
    }
    const conditionalSearch = isAdmin
      ? await this.model.find(query).sort(sortOptions).skip(skip).limit(limit)
      : await this.model.findEnabled(query).sort(sortOptions).skip(skip).limit(limit)

    const countQuery = isAdmin
      ? query
      : { ...query, enabled: true, deleted: false }

    let [results, total] = await Promise.all([
      conditionalSearch,
      this.model.countDocuments(countQuery)
    ])
    if (results.length===0) results = [this.emptyObject] ?? []
    const finalResults = this.parserFunction ? results.map(doc => this.parserFunction(doc)) : results
    return {
      message: 'Elements found successfully!',
      info: {
        page: parseInt(page),
        limit,
        totalPages: Math.ceil(total / limit),
        count: total,
        sort: sort
      },
      results: finalResults
    }
  }

  async getAll (queryObject){
    return await this.#findElements(queryObject, false)
  }
  async getAllAdmin (queryObject){
    return await this.#findElements(queryObject, true)
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
    try {
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
        results: newData
      }
    } catch (error) {
      eh.processError(error, 'Error updating')
    }
  }
  async #conditionalDel (id, isHard) {
    try {
      let imageUrl = ''
      const register = await this.model.findOne({ _id: id })
      if (!register) { eh.throwError(`${this.modelName} not found`, 404) }

      if (this.useImages) { imageUrl = register.picture }
      const  conditionalDelete = isHard
        ? await this.model.findByIdAndDelete(id)
        : await this.model.findByIdAndUpdate(id, { deleted: true }, { new: true })

      const erased = await conditionalDelete
      if (this.useImages && imageUrl.trim() && isHard) {
        await this.deleteImages(imageUrl)
      }
      const message = isHard ? 'hard deleted': 'deleted'
      return {
        message: `${this.modelName} ${message} successfully`,
        results: isHard ? erased : null
      }
    } catch (error) {
      eh.processError(error, 'Error deleting')
    }
  }

  async delete (id) {
    return await this.#conditionalDel(id, false)
  }

  async hardDelete (id) {
    return await this.#conditionalDel(id, true)
  }

}

