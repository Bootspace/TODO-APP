const mongoose = require('mongoose');
const User = require('./user_model');
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: User
    },

    title: {
        type: String,
        required: true
    },

    body: {
      type: String,
      required: true
  },
});

module.exports = mongoose.model('Todo', TodoSchema);
