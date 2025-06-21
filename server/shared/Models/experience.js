import mongoose from 'mongoose'
import { applyBaseSchema } from './baseSchemaMixin.js'

const experienceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    countryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Country',
      required: true
    },
    title: {
      type: String,
      required: true,
      maxLength: 100
    },
    description: {
      type: String,
      required: true,
      maxLength: 2000
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true
    },
    visitDate: {
      type: Date,
      required: true
    },
    media: {
      photos: [String],
      videos: [String]
    },
    tags: [String],
    category: {
      type: String,
      enum: ['adventure', 'cultural', 'gastronomic', 'family', 'business', 'romantic']
    },
    budget: {
      type: String,
      enum: ['low', 'medium', 'high', 'luxury']
    },
    reactions: {
      likes: [{
        userId: mongoose.Schema.Types.ObjectId,
        createdAt: Date }],
      dislikes: [{
        userId: mongoose.Schema.Types.ObjectId,
        createdAt: Date }],
      likesCount: {
        type: Number,
        default: 0
      },
      dislikesCount: {
        type: Number,
        default: 0
      },
      netScore: {
        type: Number,
        default: 0
      }
    },
    comments: [{
      userId: mongoose.Schema.Types.ObjectId,
      text: String,
      createdAt: Date,
      isReported: { type: Boolean, default: false },
      reportCount: { type: Number, default: 0 },
      reports: [{
        userId: mongoose.Schema.Types.ObjectId,
        reason: String,
        reportedAt: Date
      }]
    }],
    // Configuración de privacidad
    visibility: {
      type: String,
      enum: ['public', 'friends', 'private'],
      default: 'public'
    },

    // Moderación
    isReported: { Boolean, default: false },
    reportCount: { Number, default: 0 },
    isModerated: { Boolean, default: false },

    isPublic: {
      type: Boolean,
      default: true },
    createdAt: {
      type: Date,
      default: Date.now },
    updatedAt: {
      type: Date,
      default: Date.now }
  })
applyBaseSchema(experienceSchema)
experienceSchema.index({ countryId: 1, createdAt: -1 }) // Para buscar experiencias por país y fecha
experienceSchema.index({ userId: 1, createdAt: -1 })    // Para buscar experiencias por usuario y fecha
experienceSchema.index({ title: 'text', description: 'text', tags: 'text' }) // Para búsquedas por texto

const Experience = mongoose.model('Experience', experienceSchema)

export default Experience
