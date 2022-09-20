const mocha = require("mocha");
const { expect } = require("chai");

// const getMongoClient = require("../../src/db/mongo.db");
const {
  getUsers,
  insertUser,
} = require("../../src/controller/user.controller");

describe("testing", () => {
  //   let mongoClient;

  before(async () => {
    // mongoClient = await getMongoClient();
  });

  it("inserts user", async () => {
    const response = await insertUser({
      firstName: "Bobu",
      lastName: "Puth",
      email: "bobu.puth@gmail.com",
    });
    // console.dir(response);
  });

  it("get User", async () => {
    const response = await getUsers();
    expect(response).to.have.lengthOf(1);
    console.dir(response);
  });
});
