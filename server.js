const express=require('express')
const app = express();
const mongoose =require('mongoose')
const cors = require('cors')

app.get('/',(req,res)=>{res.send("hello i'm prasanna...")})

app.use(cors())
app.use(express.json())

const Db = async()=>{
    try {
        await mongoose.connect('mongodb+srv://prasannaadapa:prasannaadapa@cluster0.dew2ort.mongodb.net/?retryWrites=true&w=majority').then(
            ()=>{
                console.log("Connected to DataBase...")
            }
        )
    } catch (error) {
        console.log(error)
    }
}

Db();

app.listen(4000,()=>{console.log("Server is running on port 4000...")})