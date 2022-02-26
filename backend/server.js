const {MongoClient} = require("mongodb");

const mongoURI = 'mongodb+srv://hackathon:mLFB22sNqCHL49y@hackathon.qwrst.mongodb.net/cypherdb?retryWrites=true&w=majority'
const DATABASE = 'cypherdb'
const client = new MongoClient(mongoURI);

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


app.post('/cypher', urlencodedParser, async (req, res) => {
  const body = req.body
  const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  if (!emailRegexp.test(body.user_email) || !emailRegexp.test(body.heir_email)) {
    res.send(
      {
        status: -1,
        message: "invalid email"
      })
    return
  }
  if (body.cypherbody == undefined || body.user_name == undefined ||
    body.heir_name == undefined) {
    res.send(
      {
        status: -1,
        message: "invalid body data"
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


app.listen(port, () => {
  console.log(` app listening on port ${port}`)
})