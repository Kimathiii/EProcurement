const express = require("express");
const { signUp, signIn, authenticate } = require("../controllers/users");

const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.get("/profile", authenticate, (req, res) => {
	res.json(req.user);
});

module.exports = router;
