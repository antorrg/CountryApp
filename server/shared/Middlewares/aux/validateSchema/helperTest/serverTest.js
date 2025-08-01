import express from 'express'
import {ValidateSchema} from '../ValidateSchema.js'

const singleSchema = {  
  name: { type: 'string' },
  active: { type: 'boolean', default: false },
  metadata: { type: 'string', optional: true },
  price: {type: 'float', default : 2.0}
}

const doubleSchema = {
  name: { type: 'string' },
  active: { type: 'boolean', default: false },
  profile: {
    age: { type: 'int' },
    rating: { type: 'float', default: 0.0 }
  },
  tags: [{ type: 'string' }],
  metadata: { type: 'string', optional: true }
}
const threeSchema = {
  name: { type: 'string' },
  active: { type: 'boolean', default: false },
  profile: [{
    age: { type: 'int' },
    rating: { type: 'float', default: 0.0 }
  },],
  tags: [{ type: 'string' }],
  metadata: { type: 'string', optional: true }
}

const serverTest = express()
serverTest.use(express.json())

serverTest.post(
  '/test/body/create',
  ValidateSchema.validate(singleSchema),
  (req, res) => {
    res.status(200).json({ message: 'Passed middleware', data: req.body })
  }
)

serverTest.post(
  '/test/body/extra/create',
  ValidateSchema.validate(doubleSchema),
  (req, res) => {
    res.status(200).json({ message: 'Passed middleware', data: req.body })
  }
)
serverTest.post(
  '/test/body/three/create',
  ValidateSchema.validate(threeSchema),
  (req, res) => {
    res.status(200).json({ message: 'Passed middleware', data: req.body })
  }
)


serverTest.use((err, req, res, next) => {
  const status = err.status || 500
  const message = err.message || err.stack
  res.status(status).json(message)
})

export default serverTest
