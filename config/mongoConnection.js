const MongoClient = require('mongodb').MongoClient;
const settings = require('./settings');

let _connection = undefined;
let _db = undefined;

module.exports = async () => {
  if (!_connection) {
    _connection = await MongoClient.connect(process.env.NODE_ENV.serverUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    _db = await _connection.db(process.env.NODE_ENV.database);
  }

  return _db;
};