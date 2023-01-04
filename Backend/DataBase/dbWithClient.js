const mongodb = require('mongodb');
let ObjectID = mongodb.ObjectId
const MongoClient = mongodb.MongoClient;


const getdatabase = async () => {
  let client = await MongoClient.connect('mongodb://127.0.0.1:27017')
  database = client.db('CRUD');
  if (!database) {
    console.log(err);
  }
  return database;
}

module.exports = { getdatabase, ObjectID }
