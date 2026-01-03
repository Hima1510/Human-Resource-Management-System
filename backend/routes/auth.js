const express = require("express");
const {
  signup,
  login,
  verifyEmail
} = require("../controllers/authController");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/verify-email", verifyEmail);

module.exports = router;
