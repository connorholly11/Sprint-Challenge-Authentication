const db = require("../database/dbConfig");

module.exports = {
  getUsers,
  getUsersById,
  addUser,
  findBy
};

function getUsers() {
  return db("users");
}

function getUsersById(id) {
  return db("users").where("id", "=", id);
}

// async function addUserTesting(newUser) {
//   const [id] = await db("users").insert(newUser);

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
