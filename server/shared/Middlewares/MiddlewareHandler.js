import { validate as uuidValidate } from 'uuid'
import mongoose from 'mongoose'
import { AuxValid } from './aux/auxValid.js'
import {ValidateSchema} from './aux/validateSchema/ValidateSchema.js'


export default class MiddlewareHandler {

  static validateFields = (schema) => ValidateSchema.validate(schema)

  // MiddlewareHandler.validateQuery([{name: 'authorId', type: 'int', required: true}]),
  static validateQuery (requiredFields = []) {
    return (req, res, next) => {
      try {
        const validatedQuery = {}
        requiredFields.forEach(({ name, type, default: defaultValue }) => {
          let value = req.query[name]

          if (value === undefined) {
            value = defaultValue !== undefined ? defaultValue : AuxValid.getDefaultValue(type)
          } else {
            value = AuxValid.validateValue(value, type, name)
          }

          validatedQuery[name] = value
        })
        //req.validatedQuery = validatedQuery // Nuevo objeto tipado en lugar de modificar req.query
        req.context = req.context || {}
        req.context.query = validatedQuery
        next()
      } catch (error) {
        return next(AuxValid.middError(error.message, 400))
      }
    }
  }

  static validateRegex (validRegex, nameOfField, message = null) {
    return (req, res, next) => {
      if (!validRegex || !nameOfField || nameOfField.trim() === '') {
        return next(AuxValid.middError('Missing parameters in function!', 400))
      }
      const field = req.body[nameOfField]
      const personalizedMessage = message ? ' ' + message : ''
      if (!field || typeof field !== 'string' || field.trim() === '') {
        return next(AuxValid.middError(`Missing ${nameOfField}`, 400))
      }
      if (!validRegex.test(field)) {
        return next(AuxValid.middError(`Invalid ${nameOfField} format!${personalizedMessage}`, 400))
      }
      next()
    }
  }

  static middUuid (fieldName) {
    return (req, res, next) => {
      const id = req.params[fieldName]
      if (!id) return next(AuxValid.middError('Falta el id', 400))
      if (!uuidValidate(id)) return next(AuxValid.middError('Parametros no permitidos', 400))
      next()
    }
  }

  static middObjectId (fieldName) {
    return (req, res, next) => {
      const id = req.params[fieldName]

      if (!id) {
        return next(AuxValid.middError('Falta el id', 400))
      }

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(AuxValid.middError('Id no válido', 400))
      }

      next()
    }
  }

  static middIntId (fieldName) {
    return (req, res, next) => {
      const id = req.params[fieldName]
      if (!id) return next(AuxValid.middError('Falta el id', 400))
      if (!Number.isInteger(Number(id))) return next(AuxValid.middError('Parametros no permitidos', 400))
      next()
    }
  }
  static dbStatusChecker (req, res, next) {
    const dbState = mongoose.connection.readyState
    if (dbState !== 1) {
      return next(AuxValid.middError('Servicio temporalmente no disponible. Base de datos desconectada.', 503))
    }
    next()
  }
}
