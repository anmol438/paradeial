const { request } = require('express');
const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/user_controller');

router.get('/', function(req, res){
    return res.end('<h1> Users </h1>');
});
router.get('/profile', user_controller.profile);

router.get('/sign-in', user_controller.sign_in);
router.get('/sign-up', user_controller.sign_up);

module.exports = router;