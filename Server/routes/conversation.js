const router = require('express').Router();
const Conversation = require('../models/Conversation');

// new conversation
router.post("/", async (req, res) => {
    try {
        const newConversation = new Conversation({
            members: [req.body.senderId, req.body.receiverId],
        });

        const saveConversation = await newConversation.save();
        if (!saveConversation) return res.status(403).json("Some error to store conversation");
        return res.status(200).json(saveConversation);
    }
    catch (error) {
        return res.status(500).json(error);
    }
})
// get conversation of a user
router.get("/:userId", async (req, res) => {
    try {
        const conversation = await Conversation.find({
            members: { $in: [req.params.userId] },
        });
        if (!conversation) return res.status(403).json("We are getting some problem to fetch user conversation");
        return res.status(200).json(conversation);
    } catch (error) {
        return res.status(500).json(error);
    }
})
// get conversation includes two userId
router.get("/find/:firstUserId/:secondUserId", async (req, res) => {
    try {
        const conversation = await Conversation.findOne({
            members: { $all: [req.params.firstUserId, req.params.secondUserId] },
        });
        if (!conversation) return res.status(403).json("We are getting some problem to fetch user conversation between two params id");
        return res.status(200).json(conversation);
    } catch (error) {
        return res.status(500).json(error);
    }
})

module.exports = router;