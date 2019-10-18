const secrets = require("../database/secrets.config");
const jwt = require("jsonwebtoken");

module.exports = {
  GenerateToken
};

function GenerateToken(user) {
  payload = {
    sub: user.id,
    username: user.username
  };
  options = {
    expiresIn: "1h"
  };
  return jwt.sign(payload, secrets.jwtSecret, options);
}
