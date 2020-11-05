const mongoCollections = require('../config/mongoCollections');
const sessions = mongoCollections.sessions;
const ObjectId = require('mongodb').ObjectID;

module.exports = {
  async create(username) {

    const sessionsCollection = await sessions();

    let session = {
      username: username,
      answers: {}
    };

    const insertInfo = await sessionsCollection.insertOne(session);
    if (insertInfo.insertedCount === 0) throw new Error('Could not add session');

    const newId = insertInfo.insertedId;
	  console.log(typeof newId);

    return this.get(String(newId));
  },

  async get(id) {
	  let re = new RegExp('[0-9a-fA-F]{24}'); // regExp for 24 alpha/num

    if (!id) throw new Error('You must provide an id to search for');
	  else if (typeof id != 'string' || id == '') throw new Error('id provided must be a valid string');
	  else if (!re.test(id)) throw new Error('id provided must be a valid ObjectId');

    const sessionsCollection = await sessions();
    const session = await sessionsCollection.findOne({ _id: ObjectId(id) });
    if (session === null) throw new Error('No session with that id');

    return session;
  },

  async update(id, answers) {
	  let re = new RegExp('[0-9a-fA-F]{24}'); // regExp for 24 alpha/num

    if (!id) throw new Error('You must provide an id to search for');
    else if (typeof id != 'string' || id == '') throw new Error('id provided must be a valid string');
    else if (!re.test(id)) throw new Error('id provided must be a valid ObjectId');


    const sessionsCollection = await sessions();
    const updatedSession = {
      answers : answers
    };

    const updatedInfo = await sessionsCollection.updateOne(
      { _id: ObjectId(id) },
      { $set: updatedSession }
    );
    if (updatedInfo.modifiedCount === 0) {
      throw new Error('could not update session successfully');
    }

    return await this.get(id);
  }
};
