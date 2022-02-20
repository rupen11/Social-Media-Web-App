const jwt = require('jsonwebtoken');

const authentication = async (req, res, next) => {
    try {
        const token = req.params.token;
        console.log(token);
        if (!token) return res.status(401).json("Authenticate with valid user");
        const data = jwt.verify(token, process.env.JWT_SECRETKEY);
        req.userId = data.id;
        next();
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = authentication;