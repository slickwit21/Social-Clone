const mongoose = require('mongoose');
const Schema = mongoose.Schema

const likesSchema = new Schema({
  username: {
    type:String,
    required:true
  },
  user:{
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
    required: true,
  }
})

module.exports = mongoose.model('Like', likesSchema)