const Pokemon = require("../models/pokemon.model.js");

// Create and Save a new Pokemon
exports.create = async (req, res, next) => {
    try {
        const pokemon = new Pokemon(req.body);
        const resultElements = await Pokemon.create(pokemon);
        res.status(200).json({
            success: true,
            message: "A new pokemon has been added successfully.",
            data: resultElements,
        });
    } catch(e) {
        return res.status(500).json({
            success: false,
            message: (e.code == 'ER_DUP_ENTRY' || e.errno == 1062) ? "The pokemon name has already been taken." : "An error occurred in the server."
        });
    }
}

exports.get = async (req, res, next) => {
    try {
        const resultElements = await Pokemon.get(req.params.id);
        res.status(200).json({
            success: true,
            message: "The pokemon has been retrieved successfully.",
            data: resultElements,
        });
    } catch(e) {
        return res.status(500).json({
            success: false,
            message: "An error occurred in the server."
        });
    }
}

exports.getAll = async (req, res, next) => {
    try {
        const resultElements = await Pokemon.getAll();
        res.status(200).json({
            success: true,
            message: "All pokemons have been retrieved successfully.",
            data: resultElements,
        });
    } catch(e) {
        return res.status(500).json({
            success: false,
            message: "An error occurred in the server."
        });
    }
}

// retrieve a league with its slots
exports.getTrainerPokemons = async (req, res, next) => {
    try {
        const resultElements = await Pokemon.trainerPokemons(req.params.trainerId);
        res.status(200).json({
            success: true,
            message: "All pokemons have been retrieved successfully.",
            data: resultElements,
        });
    } catch(e) {
        return res.status(500).json({
            success: false,
            message: "An error occurred in the server."
        });
    }
}


