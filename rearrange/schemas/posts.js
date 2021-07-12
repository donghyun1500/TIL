const mongoose = require("mongoose");

const { Schema } = mongoose;
const postsSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    comment: {
        type: String, 
        required: true,
    },
    createdAt: {
        type:Date,
        default: Date.now,
    }
});

module.exports = mongoose.model("Posts", postsSchema);