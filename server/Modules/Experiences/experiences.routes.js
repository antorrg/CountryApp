import express from 'express'
import Experience from '../../shared/Models/experience.js'
import ExperienceService from './experiences.service.js'
import ExperienceController from './experiences.controller.js'

const experienceService = new ExperienceService(Experience )
const controller = new ExperienceController(experienceService)
const experienceRoute = express.Router()

experienceRoute.get(
  '/country/:id/experiences',
  controller.getFeedByCountry
)

experienceRoute.get(
  '/experiences',
  controller.getAll
)

experienceRoute.get()

experienceRoute.post(
  '/experience/:id/like'
)

experienceRoute.delete(
  '/experience/:id/like'

)

experienceRoute.post(
  '/experiences/:id/comments'
)

experienceRoute.get()

export default experienceRoute
/*Endpoints sugeridos:
Para obtener experiencias por país:

GET /countries/:countryId/experiences
GET /experiences?country=:countryId&sort=likes (ordenar por popularidad)
GET /experiences?country=:countryId&sort=recent (más recientes)
Para interacciones sociales:

POST /experiences/:id/like
DELETE /experiences/:id/like
POST /experiences/:id/comments
*/
