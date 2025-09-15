import mongoose from 'mongoose'
import { applyBaseSchema } from './baseSchemaMixin.js'

const backSchema= new mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  title: {
    type: String
  },
  countryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})
applyBaseSchema(backSchema)

const Background = mongoose.model('Background', backSchema)

export default Background
