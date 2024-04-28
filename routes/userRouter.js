const { Router } = require("express");
const Usermodel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


const userRouter = Router();


userRouter.post("/register", async (req, res) => {
    const { username, email, password } = req.body;
    try {
        bcrypt.hash(password, 5, async (err, hash) => {
            if (err) {
                res.status(400).json({ message: "error hashing password" })
            }
            else {
                let user = new Usermodel({
                    username,
                    email,
                    password: hash
                })
                await user.save();
                res.status(200).json({ message: "user registered successfully" })
            }
        });

    } catch (error) {
        res.status(400).json({ message: "error while registering" })
    }

})


userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    let user = await Usermodel.findOne({ email })
    try {
        if (user) {
            bcrypt.compare(password, user.password, function (err, result) {
                if (result) {
                    let token = jwt.sign({ userid: user._id, username: user.username }, process.env.SECRET_KEY);
                    res.status(200).json({ message: "user login successfully", token })
                }
                else {
                    res.status(400).json({ message: "wrong password" })
                }

            });

        }
        else {
            res.status(400).json({ message: "user not found" })
        }

    } catch (error) {
        res.status(400).json({ message: "error while login" })
    }

})

module.exports = userRouter