const express = require('express');
const router = express.Router();
const user_api = require('../../../controllers/api/v1/users_api');

router.post('/create-session', user_api.create_session);

module.exports = router;