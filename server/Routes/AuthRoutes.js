const { signup, signin } = require("../Controllers/AuthControllers");

const router = require("express").Router();

router.post("/dashboard");
router.post("/signup", signup);
router.post("/signin", signin);

module.exports = router;
