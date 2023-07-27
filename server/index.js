const express = require("express")
const Joi = require("joi")
const app = express()
app.use(express.json())
const PORT = 3000

const data = [
    {id: 3,name: "Alisher", age: 17, type: "admin"},
    {id: 2,name: "Botir", age: 25, type: "member"},
    {id: 1,name: "Abdulloh", age: 15, type: "owner"}
]

app.get("/admin", (req,res) => {
    res.send(data)
})
app.get("/admin/:id", (req,res) => {
    const result = data.find(c => c.id === parseInt(req.params.id))
    if(!result) return res.status(404).send(`Admin not found on ${req.params.id} id`)
    res.send(result)
})
app.post("/admin", (req,res) => {
    console.log(req.body)
})

app.listen(PORT, () => console.log(`Listening on ${PORT}....`))