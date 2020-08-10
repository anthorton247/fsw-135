const express = require("express")
const app = express()
const morgan = require("morgan")
const mongoose = require("mongoose")

app.use(express.json())
app.use(morgan("dev"))

mongoose.connect('mongodb://localhost/inventory', 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true},
    () => console.log("Connected to DB")
)


app.use('/inventory', require("./Routes/invRouter"))

app.use((err, req, res, next) => {
    console.log(err)
    return res.send({errMsg: err.message})
})

app.listen(3000, () => {
    console.log("App is listening on port 3000")
})
