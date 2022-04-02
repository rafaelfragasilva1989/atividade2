const mongoClient = require('mongodb').MongoClient

mongoClient
  .connect('mongodb://localhost')
  .then(conn => (global.conn = conn.db('cinema')))
  .catch(err => console.log(err))

function findAll() {
  return global.conn.collection('filmes').find().toArray()
}

function insert(filme) {
  return global.conn.collection('filmes').insertOne(filme)
}

const ObjectId = require('mongodb').ObjectId

function findOne(id) {
  return global.conn.collection('filmes').findOne(new ObjectId(id))
}

function update(id, filme) {
  return global.conn
    .collection('filmes')
    .updateOne({ _id: new ObjectId(id) }, { $set: filme })
}

function deleteOne(id) {
  return global.conn.collection('filmes').deleteOne({ _id: new ObjectId(id) })
}

module.exports = { findAll, insert, findOne, update, deleteOne }
