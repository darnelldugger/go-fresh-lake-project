import mongoose from "mongoose";

const Schema = mongoose.Schema

const reviewSchema = new Schema({
  content: String,
  
}, {
  timestamps: true
})

const lakeSchema = new Schema({
  name: String,
  state: String,
  public: String,
  acres: Number,
  owner: {type: Schema.Types.ObjectId, ref: "Profile"},
  pisces: [{type: Schema.Types.ObjectId, ref: 'Fish'}],
  reviews: [reviewSchema]
}, {
  timestamps: true
})


const Lake = mongoose.model('Lake', lakeSchema)

export {
  Lake
}