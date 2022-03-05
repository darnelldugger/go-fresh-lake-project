import mongoose from 'mongoose'

const Schema = mongoose.Schema

const profileSchema = new mongoose.Schema({
  name: String,
  avatar: String,
  pisces: [{type: Schema.Types.ObjectId, ref: 'Fish'}],
  lagoon: [{type: Schema.Types.ObjectId, ref: 'Lake'}]
}, {
  timestamps: true
}
)

const Profile = mongoose.model('Profile', profileSchema)

export {
  Profile
}
