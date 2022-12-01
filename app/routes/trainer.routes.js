const express = require('express')
const router = express.Router()
const controller = require('../controllers/trainer.controller');

router.post('/register', controller.register);
router.post('/login', controller.login);
router.get('/view-all/trainer', controller.getAll)

module.exports = router
