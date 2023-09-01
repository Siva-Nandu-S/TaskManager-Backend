const mongoose = require('mongoose');

const doneSchema = new mongoose.Schema({
    title: {
        type: 'string',
        required: true
    },
    description: {
        type: 'string'
    },
    email: {
      type: "string",
      required: true,
    },
});

const Done = mongoose.model('done', doneSchema);

module.exports = Done;