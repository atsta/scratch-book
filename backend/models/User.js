const mongoose = require('mongoose');

const user_schema = new mongoose.Schema({
    name: {
        type: String, 
        required: true, 
        max: 255, 
        min: 6
    },
    email: {
        type: String, 
        required: true, 
        max: 255, 
        min: 6 
    }, 
    password: {
        type: String, 
        required: true, 
        max: 1024, 
        min: 6
    }, 
    owned: {
        type : Array,
        default: []
    }, 
    followed: {
        type : Array,
        default: []
    }, 
    shared_with: {
        type : Array,
        default: []
    }
});

module.exports = mongoose.model('User', user_schema);