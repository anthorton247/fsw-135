const mongoose = require('mongoose')
const Schema = mongoose.Schema

const issueSchema = new Schema({
    issue: {
        type: String
    }
})

module.exports = mongoose.model("Issuer", issueSchema)