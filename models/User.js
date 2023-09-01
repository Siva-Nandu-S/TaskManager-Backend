const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: 'string',
        required: true
    },
    email: {
        type: 'string',
        required: true,
        
    },
    password: {
        type: 'string',
        required: true
    }
});

const User = mongoose.model('user', userSchema);

module.exports = User;