const jwt = require("jsonwebtoken");
const db = require("../models/index");

const authMiddleware = async (req, res, next) => {
  // Split the token to get out the bearer part
  if (!req.headers.authorization) return res.status(401).send("No token found")
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    res.status(401).send("No token found");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = db.Student.findByPk(decoded.id);

    if (!user) {
      res.status(404).send("No user found");
    }

    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.status(404).send("Invalid or Expired Token");
  }
};

module.exports = authMiddleware;