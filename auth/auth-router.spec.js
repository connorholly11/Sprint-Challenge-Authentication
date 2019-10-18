const request = require("supertest");
const server = require("../api/server");
const Users = require("./auth-router-model");
const db = require("../database/dbConfig");

// describe("auth-router endpoints", () => {
//   it("should return a 200 status code", async () => {
//     const response = await request(server).get("/api/auth/users");
//   });
// });

// describe('login', () => {

//     it('passes with correct credentials', async () => {
//         const response = await request(server).post('/api/auth/login')
//         .expect(200)
//         expect(res.body.user)
//     })
// })

describe("testing methods for all endpoints", () => {
  beforeEach(async () => {
    await db("users").truncate();
  });
  //registering
  it("should add a new user", async () => {
    let records = await db("users");
    expect(records).toHaveLength(0);
    await Users.addUser({ username: "a", password: "a" });
    records = await db("users");
    expect(records).toHaveLength(1);
  });
  //WORKS

  //   it("should not allow a duplicate username", async () => {
  //     let records = await db("users");
  //     await Users.addUser({ username: "a", password: "a" });
  //     records = await db("users");
  //     expect(records).toHaveLength(1);
  //     await Users.addUser({ username: "a", password: "a" });
  //     //should throw error
  //   });

  //   login
  it("should update new users", async () => {
    let records = await db("users");
    const user1 = await Users.addUser({ username: "a", password: "a" });
    records = await db("users");
    const user2 = await Users.addUser({ username: "b", password: "b" });
    records = await db("users");
    expect(records).toHaveLength(2);
  });

  //get users
  it("should get users", async () => {
    let records = await db("users");
    await Users.addUser({ username: "a", password: "a" });
    await Users.addUser({ username: "b", password: "b" });
    records = await db("users");
    Allusers = await Users.getUsers();
    expect(Allusers).toHaveLength(2);
  });

  it("should bring specfic username", async () => {
    let records = await db("users");
    await Users.addUser({ username: "a", password: "a" });
    records = await db("users");
    Allusers = await Users.getUsers();
    console.log(Allusers);
  });

  //make sure all endpoints are getting reached by server
  it("should get back 200 request from server", () => {
    return request(server)
      .get("/")
      .then(res => {
        expect(res.status).toBe(200);
      });
  });
});
