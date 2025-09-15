import express from 'express'
import Experience from '../../Shared/Models/experience.js'
import ExperienceService from './experiences.service.js'
import ExperienceController from './experiences.controller.js'
import { ExperienceDto, emptyData } from './Experience.Dto.js'
import { Validator } from 'req-valid-express'


const experienceService = new ExperienceService(Experience, false, null, ExperienceDto.parser, 'Experience', emptyData, false, null, )
const controller = new ExperienceController(experienceService)
const experienceRoute = express.Router()

experienceRoute.get(
  '/experiences',
  controller.getAll
)

experienceRoute.get(
  '/experiences/details/:id',
  Validator.paramId('id', Validator.ValidReg.OBJECT_ID),
  controller.getById
)
experienceRoute.post(
  '/experience/create',
  controller.create
)
experienceRoute.post(
  '/experiences/add',
  controller.addComment
)

experienceRoute.put(
  '/experiences/:id',
  Validator.paramId('id', Validator.ValidReg.OBJECT_ID),
  controller.update
)

experienceRoute.delete(
  '/experiences/:id',
  Validator.paramId('id', Validator.ValidReg.OBJECT_ID),
  controller.delete
)

experienceRoute.get(
  '/experiences/:countryId/experiences',
  Validator.paramId('countryId', Validator.ValidReg.OBJECT_ID),
  controller.getFeedByCountry
)

experienceRoute.post(
  '/experience/:id/like',
  Validator.paramId('id', Validator.ValidReg.OBJECT_ID),
  controller.addLike
)

experienceRoute.delete(
  '/experience/:id/like',
  Validator.paramId('id', Validator.ValidReg.OBJECT_ID)

)

experienceRoute.post(
  '/experiences/:id/comments',
  Validator.paramId('id', Validator.ValidReg.OBJECT_ID),
  controller.addComment
)

//experienceRoute.get()

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
