const express = require("express");
const { signup, signin } = require("../controllers/authControllers");
// const requireAuth = require("../middlewares/requireAuth");

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);

// router.use(requireAuth);

module.exports = router;
