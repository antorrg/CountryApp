import BaseService from '../../shared/Services/BaseService.js'
import eh from '../../Configs/errorHandlers.js'

class CountriesService extends BaseService {
  constructor (model, useImages = false, deleteImages = null, parserFunction = null, modelName = '') {
    super(model, useImages, deleteImages, parserFunction, modelName)
  }

  async getAll (queryObject) {
    try {
      const {
        name = '',
        page = 1,
        limit = 10,
        sortBy = 'name.common',
        sort = 'asc',
        region = ''
      } = queryObject
      /*  const {
          name = '',
          page = 1,
          limit = 10,
          sortBy = 'name.common',
          sort = 'asc',
          region = ''
        } = queryObject */

      const filter = {}

      if (name) {
        filter['name.common'] = new RegExp(name, 'i') // búsqueda por nombre
      }

      if (region) {
        filter.region = new RegExp(`^${region}$`, 'i') // búsqueda exacta insensible a mayúsculas
      }

      const allowedSortFields = ['name.common', 'population', 'area']
      const sortOptions = {}

      if (allowedSortFields.includes(sortBy)) {
        sortOptions[sortBy] = sort === 'desc' ? -1 : 1
      }

      const total = await this.model.countDocuments(filter)

      const countries = await this.model.find(filter)
        .sort(sortOptions)
        .skip((page - 1) * limit)
        .limit(parseInt(limit))

      return {
        success: true,
        info: {
          total,
          page: parseInt(page),
          totalPages: Math.ceil(total / limit),
          sortBy,
          sort,
        },
        results: this.parserFunction? countries.map(cnt => this.parserFunction(cnt)) : 
        countries
      }
    } catch (err) {
      eh.processError(err, 'Error in getAll')
    }
  }
}
export default CountriesService
