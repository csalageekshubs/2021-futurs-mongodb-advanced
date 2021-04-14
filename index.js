const express = require('express');
const MongoClient = require('mongodb').MongoClient

const app = express();
app.use(express.urlencoded({ extended: false }));

// Connect to MongoDB
MongoClient.connect(
  'mongodb://mongo:27017/docker-node-mongo',
  (err, client) => {
    console.log('MongoDB Connected');
  })

app.get('/', (req, res) => {
  res.json({ message: "Hello world!" })
});

const PORT = 3000;
app.listen(PORT, () => console.log('Server running...'));
