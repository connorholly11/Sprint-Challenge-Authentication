const express = require("express");
const bcrypt = require("bcryptjs");
const db = require("./auth-router-model");
const mw = require("./authenticate-middleware");
const secrets = require("../database/secrets.config");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/register", (req, res) => {
  const user = req.body;

  const hash = bcrypt.hashSync(user.password, 8);

  user.password = hash;

  if (user.username && user.password) {
    db.addUser(user)
      .then(user => {
        res.status(200).json({
          user: user,
          message: "You have registered!"
        });
      })
      .catch(error => {
        res.status(500).json({
          error: error,
          message: "there was 500 error registering"
        });
      });
  } else {
    res.status(401).json({ message: "enter username and password" });
  }
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username && password) {
    db.findBy({ username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          const token = generateToken(user);

          res.status(200).json({
            token,
            message: "you are logged in!"
          });
        } else {
          res.status(401).json({ message: "invalid credentials" });
        }
      })
      .catch(error => {
        res.status(500).json({
          error: error,
          message: "there was 500 error logging in!"
        });
      });
  } else {
    res.status(401).json({ message: "invalid username and/or password" });
  }
});

router.get("/users", mw.restricted, (req, res) => {
  db.getUsers()
    .then(users => {
      res.status(200).json({
        //THESE ARE COMING FROM THE RESTRICTED MIDDLEWARE
        loggedInUser: req.user.username,
        password: req.user.password,
        users: users,
        message: "here are all the users!"
      });
    })
    .catch(error => {
      res.status(500).json({
        error: error,
        message: "there was 500 error getting users"
      });
    });
});

//generate token function
function generateToken(user) {
  payload = {
    sub: user.id,
    username: user.username
  };
  options = {
    expiresIn: "1h"
  };
  return jwt.sign(payload, secrets.jwtSecret, options);
}

module.exports = router;
