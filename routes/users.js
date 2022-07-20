const { request } = require('express');
const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/user_controller');

router.get('/', function(req, res){
    return res.end('<h1> Users </h1>');
});
router.get('/profile', user_controller.profile);

module.exports = router;