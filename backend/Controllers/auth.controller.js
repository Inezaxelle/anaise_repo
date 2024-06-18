const db = require("../models/index");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication endpoints
 */

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Registration successful
 *       400:
 *         description: Email is already associated with an account
 *       500:
 *         description: Error in registering user
 */
const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Check if the email already exists
    const userExists = await db.Student.findOne({
      where: { email },
    });
    if (userExists) {
      return res
        .status(400)
        .json({ error: "Email is already associated with an account" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    await db.Student.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    return res.status(200).json({ message: "Registration successful" });
  } catch (error) {
    console.error("Error in registering user:", error);
    return res.status(500).json({ error: "Error in registering user" });
  }
};
/**
 * @swagger
 * /signin:
 *   post:
 *     summary: Sign in a user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User authenticated successfully
 *       401:
 *         description: Incorrect email and password combination
 *       404:
 *         description: Email not found
 *       500:
 *         description: Sign-in error
 */
const signInUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await db.Student.findOne({
      where: { email },
    });

    // If user does not exist
    if (!user) {
      return res.status(404).json({ error: "Email not found" });
    }

    // Compare passwords
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      return res
        .status(401)
        .json({ error: "Incorrect email and password combination" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION,
    });

    console.log("Token:", token);

    // Send response with user data and token
    return res.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email,
      accessToken: token,
    }); 
  } catch (error) {
    // Log any sign-in error
    console.error("Sign-in error:", error);
    return res.status(500).json({ error: "Sign-in error" });
  }
};

module.exports = { registerUser, signInUser };