import express from 'express'
import countryRouter from './Modules/Countries/countries.routes.js'
import userRouter from './Modules/Users/user.routes.js'

const mainRouter = express.Router()

mainRouter.use(countryRouter)

mainRouter.use('/user', userRouter)

export default mainRouter
