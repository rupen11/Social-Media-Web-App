const mongoose = require('mongoose');

const ConversationSchmea = new mongoose.Schema(
    {
        members: {
            type: Array,
        }
    },
    { timestamps: true }
);

const Conversation = new mongoose.model("Conversation", ConversationSchmea);
module.exports = Conversation;