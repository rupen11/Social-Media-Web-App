const router = require('express').Router();
const bcrypt = require('bcrypt');
const authentication = require('../middleware/authentication');
const User = require('../models/User');

// UPDATE USER
router.put("/:id", async (req, res) => {
    try {
        if (req.body.userId === req.params.id || req.body.isAdmin) {
            if (req.body.password) {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            }
            const user = await User.findByIdAndUpdate({ _id: req.params.id }, { $set: req.body });
            if (!user) return res.status(400).json("Account not updated,Something went wrong");
            return res.status(200).json("Account has been updated");
        }
        else {
            return res.status(403).json("You can update only your account");
        }
    }
    catch (error) {
        return res.status(500).json(error);
    }
})
// DELETE USER
router.delete("/:id", async (req, res) => {
    try {
        if (req.body.userId === req.params.id || req.body.isAdmin) {
            const user = await User.findByIdAndDelete(req.params.id);
            if (!user) return res.status(400).json("Account not found");
            return res.status(200).json("Account has been deleted");
        }
        else {
            return res.status(403).json("You can delete only your account");
        }
    }
    catch (error) {
        // console.log(error);
        return res.status(500).json(error);
    }
})
// GET A USER
router.get("/", async (req, res) => {
    const userId = req.query.userId;
    const username = req.query.username;
    try {
        const user = userId
            ? await User.findById(userId)
            : await User.findOne({ username: username })
        if (!user) return res.status(400).json("We are getting some error to fetch your data")
        return res.status(200).json(user);
    }
    catch (error) {
        return res.status(500).json(error);
    }
})
// GET A USER BY TOKEN
router.get("/fetchUser/:token", authentication, async (req, res) => {
    console.log("Ok");
    try {
        const user = await User.findById(req.userId);
        if (!user) return res.status(400).json("We are getting some error to fetch your data by token");
        return res.status(200).json(user);
    }
    catch (error) {
        return res.status(500).json(error);
    }
})
// GET FRIENDS
router.get("/friends/:userId", async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) return res.status(404).json("User Not Found");
        const friends = await Promise.all(
            user.followings.map(friendId => {
                return User.findById(friendId, { _id: 1, username: 1, profilePicture: 1 });
            })
        )
        return res.status(200).json(friends);
    }
    catch (error) {
        return res.status(500).json(error);
    }
})
// FOLLOW USER
router.put("/:id/follow", async (req, res) => {
    try {
        if (req.body.userId !== req.params.id) {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);

            if (!user) return res.status(404).json("User not found");
            if (!currentUser) return res.status(404).json("Your account not found");

            if (!user.followers.includes(req.body.userId)) {
                const followerUpdate = await user.updateOne({ $push: { followers: req.body.userId } });
                const followingUpdate = await currentUser.updateOne({ $push: { followings: req.params.id } });

                if (!followerUpdate || !followingUpdate) return res.status(403).json("Some thing went wrong");
                return res.status(200).json("User has been followed");
            }
            else {
                return res.status(403).json("You already follow this user");
            }
        }
        else {
            return res.status(403).json("You can't follow yourself");
        }
    }
    catch (error) {
        return res.status(500).json(error);
    }
})
// UNFOLLOW USER
router.put("/:id/unfollow", async (req, res) => {
    try {
        if (req.body.userId !== req.params.id) {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);

            if (!user) return res.status(404).json("User not found");
            if (!currentUser) return res.status(404).json("Your account not found");

            if (user.followers.includes(req.body.userId)) {
                const followerUpdate = await user.updateOne({ $pull: { followers: req.body.userId } });
                const followingUpdate = await currentUser.updateOne({ $pull: { followings: req.params.id } });

                if (!followerUpdate || !followingUpdate) return res.status(403).json("Something went wrong");
                return res.status(200).json("User has been unfollowed");
            }
            else {
                return res.status(403).json("You don't follow this user");
            }
        }
        else {
            return res.status(403).json("You can't unfollow yourself");
        }
    }
    catch (error) {
        // console.log(error);
        return res.status(500).send(error);
    }
})

module.exports = router;