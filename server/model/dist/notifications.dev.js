"use strict";

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var notificationsSchema = new Schema({
  recipient: {
    type: String,
    required: true
  },
  sender: {
    type: String,
    required: true
  },
  read: {
    type: Boolean,
    "default": false
  },
  type: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String
  },
  postId: {
    type: Schema.Types.ObjectId,
    ref: "Post",
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  senderId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});
module.exports = mongoose.model('Notification', notificationsSchema);