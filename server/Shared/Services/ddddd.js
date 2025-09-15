
class Service{
  constructor (model, parserFunction=null){
    this.model = model
    this.parserFunction = parserFunction
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
        results: this.parserFunction ? this.parserFunction.infoClean(newDoc) : newDoc
      }
    } catch (error) {
      eh.processError(error, 'Error created')
    }
  }

  async getAll () {
    const doc = await this.model.find({ deleted: false })

    return {
      message: `The ${this.modelName} was found!`,
      results: this.parserFunction ? this.parserFunction.infoCleanGetAll(doc) : doc
    }
  }
  async getById (id) {
    const doc = await this.model.findOne({ _id: id, deleted: false })
    if (!doc) { eh.throwError('Not found', 404) }
    return {
      message: `The ${this.modelName} was found!`,
      results: this.parserFunction ? this.parserFunction.infoClean(doc) : doc
    }
  }
}
