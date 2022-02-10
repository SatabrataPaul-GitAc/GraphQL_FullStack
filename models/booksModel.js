const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bookSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    genre: {
        type: String,
        default: ""
    },

    author_id: {
        type: String,
        required: true
    }

});

module.exports = mongoose.model("bookData",bookSchema);
