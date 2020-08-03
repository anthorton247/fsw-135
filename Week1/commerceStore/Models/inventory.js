const mongoose = require("mongoose")
const Schema = mongoose.Schema

const inventorySchema = new Schema({
    name: String,
    cost: Number
})

module.exports = mongoose.model("Inventory", inventorySchema)