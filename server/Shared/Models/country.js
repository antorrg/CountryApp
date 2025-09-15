import mongoose from 'mongoose'
import { applyBaseSchema } from './baseSchemaMixin.js'

const countrySchema = new mongoose.Schema({}, { strict: false })

applyBaseSchema(countrySchema)
countrySchema.index({ code: 1 }, { unique: true })
countrySchema.index({ name: 'text', description: 'text' })

const Country = mongoose.model('Country', countrySchema)

export default Country
