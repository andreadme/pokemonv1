const Trainer = require("../models/trainer.model.js")
const bcrypt = require("bcrypt")

// create and save a new trainer
exports.register = async (req, res, next) => {
    try {
        const trainer = new Trainer({
            'fullName': req.body.fullName,
            'username': req.body.username,
            'email': req.body.email,
            'password': await bcrypt.hash(req.body.password, 10),
        });
        const resultElements = await Trainer.register(trainer);
        res.status(200).json({
            success: true,
            message: "A new trainer has been added successfully.",
            data: resultElements,
        });
    } catch(e) {
        console.log(e);
        return res.status(500).json({
            success: false,
            message: (e.code == 'ER_DUP_ENTRY' || e.errno == 1062) ? "The trainer username and/or email has already been taken." : "An error occurred in the server."
        });
    }
}

exports.login = async (req, res, next) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        const resultElements = await Trainer.login(username);

        console.log(resultElements)
        if (resultElements.length === 0) {
            res.status(404).json({
                success: true,
                message: "User does not exists.",
                data: resultElements,
            });
        } else {
            const hashedPassword = resultElements[0].password
            if (await bcrypt.compare(password, hashedPassword)) {
                res.status(200).json({
                    success: true,
                    message: "The user has logged in.",
                    data: resultElements,
                });
            } else {
                res.status(404).json({
                    success: true,
                    message: "Your username and password does not match.",
                    data: resultElements,
                });
            }
        }
    } catch(e) {
        console.log(e);
        return res.status(500).json({
            success: false,
            message: "An error occurred in the server."
        });
    }
}

exports.getAll = async (req, res, next) => {
    try {
        const resultElements = await Trainer.getAll();
        res.status(200).json({
            success: true,
            message: "All trainers have been retrieved successfully.",
            data: resultElements,
        });
    } catch(e) {
        console.log(e);
        return res.status(500).json({
            success: false,
            message: "An error occurred in the server."
        });
    }
}

