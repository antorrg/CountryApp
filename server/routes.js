import express from 'express'
import countryRouter from './Modules/Countries/countries.routes.js'
// import userRouter from './Modules/users/user.routes.js'

const mainRouter = express.Router()

mainRouter.use(countryRouter)

mainRouter.use('/saludo', (req, res) => {
  res.send('todo ok')
})

export default mainRouter
