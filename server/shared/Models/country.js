import mongoose from 'mongoose'
import { applyBaseSchema } from './baseSchemaMixin.js'

const countrySchema = new mongoose.Schema({}, { strict: false })

applyBaseSchema(countrySchema)

const Country = mongoose.model('Country', countrySchema)

export default Country
