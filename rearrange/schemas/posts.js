const mongoose = require("mongoose");

const { Schema } = mongoose;
const postsSchema = new Schema({
    postsId: {
        type: Number,
        required: true,
        unique: true
    },
    title: {
        type: String,
    },
    author: {
        type: String
    },
    comment: {
        type: String
    }
});

module.exports = mongoose.model("Posts", postsSchema);