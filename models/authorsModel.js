const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const authorSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    age: {
        type: Number,
        default: 55
    }
});

module.exports = mongoose.model("authorData",authorSchema);
