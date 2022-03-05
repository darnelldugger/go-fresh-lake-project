import mongoose from "mongoose";

const Schema = mongoose.Schema

const lakeSchema = new Schema({
  name: String,
  state: String,
  public: String,
  acres: Number,
  owner: {type: Schema.Types.ObjectId, ref: "Profile"}
})

const Lake = mongoose.model('Lake', lakeSchema)

export {
  Lake
}