import express from 'express'
// import userRouter from './Modules/users/user.routes.js'

const mainRouter = express.Router()

mainRouter.use('/api/user', (req, res) => {
  res.send('todo ok')
})

export default mainRouter
