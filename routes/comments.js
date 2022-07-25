const express = require('express');
const router = express.Router();
const comment_controller = require('../controllers/comment_controller');
const passport = require('passport');

router.post('/create',passport.check_authentication, comment_controller.create);

module.exports = router;