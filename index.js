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
  const session = mongoClientInstance.startSession();
  const transactionOptions = {
    readPreference: 'primary',
    readConcern: { level: 'local' },
    writeConcern: { w: 'majority' }
  };

  session.withTransaction(() => {
    const usersCollection = mongoClientInstance.db('local').collection('users');

    usersCollection.insertOne({
      name: req.body.name,
      surname: req.body.surname,
      email: req.body.email,
      age: req.body.age
    }, { session }
    );
  },
    transactionOptions
  )
    .then(() => { })
    .catch((error) => {
      console.log("Error during transaction: ", error);
    })
    .then(() => {
      session.close();
    });

  res.json({ message: "Transaction end!" })
});

app.get('/kata2', (req, res) => {
  mongoClientInstance.db("test").collection('usersKata2').aggregate([
    {
      "$geoNear": {
        "near": {
          "type": "Point",
          "coordinates": [
            -3.8891601562499996,
            40.43022363450862
          ]
        },
        "maxDistance": 500 * 1609,
        "spherical": true,
        "distanceField": "distance",
        "distanceMultiplier": 0.000621371
      }
    }
  ]).pretty()
    .then((result) => {
      console.log(result);
      res.json({ result })
    })
});


const PORT = 3000;
app.listen(PORT, () => console.log('Server running...'));
