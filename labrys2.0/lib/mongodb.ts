// @ts-nocheck
import { MongoClient } from 'mongodb';

const uri = (process.env.MONGODB_URI|| 'mongodb://127.0.0.1:27017/Labrys_tech_task');
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
}


let client;
let clientPromise:any;

if (!process.env.MONGODB_URI) {
  throw new Error('Add Mongo URI to .env.local');
}

if (process.env.NODE_ENV === 'development') {

  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;

} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;