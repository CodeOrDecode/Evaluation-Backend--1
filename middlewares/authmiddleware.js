const jwt = require("jsonwebtoken");


const authmiddleware = (req, res, next) => {
    let token = req.headers.authorization?.split(" ")[1];
    if (token) {
        jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
            console.log(decoded);
            req.body.userid = decoded.userid;
            req.body.username = decoded.username;
            next();
        });
    }
    else {
        res.status(400).json({ message: "token not found" });
    }

}

module.exports = authmiddleware