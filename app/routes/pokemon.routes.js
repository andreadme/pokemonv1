const express = require('express')
const router = express.Router()
const controller = require('../controllers/pokemon.controller')
const model = require('../models/pokemon.model')

router.post('/create-pokemon', controller.create)
router.get('/view-all/pokemon', controller.getAll)
router.get('/view-pokemon/:id', controller.get)

// router.param('trainerId', async (req, res, next, trainerId)=> {
//     try {
//         const pokemons = await model.trainerPokemons(req.body.trainerId);
//         req.pokemons = pokemons;
//         next(); // go to router.get('/view-pokemons/trainer/:trainerId')
//     } catch(e) {
//         console.log(e);
//         res.sendStatus(404);
//     }
// });
router.get('/view-pokemons/trainer/:trainerId', controller.getTrainerPokemons)

module.exports = router
