import express from 'express'
import countryRouter from './Features/Countries/countries.routes.js'
import experienceRoute from './Features/Experiences/experiences.routes.js'
import userRouter from './Features/Users/user.routes.js'
import mediaRouter from './Features/Media/media.routes.js'

const mainRouter = express.Router()

mainRouter.use('/user', userRouter)

mainRouter.use('/',countryRouter)

mainRouter.use('/', experienceRoute)

mainRouter.use('/', mediaRouter)

export default mainRouter
