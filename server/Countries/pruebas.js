import Country from '../../Models/country.js'

export const getAllCountries = async (req, res) => {
  try {
    const {
      name = '',
      page = 1,
      limit = 10,
      sortBy = 'name.common',
      sort = 'asc',
      region = ''
    } = req.query

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

    const total = await Country.countDocuments(filter)

    const countries = await Country.find(filter)
      .sort(sortOptions)
      .skip((page - 1) * limit)
      .limit(parseInt(limit))

    res.json({
      success: true,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / limit),
      sortBy,
      sort,
      region: region || null,
      results: countries
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener países',
      error: err.message
    })
  }
}
