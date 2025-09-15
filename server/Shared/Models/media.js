import mongoose from 'mongoose'
import { applyBaseSchema } from './baseSchemaMixin.js'

const mediaSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['photo', 'video'],
    required: true
  },
  order:{
  type: Number,
  required: true
  },
  title: {
    type: String
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})
applyBaseSchema(mediaSchema)

const Media = mongoose.model('Media', mediaSchema)

export default Media
