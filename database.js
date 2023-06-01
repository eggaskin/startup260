const config = require('./dbConfig.json');
const { MongoClient } = require('mongodb');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('NOTED');
const categories = db.collection('cats');

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
})().catch((ex) => {
  console.log(`Unable to connect to database with ${url} because ${ex.message}`);
  process.exit(1);
});

// TODO: Add functions to interact with the database here
// MOVE LOGIC HERE
async function addCategory(category) {
  const result = await categories.insertOne(category);
  return result;
}

// update category
async function updateCategory(catname, category) {
  const result = await categories.updateOne({ catname: catname }, { $set: category });
  return result;
}

//TODO: make these async??
function getCategory(catname) {
  const query = { catname: catname };
  const options = { sort: { catname: 1 } };
  const cursor = scoreCollection.find(query, options);
  return cursor.toArray();
}

function getCategories() {
  const query = {};
  const options = { sort: { catname: 1 } };
  const cursor = scoreCollection.find(query, options);
  return cursor.toArray();
}

module.exports = { addCategory, getCategory }; //TODO:
