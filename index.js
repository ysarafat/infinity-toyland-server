const express = require('express');
const cors = require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()

const app = express();
const PORT = process.env.PORT || 5000;

// middleWare
app.use(express.json());
app.use(cors());

// mongodb start

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.oxlnwju.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
   
    await client.db("admin").command({ ping: 1 });
    console.log("successfully connected to MongoDB!");
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);


// mongodb end


// server listening
app.listen(PORT, ()=> {
    console.log(`Server running on ${PORT} port`);
})