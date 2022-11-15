const jwt = require("jsonwebtoken");

function authen(req, res, next) {
  if (!req.headers["authorization"]) {
    return res.status(400).send("Access Denied. Authorization header is required!");
  }

  const token = req.headers["authorization"].split(" ")[1];
  if (!token) {
    return res.status(400).send("Access Denied. Check your Authorization header format! (Bearer token)");
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send(JSON.stringify(err));
  }
}

function author(roles) {
  return function (req, res, next) {
    if (!roles.includes(req.user.role)) return res.status(403).send("Forbidden!");
    next();
  };
}

module.exports = { authen, author };
