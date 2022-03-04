import mongoose from "mongoose";

const Schema = mongoose.Schema

const lakeSchema = new Schema({
  name: String,
  city: String,
  state: String,
  public: Boolean,
  acres: Number,
  owner: {type: Schema.Types.ObjectId, ref: "Profile"}
})

const Lake = mongoose.model('Lake', lakeSchema)

export {
  Lake
}