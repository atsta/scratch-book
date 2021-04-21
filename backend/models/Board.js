const mongoose = require('mongoose');

const board_schema = new mongoose.Schema({
    title: {
        type: String, 
        required: true, 
        max: 255, 
        min: 6
    },
    is_public: {
        type: Boolean, 
        required: true, 
        default: false
    }, 
    webpages: {
        type : Array,
        default: []
    }, 
    ratings: {
        type : Array,
        default: []
    }
});

module.exports = mongoose.model('Board', board_schema);