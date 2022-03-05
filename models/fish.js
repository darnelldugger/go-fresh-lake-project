import mongoose from "mongoose";

const Schema = mongoose.Schema

const fishSchema = new Schema({
  name: String
}, {
  timestamps: true
})

const Fish = mongoose.model('Fish', fishSchema)

export {
  Fish
}