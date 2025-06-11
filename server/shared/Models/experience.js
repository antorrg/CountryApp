import mongoose from'mongoose';
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
    createdAt: Date
  }],
  isPublic: { 
    type: Boolean, 
    default: true },
  createdAt: { 
    type: Date, 
    default: Date.now },
  updatedAt: { 
    type: Date, 
    default: Date.now }
});
applyBaseSchema(experienceSchema)

const Experience = mongoose.model('Experience', experienceSchema);

export default Experience