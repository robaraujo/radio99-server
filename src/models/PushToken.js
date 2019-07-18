const mongoose = require('../database');

const PushTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Types.ObjectId,
  },
  invalid: {
    type: Boolean
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const PushToken = mongoose.model('PushToken', PushTokenSchema);
module.exports = PushToken;
