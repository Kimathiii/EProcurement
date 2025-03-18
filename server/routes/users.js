const express = require("express");
const { signUp, signIn, getUser } = require("../controllers/users");

const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.get("/:id", getUser);

module.exports = router;
