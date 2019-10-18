const db = require("../database/dbConfig");

module.exports = {
  getUsers,
  addUser,
  findBy
};

function getUsers() {
  return db("users");
}

// function addUser(newUser) {
//   const [id] = db("users").insert(newUser);

//   return db("users")
//     .where({ id })
//     .first();
// }

function addUser(newUser) {
  return db("users").insert(newUser);
}

function findBy(username) {
  return db("users").where(username);
}
