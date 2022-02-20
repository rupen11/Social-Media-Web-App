const mongoose = require('mongoose');

const MessageSchmea = new mongoose.Schema(
    {
        conversationId: {
            type: String,
        },
        sender: {
            type: String,
        },
        text: {
            type: String
        },
    },
    { timestamps: true }
);

const Message = new mongoose.model("Message", MessageSchmea);
module.exports = Message;