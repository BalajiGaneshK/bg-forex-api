const mongodb = require("mongodb");
const express = require("express");

const cors = require("cors");
const app = express();


require("dotenv").config();

const mongoClient = mongodb.MongoClient;
const objectId = mongodb.ObjectID;
const port = process.env.PORT || 4001;
const dbUrl = process.env.DB_URL;


app.use(express.json());
app.use(cors());

app.get("/latest", async (req, res) => {
    
    try {

    let client = await mongoClient.connect(dbUrl);
    let db = client.db("bg-forex");
        let data = await db.collection("latest").find().toArray();
        
        res.status(200).json({ "allUsersData": data });
        

        

    client.close();
        
    }
    catch (error) {
      
        console.log(error);
        
    }
    
})

app.listen(port, () => { console.log("listening at ", port) });