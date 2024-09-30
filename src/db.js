require("dotenv").config();

const {MongoClient} = require("mongodb");
const client = new MongoClient(process.env.MONGODB_CONNECT_STRING, {
    useUnifiedTopology: true,
});
const connection = client.connect();

const Collections = {
  STUDENTS: "students",
};

module.exports = { connection, Collections };
