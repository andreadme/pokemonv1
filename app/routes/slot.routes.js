const express = require('express')
const router = express.Router()
const controller = require('../controllers/slot.controller')
const model = require('../models/slot.model')

router.post('/create-slot', controller.create)

router.param('trainerId', async (req, res, next, trainerId)=> {
    try{
        const slots = await model.trainerSlots(trainerId);
        req.slots = slots;
        next(); // go to router.get('/view-pokemons/trainer/:trainerId')
    } catch(e) {
        console.log(e);
        res.sendStatus(404);
    }
});
router.get('/view-slots/trainer/:trainerId', controller.getTrainerSlots)

module.exports = router
