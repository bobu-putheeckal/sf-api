const { MongoClient } = require("mongodb");

const MONGO_USER = process.env.MONGO_USER;
const MONGO_PWD = process.env.MONGO_PWD;
const MONGO_URL = process.env.MONGO_URL;
const MONGO_PORT = process.env.MONGO_PORT;

const getMongoClient = async () => {
  const uri = `mongodb://${MONGO_USER}:${MONGO_PWD}@${MONGO_URL}:${MONGO_PORT}/`;
  console.log(`uri => ${uri}`);
  // Create a new MongoClient
  const mongoClient = new MongoClient(uri);
  await mongoClient.connect();
  // Establish and verify connection
  await mongoClient.db("admin").command({ ping: 1 });
  console.log("Connected successfully to server");
  return mongoClient;
};

module.exports = getMongoClient;
