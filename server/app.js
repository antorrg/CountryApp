import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import helmet from 'helmet'
import mainRouter from './routes.js'
import eh from './Configs/errorHandlers.js'
import env from './Configs/envConfig.js'
import path from 'path'
const dirname = path.resolve()

const app = express()
app.use(morgan('dev'))
app.use(cors())
app.use(helmet())
app.use(express.json())
app.use(eh.validJson)
if (env.Status === 'production') {
  app.use(express.static(path.join(dirname, 'dist')))
  app.get('/', (req, res) => {
    res.sendFile('index.html')
  })
}

app.use('/api/v1', mainRouter)

app.use((req, res, next) => {
  return next(eh.middError('Not Found', 404))
})

/* eslint-disable no-unused-vars */
app.use((err, req, res, next) => {
  const status = err.status || 500
  const message = err.message || 'Unexpected server error'
  res.status(status).json({
    success: false,
    message,
    results: 'Fail'
  })
})

export default app
