const express = require('express')
const router = express.Router()
const controller = require('../controllers/league.controller')
const model = require('../models/league.model')

router.post('/create-league', controller.create)
router.get('/view-all/league', controller.getAll)


// router.param('leagueId', async (req, res, next, leagueId) => {
//     try {
//         const slots = await model.leagueSlots(leagueId)
//         req.slots = slots
//         next()
//     } catch(e) {
//         console.log(e)
//         res.sendStatus(404)
//     }
// })
router.get('/view-league/:leagueId', controller.get)



module.exports = router
