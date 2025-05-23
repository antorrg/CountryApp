import express from 'express'
import countryRouter from './Modules/Countries/countries.routes.js'
import userRouter from './Modules/Users/user.routes.js'

const mainRouter = express.Router()


mainRouter.use('/user', userRouter)

mainRouter.use('/',countryRouter)

export default mainRouter
