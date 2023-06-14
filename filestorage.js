

const {MongoClient} = require('mongodb');

const uri = "mongodb+srv://Belzebu013:01000101@cluster0.ww3vyvs.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true});

//nome coleção
const COLLECTION_NAME = 'projeto';

async function withMongoDb(callback) {
  const client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true});
  try {
    await client.connect();
    const db = client.db('cluster0');
    const collection = db.collection(COLLECTION_NAME);
    
    return await callback(collection);
  } catch (error) {
    console.error('Erro ao trabalhar com mongo', error);
    throw error;
  }finally{
    await client.close();
  }
}

async function readData() {
  return withMongoDb(async (collection) => {
    const data = await collection.find({}).toArray();
    return data;
  });
}

async function writeData(data) {
  return withMongoDb(async (collection) => {
    await collection.deleteMany({});
    await collection.insertMany(data);
  });
}

async function findUserByEmail(email) {
  return await withMongoDb(async (collection) => {
    return await collection.findOne({email: email});
  });
}

async function findUserById(id) {
   return await withMongoDb(async (collection) => {
    return await collection.findOne({id: id});
  });
}

module.exports = { readData, findUserByEmail, findUserById, writeData};
