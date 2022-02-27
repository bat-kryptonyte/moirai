const { MongoClient } = require("mongodb");
const Binary = require('mongodb').Binary;


const mongoURI = 'mongodb+srv://hackathon:mLFB22sNqCHL49y@hackathon.qwrst.mongodb.net/cypherdb?retryWrites=true&w=majority'
const DATABASE = 'cypherdb'
const client = new MongoClient(mongoURI);

const express = require('express')
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({ extended: false })

const app = express()
app.use(fileUpload())
const port = 3000

// MongoClient.connect(mongoURI, function (err, db) {
//   if (err) throw err;
//   console.log("Database created!");
//   db.close();
// });


app.post('/cypher', urlencodedParser, async (req, res) => {
  const body = req.body
  const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  if (body.user_email == undefined || body.user_name == undefined ||
    body.heir_name == undefined || body.heir_email == undefined || body.cypherbody == undefined) {
    res.send(
      {
        status: -1,
        message: "invalid body data"
      })
    return
  }
  if (!emailRegexp.test(body.user_email) || !emailRegexp.test(body.heir_email)) {
    res.send(
      {
        status: -1,
        message: "invalid email"
      })
    return
  }
  

  const doc = {
    user_name: body.user_name,
    heir_name: body.heir_name,
    heir_email: body.heir_email,
    user_email: body.user_email,
    death_certificate: null,
    cypherbody: body.cypherbody
  }
  try {
    await client.connect();
    const database = client.db("cypherdb");
    const collection = database.collection("cypher");
    // Query for a movie that has the title 'The Room'
    const query_heir = { heir_email: doc.heir_email };
    const query_user = { user_email: doc.user_email };

    const heir_email_res = await collection.findOne(query_heir);
    const user_email_res = await collection.findOne(query_user);

    if (heir_email_res != null || user_email_res != null) {
      res.send({
        status: -1,
        message: "invalid body data"
      })
      client.close()
      return
    }
    await collection.insertOne(doc);
    res.send({
      status: 0,
      message: "success"
    })
    // since this method returns the matched document, not a cursor, print it directly
  } finally {
    await client.close();
  }
})

app.post('/retrieve', urlencodedParser, async (req, res) => {

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.send({status:-1,message:'No files were uploaded.'});
  }

  const body = req.body
  //validate data
  const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  
  if (body == undefined || body.user_email == undefined || body.user_name == undefined ||
    body.heir_name == undefined || body.heir_email == undefined) {
    res.send(
      {
        status: -1,
        message: "invalid body data"
      })
    return
  }
  if (!emailRegexp.test(body.user_email) || !emailRegexp.test(body.heir_email)) {
    res.send(
      {
        status: -1,
        message: "invalid email"
      })
    return
  }
  

  const query = {
    user_email : body.user_email,
    user_name: body.user_name,
    heir_email: body.heir_email,
    heir_name: body.heir_name
  }
  // store received death_certificate into mongodb
  const death_certificate = req.files.death_certificate
  const file = death_certificate.data
  Binary(file)
  const update = {
    $set: {
      death_certificate: Binary(file)
    },
  }
  try {
    await client.connect();
    const database = client.db("cypherdb");
    const collection = database.collection("cypher");
    const query_res = await collection.findOne(query);
    if(query_res == null){
      res.send({
        status: -1,
        message: "invalid query"
      })
      client.close()
      return
    }
    const result = await collection.updateOne(query, update);
    client.close()
    res.send({
      status: 0,
      message: "success",
      body: query_res.cypherbody
    })
  } finally {
    client.close()
  }
})


app.listen(port, () => {
  console.log(` app listening on port ${port}`)
})