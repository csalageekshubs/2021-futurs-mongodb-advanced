import express from 'express';
const MongoClient = require('mongodb').MongoClient
let mongoClientInstance; // Usable MongoDB instance

const app = express();
app.use(express.urlencoded({ extended: false }));

// Connect to MongoDB
MongoClient.connect(
  'mongodb://mongo:27017/docker-node-mongo',
  (err, client) => {
    mongoClientInstance = client;
    console.log('MongoDB Connected');
  })

/**
 * @description http://localhost
 */
app.get('/', (req, res) => {
  res.json({ message: "Hello world!" })
});

app.post('/kata1', (req, res) => {
  res.json({ message: "Kata1 end!" })
});

app.get('/kata2', (req, res) => {
  res.json({ message: "Kata2 end!" })
});

const PORT = 3000;
app.listen(PORT, () => console.log('Server running...'));
