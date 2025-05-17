import mongoose from 'mongoose'
import {applyBaseSchema} from '../../server/shared/Models/baseSchemaMixin.js'

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    picture: {
      type: String,
      required: true,
    },
     name: {
      type: String,
      required: false,
    },
     surname: {
      type: String,
      required: false,
    },
     country: {
      type: String,
      required: false,
    },
    isVerify: {
    type: Boolean,
    default: false,
    required: true,
    },
    role: {
    type: Number,
    enum: [1, 2, 3, 9],
    default: 1,
    required: true,
   },
    
  },
    {
      timestamps: true,
    }
)

applyBaseSchema(userSchema)

const User = mongoose.model('User', userSchema)

export default User
