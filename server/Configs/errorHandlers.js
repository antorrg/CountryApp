import env from './envConfig.js'
import mongoose from 'mongoose'

class CustomError extends Error {
  constructor (log = false) {
    super()
    this.log = log
  }

  throwError (message, status, err = null) {
    const error = new Error(message)
    error.status = Number(status) || 500
    if (this.log && err) {
      console.error('Error: ', err)
    }
    throw error
  }

  processError (err, contextMessage) {
    const defaultStatus = 500
    const status = err.status || defaultStatus

    const message = err.message
      ? `${contextMessage}: ${err.message}`
      : contextMessage

    // Creamos un nuevo error con la información combinada
    const error = new Error(message)
    error.status = status
    error.originalError = err // Guardamos el error original para referencia

    // Log en desarrollo si es necesario
    if (this.log) {
      console.error('Error procesado:', {
        context: contextMessage,
        originalMessage: err.message,
        status,
        originalError: err
      })
    }

    throw error
  }
}
const environment = env.Status
const errorHandler = new CustomError(environment === 'development')

export default {
  catchController: (controller) => {
    return (req, res, next) => {
      return Promise.resolve(controller(req, res, next)).catch(next)
    }
  },

  throwError: errorHandler.throwError.bind(errorHandler),

  processError: errorHandler.processError.bind(errorHandler),

  middError: (message, status = 500) => {
    const error = new Error(message)
    error.status = Number(status) || 500
    return error
  },

  validJson: (err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
      res.status(400).json({ success: false, data: null, message: 'Invalid JSON format' })
    } else {
      next()
    }
  }

}
