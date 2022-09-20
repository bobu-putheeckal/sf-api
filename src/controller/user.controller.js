const getMongoClient = require("../db/mongo.db");

const getUsers = async () => {
  const mongoClient = await getMongoClient();
  const response = await mongoClient
    .db("userdb")
    .collection("users")
    .find()
    .project({ firstName: 1, lastName: 1, email: 1 })
    .toArray();
  return response;
};

const insertUser = async (user) => {
  const mongoClient = await getMongoClient();
  const response = await mongoClient
    .db("userdb")
    .collection("users")
    .insertOne({
      firstName: user.firstName.toString(),
      lastName: user.lastName.toString(),
      email: user.email.toString(),
    });
  return response;
};

module.exports = { getUsers, insertUser };
