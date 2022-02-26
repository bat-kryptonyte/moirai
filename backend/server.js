const MongoClient  = require("mongodb").MongoClient;

const mongoURI = 'mongodb+srv://hackathon:mLFB22sNqCHL49y@hackathon.qwrst.mongodb.net/cypherdb?retryWrites=true&w=majority'
const DATABASE = 'cypherdb'

const express = require('express')
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({ extended: false })

const app = express()
const port = 3000

// MongoClient.connect(mongoURI, function (err, db) {
//   if (err) throw err;
//   console.log("Database created!");
//   db.close();
// });


app.post('/cypher', urlencodedParser, (req, res) => {
  const body = req.body
  const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  if (!emailRegexp.test(body.email)) {
    res.send(
      {
        status: -1,
        message: "invalid email"
      })
    return
  }
  if (req.body.cypherbody == undefined) {
    res.send(
      {
        status: -1,
        message: "cypherbody"
      })
    return
  }

  const doc = {
    email: body.email,
    cypherbody: body.cypherbody
  }
  MongoClient.connect(mongoURI, function(err, db) {
    if (err) throw err;
    var dbo = db.db("cypherdb");
    
    dbo.collection("cypher").insertOne(doc, function(err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      db.close();
    });
  });
  res.send({
    status: 0,
    message: "success"
  })
})

app.listen(port, () => {
  console.log(` app listening on port ${port}`)
})