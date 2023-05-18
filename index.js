const express = require('express');
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
     client.connect();

    const toysCollection = client.db("infinityToyland").collection("toys");

    // API: toys info save to db
    app.post('/toys', async(req, res)=> {
        const toy = req.body;
        const result = await toysCollection.insertOne(toy);
        res.send(result);
    })

    // API : get all toys
    app.get('/toys', async(req, res) => {
      const result = await toysCollection.find().toArray();
      res.send(result)
    })

    //  get specific user data
    app.get('/my-toys', async(req, res)=>{
      const userEmail = req.query.email;
      const query = {sellerEmail: userEmail}
      const result = await toysCollection.find(query).toArray();
      res.send(result)
    })

    // delete toy 
    app.delete('/my-toys/:id', async(req,res) =>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)}
      const result = await toysCollection.deleteOne(query)
      res.send(result)

 })

   
    await client.db("admin").command({ ping: 1 });
    console.log("successfully connected to MongoDB!");
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

// mongodb end

//  get response from server
app.get('/', (req, res)=> {
    res.send('<h1>Infinity Toyland Server Running</h1>')
})

// server listening
app.listen(PORT, ()=> {
    console.log(`Server running on ${PORT} port`);
})