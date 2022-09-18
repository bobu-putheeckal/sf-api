const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");

// Constants
const PORT = process.env.PORT;

// App
const app = express();
app.use(
  cors({
    origin: "http://34.171.103.192/",
  })
);
app.use(bodyParser.json());
app.use(helmet.hidePoweredBy);

const serverStart = async () => {
  const MONGO_USER = process.env.MONGO_USER;
  const MONGO_PWD = process.env.MONGO_PWD;
  const MONGO_URL = process.env.MONGO_URL;
  const MONGO_PORT = process.env.MONGO_PORT;

  const uri = `mongodb://${MONGO_USER}:${MONGO_PWD}@${MONGO_URL}:${MONGO_PORT}/`;
  console.log(`uri => ${uri}`);
  // Create a new MongoClient
  const mongoClient = new MongoClient(uri);
  await mongoClient.connect();
  // Establish and verify connection
  await mongoClient.db("admin").command({ ping: 1 });
  console.log("Connected successfully to server");

  app.get("/", (_, res) => {
    res.send(`up!!!`);
  });

  app.get("/users", async function (_, res) {
    const response = await mongoClient
      .db("userdb")
      .collection("users")
      .find()
      .project({ firstName: 1, email: 1 })
      .toArray();
    res.json(response);
  });

  app.post("/user", async (req, res) => {
    const user = req.body;
    console.dir(user);
    const response = await mongoClient
      .db("userdb")
      .collection("users")
      .insertOne({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      });
    return res.json(response);
  });

  app.listen(PORT, () => {
    console.log(`listening on port :${PORT}`);
  });
};

serverStart();
module.exports = app;
