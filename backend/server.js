const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');  // Adicione isto

const authRoutes = require('./routes/auth');

const app = express();

mongoose.connect('mongodb://localhost:27017/myrpgsite', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.json());

app.use('/auth', authRoutes);

app.listen(3000, () => {
  console.log('Server running on port 3000');
});

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://astolfopinto010:Qh9Ze2aE1CSjlniW@cluster0.cgi9hlm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
