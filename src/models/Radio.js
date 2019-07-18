const mongoose = require('../database');

const RadioSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
    unique: true,
    required: true,
  },
  city: {
    type: String
  },
  state: {
    type: String
  },
  streaming: {
    type: String,
    required: true,
  },
  logo: {
    type: String
  },
  facebook: {
    type: String
  },
  twitter: {
    type: String
  },
  instagram: {
    type: String
  },
  whatsapp: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Radio = mongoose.model('Radio', RadioSchema);
module.exports = Radio;
