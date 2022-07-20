const express = require('express');
const home_controller = require('../controllers/home_controller');
const router = express.Router();

console.log('*** router loaded ***');

router.get('/', home_controller.home);
router.use('/users', require('./users'));

module.exports = router;