const express = require('express');
const app = express();
const dotenv = require('dotenv')
const mongoose = require('mongoose');
const helmet = require('helmet');
const morgan = require('morgan');
const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');
const postRoute = require('./routes/post');
const conversationRoute = require('./routes/conversation');
const messageRoute = require('./routes/message');
const multer = require('multer');
const path = require('path');

dotenv.config();


mongoose.connect(process.env.DATABASE, (error) => {
    error ? console.log("Server not connect with database, Some issues occured " + error) : console.log("Server Connected with database");
});

app.use("/images", express.static(path.join(__dirname, "public/images")));

// Middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
})

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
    try {
        return res.status(200).json("File uploaded successfully");
    } catch (error) {
        return res.status(400).json(error);
    }
})

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);


app.listen(8800, () => {
    console.log("Server is running at http://localhost:8800");
})