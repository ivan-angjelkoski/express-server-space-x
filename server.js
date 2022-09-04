const express = require('express')
const {MongoClient,ServerApiVersion}  = require('mongodb')
const cors = require('cors')

const MONGO_URI = 'mongodb+srv://nightex:bossmode@nightexcluster.g4mii.mongodb.net/?retryWrites=true&w=majority'
const PORT = 4000
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))




app.get('/comments/:id', async (req,res)=>{
    const client = await MongoClient.connect(MONGO_URI)
    client.serverApi = ServerApiVersion
    const db = client.db('spacex')
    const collection = db.collection('comments')
    const data = await collection.find({launch_id: req.params.id}).toArray()
    res.json(data)
    client.close()
    
})

app.post('/comments',async (req,res)=>{
    const client = await MongoClient.connect(MONGO_URI)
    const db = client.db('spacex')
    const collection = db.collection('comments')
    if (req.body.launch_id && req.body.name && req.body.comment){
        const result = await collection.insertOne(req.body);
        res.json(result)
    } else {
        res.json({
            error: "Wrong Parameters"
        })
    client.close()
    }
})

app.listen(PORT,()=>{console.log('Server Started On Port: ' + PORT)})

module.exports = app