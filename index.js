const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;


// MIDDLE WARE 
app.use(cors())
app.use(express.json());





const uri = "mongodb+srv://taskmanager:EjZ4dgYtW7zO3HKJ@cluster0.shepece.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
// taskmanager
// EjZ4dgYtW7zO3HKJ

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        const taskCollection = client.db('Task').collection('userTask');


        app.post('/tasks', async (req, res) => {
            const task = req.body;
            const result = await taskCollection.insertOne(task);
            res.send(result);
        })
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send("Task Management is running");
})
app.listen(port, () => {
    console.log('Task Manager is running on ,', port);
})