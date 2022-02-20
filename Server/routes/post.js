const router = require('express').Router();
const Post = require('../models/Post');
const User = require('../models/User');

// CREATE A POST
router.post("/", async (req, res) => {
    try {
        const newPost = new Post(req.body);

        const savePost = await newPost.save();

        if (!savePost) return res.status(403).json("Post not saved");
        return res.status(200).json(savePost);
    }
    catch (error) {
        return res.status(500).json(error);
    }
})
// UPDATE A POST
router.put("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) return res.status(404).json("Post not found");

        if (post.userId !== req.body.userId) return res.status(403).json("Access Denied for updating post");

        const updatePost = await post.updateOne({ $set: req.body });

        if (!updatePost) return res.status(403).json("Post not updated");
        return res.status(200).json("Post updated");
    }
    catch (error) {
        return res.status(500).json(error);
    }
})
// DELETE A POST
router.delete("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) return res.status(404).json("Post not found");

        if (post.userId !== req.body.userId) return res.status(403).json("Access Denied for deleting post");

        const deletePost = await post.deleteOne();
        if (!deletePost) return res.status(403).json("Post not deleted");
        return res.status(200).json("Post deleted");
    }
    catch (error) {
        return res.status(500).json(error);
    }
})
// LIKE A POST
router.put("/:id/like", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) return res.status(404).json("Post not found");

        if (!post.likes.includes(req.body.userId)) {
            const likePost = await post.updateOne({ $push: { likes: req.body.userId } });
            if (!likePost) return res.status(403).json("Like push to post");
            return res.status(200).json("The post has been Liked");
        }
        else {
            const dislikePost = await post.updateOne({ $pull: { likes: req.body.userId } });
            if (!dislikePost) return res.status(403).json("Like pull from post");
            return res.status(200).json("The post has been Dislike");
        }
    }
    catch (error) {
        return res.status(500).json(error);
    }
})
// GET A POST
router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json("Post not found");
        return res.status(200).json(post);
    }
    catch (error) {
        return res.status(500).json(error);
    }
})
// GET TIMELINE POSTS OF THE USER FOLLOWING
router.get("/timeline/:userId", async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) return res.status(403).json("User not found");

        const userPost = await Post.find({ userId: user._id });

        const friendsPost = await Promise.all(
            user.followings.map((friendId) => {
                return Post.find({ userId: friendId });
            })
        )

        return res.status(200).json(userPost.concat(...friendsPost));
    }
    catch (error) {
        // console.log(error);
        return res.status(500).json(error);
    }
})
// GET ONLY USER'S POSTS
router.get("/profile/:username", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });
        if (!user) return res.status(403).json("User Not Found");

        const posts = await Post.find({ userId: user._id });
        if (!posts) return res.status(403).json("We can't fecth user's posts");

        return res.status(200).json(posts);
    }
    catch (error) {
        // console.log(error);
        return res.status(500).json(error);
    }
})

module.exports = router;