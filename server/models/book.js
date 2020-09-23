const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bookSchema = new Schema({
  name: {type: String, required: true},
  genre: {type: String, required: true},
  author: {type: Schema.Types.ObjectID, ref: 'Author', required: true},
})
module.exports = mongoose.model('Book', bookSchema)
