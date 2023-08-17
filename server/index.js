const Joi = require("joi")
const express = require("express");
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")
const Product = require("./ProductModel/index")
//connect MongoDb
mongoose.connect("mongodb+srv://ibro_himov:abdulloh_070@todocluser.h9whu85.mongodb.net/")
.then(() => {
    console.log("Successful connected to MongoDb")
}).catch((error) => {
    console.error(error)
})
//
app.use(express.json())
app.use(cors({
    origin: "http://127.0.0.1:5500"
}))
const PORT = 3000;

const data = [
    {id: 3,name: "Alisher", age: 17, type: "admin"},
    {id: 2,name: "Botir", age: 25, type: "member"},
    {id: 1,name: "Abdulloh", age: 15, type: "owner"}
]
//
function validateAdmin(admin) {
    const schema = {
        name: Joi.string().min(3).required(),
        age: Joi.number().min(16).required(),
        type: Joi.string().required()
    }
    return Joi.validate(admin, schema)
}
//
app.get("/api/admin", async(req,res) => {
    try {
        const product = await Product.find({})
        res.status(200).send(product)
    } catch (error) {
        console.log(error)
        res.status(500).send({status:500,message: error.message})
    }
})
app.get("/api/admin/:id", async(req,res) => {
    try {
        const {id} = req.params
        const product = await Product.findById(id)
        res.status(200).send(product)
    } catch (error) {
        console.log(error)
        res.status(500).send({status:500,message: error.message})
    }
})
app.post("/api/admin", async (req,res) => {
    const {error} = validateAdmin(req.body)
    if(error) return res.status(400).send({status:400,message:error.details[0].message})
    else{
        try {
            const product = await Product.create(req.body)
            res.status(200).send({status: 200,data:product})
        } catch (error) {
            console.log(error)
            res.status(500).send({status:500,message: error.message})
        }
    }
})

app.put("/api/admin/:id", async(req,res) => {
    const {error} = validateAdmin(req.body)
    if(error) return res.status(400).send({status: 400,message: error.details[0].message})
    else{
        try {
            const {id} = req.params
            const product = await Product.findByIdAndUpdate(id, req.body)
            if(!product) return res.status(404).send({status: 404,message: "Admin not found on id"})
            res.status(200).send({status: 200, data: product})
        } catch (error) {
            console.log(error)
            res.status(500).send({status:500,message: error.message})
        }
    }
})

app.delete("/api/admin/:id", async(req,res) => {
    try {
        const {id} = req.params
        const product = await Product.findByIdAndDelete(id)
        if(!product) return res.status(404).send({status: 404,message: "Admin not found on id"})
        res.status(200).send({status: 200, data: product})
    } catch (error) {
        console.log(error)
        res.status(500).send({status:500,message: error.message})
    }
})
app.listen(PORT, () => console.log(`Listening on ${PORT}....`))