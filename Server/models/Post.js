const mongoose = require('mongoose');

const PostSchmea = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true
        },
        desc: {
            type: String,
            max: 500
        },
        img: {
            type: String
        },
        likes: {
            type: Array,
            deafult: []
        }
    },
    { timestamps: true }
);

const Post = new mongoose.model("Post", PostSchmea);
module.exports = Post;