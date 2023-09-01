const mongoose = require('mongoose');

const doingSchema = new mongoose.Schema({
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

const Doing = mongoose.model('doing', doingSchema);

module.exports = Doing;