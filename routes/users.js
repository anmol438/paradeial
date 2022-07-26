// const { request } = require("express");
const express = require("express");
const router = express.Router();
const user_controller = require("../controllers/user_controller");
const passport = require('passport');

router.get("/", function (req, res) {
  return res.end("<h1> Users </h1>");
});
router.get("/profile",passport.check_authentication, user_controller.profile);
router.post("/update",passport.check_authentication, user_controller.update);


router.get("/sign-in", user_controller.sign_in);
router.get("/sign-up", user_controller.sign_up);

router.post("/create", user_controller.create);

router.post("/create-session",passport.authenticate(
    'local',
    {
        failureRedirect:'/users/sign-in'
    }
), user_controller.create_session);

router.get("/sign-out", user_controller.destroy_session);

module.exports = router;
