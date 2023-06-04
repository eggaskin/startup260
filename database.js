const config = require('./dbConfig.json');
const { MongoClient } = require('mongodb');
const uuid = require('uuid');
const bcrypt = require('bcrypt');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('NOTED');
// const users = db.collection('users');
const categories = db.collection('catsex');

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
})().catch((ex) => {
  console.log(`Unable to connect to database with ${url} because ${ex.message}`);
  process.exit(1);
});

// user diffrentiation - user field for each object in collection, unique categories
function getUser(uname) {
  return categories.findOne({ username: uname });
}

async function createUser(uname, password) {
  const passhash = await bcrypt.hash(password, 10);
  const user = {
    username: uname,
    password: passhash,
    token: uuid.v4(), 
    list:{"name":"list","color":"#f8f6c4","style":"check","notes":["apples","eggs","pesto","licorice"]},
  };
  await categories.insertOne(user);
  return user.token;
}

// NOT UPDATED
async function addCategory(category) {
  const result = await categories.insertOne(category);
  return result;
}

// substitute categories (ALL)
async function subCategories(authToken, catss) { 
  // get user's hash and username to save
  const user = await categories.findOne({ token: authToken });
  // TODO: error for no user/categories
  catss.username = user.username;
  catss.token = authToken;
  catss.password = user.password;

  const result = await categories.replaceOne({token:authToken}, catss);
  return result;
}

// update category NOT UPDATED
async function updateCategory(catname, category) {
  const result = await categories.updateOne({ catname: catname }, { $set: category });
  return result;
}

// make these async?? NOT UPDATED
function getCategory(catname) {
  const query = { catname: catname };
  const options = { sort: { catname: 1 } };
  const cursor = categories.find(query, options);
  return cursor.toArray();
}

function getCategories(authToken) {
  const query = {token: authToken};
  const options = { sort: { catname: 1 } };
  const cursor = categories.findOne(query, options);  
  return cursor;
}

module.exports = { getUser, createUser, addCategory, getCategory, getCategories, updateCategory, subCategories }; //TODO:
