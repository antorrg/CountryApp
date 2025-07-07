import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import helmet from 'helmet'
import mainRouter from './routes.js'
import eh from './Configs/errorHandlers.js'
import MiddlewareHandler from './shared/Middlewares/MiddlewareHandler.js'
import env from './Configs/envConfig.js'
import path from 'path'
import swaggerUi from 'swagger-ui-express'
import swaggerJsDoc from 'swagger-jsdoc'
import swaggerOptions from './shared/Swagger/swaggerOptions.js'
const dirname = path.resolve()
console.log('direccion: ',path.join(process.cwd(), 'server/locales'))

const swaggerDocs = swaggerJsDoc(swaggerOptions)
const swaggerUiOptions = {
  swaggerOptions: {
    docExpansion: 'none' // 👈 Oculta todas las rutas al cargar
  }
}
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
if (env.Status === 'development') {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs, swaggerUiOptions))
}

//app.use(MiddlewareHandler.dbStatusChecker)

app.use('/api/v1', MiddlewareHandler.dbStatusChecker, mainRouter)

app.use((req, res, next) => {
  return next(eh.middError('Route not Found', 404))
})

/* eslint-disable no-unused-vars */
app.use((err, req, res, next) => {
  const status = err.status || 500
  const message = err.message || 'Unexpected server error'
  res.status(status).json({
    success: false,
    message: message,
    results: 'Fail'
  })
})

export default app
