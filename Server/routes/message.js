const router = require('express').Router();
const Message = require('../models/Message');

// new message
router.post("/", async (req, res) => {
    try {
        if (!req.body) return res.status(400).json("TextBox is empty");
        const newMessage = new Message(req.body);
        const saveMessage = await newMessage.save();
        if (!saveMessage) return res.status(403).json("Some problem to store message, please try again");
        return res.status(200).json(saveMessage);
    }
    catch (error) {
        return res.status(500).json(error);
    }
})
// get message of a user
router.get("/:conversationId", async (req, res) => {
    try {
        const messages = await Message.find({
            conversationId: req.params.conversationId
        })
        if (!messages) return res.status(400).json("Message Not Found");
        return res.status(200).json(messages);
    }
    catch (error) {
        return res.status(500).json(error);
    }
})

module.exports = router;