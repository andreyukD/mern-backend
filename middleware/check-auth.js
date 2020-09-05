const jwt = require("jsonwebtoken");
const HttpError = require("../models/http-error");
const { JWT_SECRET } = require("../d-priv/d-data");

module.exports = (req, res, next) => {
  console.log(req.method);
  if (req.method === "OPTIONS") {
    return next(); // browser blocks request, for ex. post request newplace.js
  }
  try {
    const token = req.headers.authorization.split(" ")[1]; // Authorization: 'Bearer TOKEN'
    if (!token) {
      throw new HttpError("Authentication failed!");
    }
    const decodedToken = jwt.verify(token, JWT_SECRET);
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (err) {
    const error = new HttpError("Authentication failed!", 404);
    return next(error);
  }
};
