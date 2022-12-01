const League = require("../models/league.model.js")

// create and save a new league
exports.create = async (req, res, next) => {
    try {
        const league = new League(req.body);
        const resultElements = await League.create(league);
        res.status(200).json({
            success: true,
            message: "A new league has been added successfully.",
            data: resultElements,
        });
    } catch(e) {
        console.log(e);
        return res.status(500).json({
            success: false,
            message: (e.code == 'ER_DUP_ENTRY' || e.errno == 1062) ? "The league name has already been taken." : "An error occurred in the server."
        });
    }
}

// retrieve a league with its slots
// exports.getLeagueSlots = async (req, res, next) => {
//     res.status(200).json({ slots: req.slots });
// }

// get a specific league
exports.get = async (req, res, next) => {
    try {
        const resultElements = await League.get(req.params.leagueId);
        res.status(200).json({
            success: true,
            message: "League has been retrieved successfully.",
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

exports.getAll = async (req, res, next) => {
    try {
        const resultElements = await League.getAll();
        res.status(200).json({
            success: true,
            message: "All leagues have been retrieved successfully.",
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
