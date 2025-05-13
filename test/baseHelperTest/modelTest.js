import mongoose from "mongoose";
import {applyBaseSchema} from '../../server/shared/Models/baseSchemaMixin.js'

const testSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    count: {
      type: Number,
      required: true,

    },
    picture: {
      type: String,
      required: true,
    },
    
  },
  {
    timestamps: true,
  }
);

applyBaseSchema(testSchema)

const Test = mongoose.model("Test", testSchema);

export default Test;
