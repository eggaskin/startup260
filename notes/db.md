# Databases
[notes home](./notes.md)

We want persistent data! How to do this? Use a data service to have persistent data. We will use MongoDB Atlas for this.

## Collections
* schema-free array of objects
* each table can have different schema/keys/types for the same key

'mkdir testMongo && cd testMongo', 'npm install mongoDB'

Mongo url: `mongodb+srv://(username):(password)@(hostname)`
`client = MongoClient(url)`, `client.db((dbname))` to get a database object

`client.connect()` returns a promise, so we can use `await` to wait for it to finish, or use then/catch process.

`db.collection((collectionName))` to getmake a collection object, then insert objects into it with `collection.insertOne((object))` or `collection.insertMany((array of objects))`. objects must be JSON objects.

## Find/Queries

`db.collectionName.find()` to get all objects in a collection, or `db.collectionName.find({key: value})` to get all objects with a specific key/value pair. RETURNS A PROMISE. (cursor)

Specific  queries for find:
* gt: greater than
* gte: greater than or equal to
* lt: less than
* lte: less than or equal to
* ne: not equal to
* in: in an array

Make result of find() into an array with `toArray()`, then can iterate through it with `forEach()`.

Can include options in find, such as `limit: 10` to limit to 10 results, or `sort: {key: 1}` to sort by key in ascending order, or `sort: {key: -1}` to sort by key in descending order. Also as a JSON.

> IT IS ASYNC, so no promises that things will be there right away. use await, and ping later to make sure things are updated.

## AUTH and login

