import eh from '../../../Configs/errorHandlers.js'

export class ExperiencesHelper{
  // Feed de experiencias por país, ordenadas por fecha
  static async getFeedByCountry (Experience, countryId, limit = 10) {
    return await Experience.aggregate([
      { $match: { countryId: new mongoose.Types.ObjectId(countryId) } },
      { $sort: { createdAt: -1 } },
      { $limit: limit },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'author'
        }
      },
      { $addFields: { author: { $arrayElemAt: ['$author', 0] } } }
    ])
  }

  // Ejemplo: experiencias más populares del mes
  static async getPopularOfMonth (Experience, countryId, month, year, limit = 10) {
    const start = new Date(year, month - 1, 1)
    const end = new Date(year, month, 1)
    return await Experience.aggregate([
      { $match: {
        countryId: new mongoose.Types.ObjectId(countryId),
        createdAt: { $gte: start, $lt: end }
      }
      },
      { $sort: { 'reactions.netScore': -1 } },
      { $limit: limit }
    ])
  }
}
