import {Schema , model} from "mongoose";

const Schemas = new Schema ({
  title: {
    type: String,
    required: true,
    lowercase: true
  },
  description: {
    type: String,
    required: true,
    lowercase: true
  }
})

export default model("Task", Schemas)
