import mongoose from 'mongoose'

const Schema = mongoose.Schema

const personalBestSchema = new Schema ({
  name: {
    type: String,
  },
  weight: {
    type: Number,
    min:0,
    max:100
  }
}, {
  timestamps: true
})

const profileSchema = new mongoose.Schema({
  name: String,
  avatar: String,
  pisces: [{type: Schema.Types.ObjectId, ref: 'Fish'}],
  lagoon: [{type: Schema.Types.ObjectId, ref: 'Lake'}],
  pbs: [personalBestSchema],
}, {
  timestamps: true
}
)

const Profile = mongoose.model('Profile', profileSchema)

export {
  Profile
}
