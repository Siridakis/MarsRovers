import express from 'express'
import cors from 'cors'
import { MongoClient } from "mongodb";
import dayjs from 'dayjs';
import { roversMovementOutput } from './utils/roversMovementOutput'

const uri = 'mongodb://127.0.0.1:27017'
const mongoClient = new MongoClient(uri)

async function insertLog(log:{}) {
  try {
    await mongoClient.connect()
    const database = mongoClient.db("MarsRoversDB");
    const collection = database.collection("MarsRoversLogs");
    const result = await collection.insertOne({date: dayjs().format('DD/MM/YYYY'),time: dayjs().format('HH:mm:ss:SSS'), ...log});
    console.log(`A document was inserted with the _id: ${result.insertedId}`);
  }
   finally {
    await mongoClient.close();
  }
}

const app = express()
app.use(express.json())
app.set("Content-Security-Policy", "default-src 'self'");
app.use(cors({origin: 'http://localhost:5173'}));

app.post('/api/logs', (request, response) => {
  const output = roversMovementOutput(request.body)
  insertLog({input: request.body, output})//.catch(console.dir)
  response.json(output)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

