const express = require("express");
const router = express.Router();
const { registerUser, signInUser } = require("../Controllers/auth.controller");
const {
  createBook,
  getAllBooks,
} = require("../Controllers/book.controller");
const verifyToken = require("../Middleware/auth.middleware");
const { verify } = require("jsonwebtoken");

router.post("/signup", registerUser);
router.post("/signin", signInUser);
router.post("/books", createBook);
router.get("/books", verifyToken, getAllBooks);

module.exports = router;
