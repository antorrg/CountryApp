import mongoose from 'mongoose'
import { applyBaseSchema } from './baseSchemaMixin.js'

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    nickname: {
      type: String,
      required: true
    },
    picture: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: false
    },
    surname: {
      type: String,
      required: false
    },
    country: {
      type: String,
      required: false
    },
    isVerify: {
      type: Boolean,
      default: false,
      required: true
    },
    role: {
      type: Number,
      enum: [1, 2, 3, 9],
      default: 1,
      required: true
    },
    isRoot: {
      type: Boolean,
      default: false,
      required: true
    }

  },
  {
    timestamps: true
  }
)

applyBaseSchema(userSchema)
//userSchema.index({ email: 1 }, { unique: true });
//userSchema.index({ nickname: 'text' });

const User = mongoose.model('User', userSchema)

export default User
