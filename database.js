const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');

const userName = process.env.MONGOUSER;
const password = process.env.MONGOPASSWORD;
const hostname = process.env.MONGOHOSTNAME;

if (!userName) {
  throw Error('Database not configured. Set environment variables');
}

const url = `mongodb+srv://${userName}:${password}@${hostname}`;

const client = new MongoClient(url);
const userCollection = client.db('quiz').collection('user');
const scoreCollection = client.db('quiz').collection('scores');

function getUser(email) {
  return userCollection.findOne({ email: email });
}

async function getScore(email) {
  let obj = await scoreCollection.findOne({ email: email });
  console.log(obj);
  return obj;
}

function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

async function createUser(email, password) {
  // Hash the password before we insert it into the database
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    email: email,
    password: passwordHash,
    token: uuid.v4(),
  };
  await userCollection.insertOne(user);

  return user;
}
async function addScore(email, score) {
  try {
    scoreCollection.deleteOne({email: email})
  } catch {
    //pass
  }
  await scoreCollection.insertOne({email: email, score: score});
  console.log('score added');
}

module.exports = {
  getUser,
  getUserByToken,
  createUser,
  addScore,
  getScore,
};
