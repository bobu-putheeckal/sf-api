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
    expect(response).to.have.property("acknowledged", true);
    // console.dir(response.acknowledged);
  });

  it("get User", async () => {
    const response = await getUsers();
    expect(response).to.have.lengthOf(1);
  });
});
