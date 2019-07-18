const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/radio99', { useNewUrlParser: true });
mongoose.Promise = global.Promise;

module.exports = mongoose;