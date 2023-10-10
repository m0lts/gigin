// TO GET HERE, I INSTALLED EXPRESS AND MONGODB. I CAN SUCCESSFULLY CONNECT TO THE MONGODB DATABASE AND PERFORM CRUD OPERATIONS. HOWEVER, I AM UNABLE TO CONNECT THE FRONT END FORM 'POST' DATA TO THIS BACKEND ENDPOINT SUCCESFULLY.

const express = require("express");
const { MongoClient } = require("mongodb");
const app = express();
const port = 5173;


const uri = "mongodb+srv://moltontom6:hwVCPtcJWJF5BmeE@cluster0.y34wuom.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

app.use(express.json());

async function connectToDatabase() {
    try {
      console.log('Connecting to the database...');
      await client.connect();
      console.log('Connected to the database');
    } catch (error) {
      console.error('Error connecting to the database:', error);
    }
  }
  
  async function insertMusician(doc) {
    const database = client.db('gigin_test_accounts');
    const musiciansCollection = database.collection('musicians');
    const result = await musiciansCollection.insertOne(doc);
    console.log(`A document was inserted with the _id: ${result.insertedId}`);
  }
  
  app.post('/api/addMusician', async (req, res) => {
    const formValues = req.body;
  
    try {
      await insertMusician(formValues);
      res.status(200).send('Musician data inserted successfully.');
    } catch (error) {
      console.error('Error inserting musician data:', error);
      res.status(500).send('Internal server error.');
    }
  });
  
  async function run() {
    await connectToDatabase();
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }
  
  run().catch(console.error);