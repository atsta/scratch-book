const mongoose = require('mongoose');

var webpage_schema = new mongoose.Schema({
    url: {
        type: String
    },
    comment: {
        type: String, 
        max: 500
    },
    html: {
        type: String
    }, 
    screenshot: {
        type: String
    }
});

const board_schema = new mongoose.Schema({
    title: {
        type: String, 
        required: true, 
        max: 255, 
        min: 6
    },
    comment: {
        type: String, 
        max: 500, 
        min: 0
    },
    is_public: {
        type: Boolean, 
        required: true, 
        default: false
    }, 
    webpages: [webpage_schema],
    ratings: {
        type : Array,
        default: []
    }
});

module.exports = mongoose.model('WebPage', webpage_schema);
module.exports = mongoose.model('Board', board_schema);