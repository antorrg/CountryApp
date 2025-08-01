import { AuxValid } from '../auxValid.js'


export class ValidateSchema {
  static validate(schema) {
    return (req, res, next) => {
      try {
        const validated = ValidateSchema.#validateStructure(req.body, schema)
        req.body = validated
        next()
      } catch (err) {
        return next(AuxValid.middError(err.message, 400))
      }
    }
  }

  static #validateStructure(data, schema, path = '') {
    if (typeof schema === 'string' || (typeof schema === 'object' && schema.type)) {
      return ValidateSchema.#validateField(data, schema, path)
    }

    if (Array.isArray(schema)) {
      if (!Array.isArray(data)) {
        throw new Error(`Expected array at ${path || 'root'}`)
      }
      return data.map((item, i) =>
        ValidateSchema.#validateStructure(item, schema[0], `${path}[${i}]`)
      )
    }

    if (typeof schema === 'object') {
      if (typeof data !== 'object' || data === null || Array.isArray(data)) {
        throw new Error(`Expected object at ${path || 'root'}`)
      }

      const result = {}
      for (const key in schema) {
        const fieldSchema = schema[key]
        const fullPath = path ? `${path}.${key}` : key
        const value = data[key]

        if (!(key in data)) {
          if (fieldSchema.optional) {
            continue // omitido si es opcional
          } else if ('default' in fieldSchema) {
            result[key] = fieldSchema.default
            continue
          } else {
            throw new Error(`Missing field: ${key} at ${fullPath}`)
          }
        }

        result[key] = ValidateSchema.#validateStructure(value, fieldSchema, fullPath)
      }
      return result
    }

    throw new Error(`Invalid schema at ${path || 'root'}`)
  }

  static #validateField(value, fieldSchema, path) {
    const type = typeof fieldSchema === 'string' ? fieldSchema : fieldSchema.type

    // Si está ausente y hay valor por defecto
    if (value === undefined || value === null) {
      if (typeof fieldSchema === 'object' && 'default' in fieldSchema) {
        return fieldSchema.default
      }
      throw new Error(`Missing required field at ${path}`)
    }

    // Validación real
    return AuxValid.validateValue(value, type, path)
  }
}
