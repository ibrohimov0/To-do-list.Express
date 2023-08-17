const mongoose = require("mongoose")

const productSchema = mongoose.Schema(
    {
        name:{
            type: String,
            required: true
        },
        age:{
            type: Number,
            required: true
        },
        type:{
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

const Product = mongoose.model("Product", productSchema)
module.exports = Product