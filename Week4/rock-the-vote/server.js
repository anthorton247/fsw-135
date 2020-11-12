const express = require('express')
const app = express()
require('dotenv').config()
const morgan = require('morgan')
const mongoose = require('mongoose')
const expressJwt = require('express-jwt')

app.use(express.json())
app.use(morgan('dev'))

mongoose.connect(
  'mongodb://localhost:27017/rockthevote',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  },
  () => console.log('Connected to the DB')
)

app.use('/auth', require('./routes/authRouter.js'))
app.use('/api', expressJwt({ secret: process.env.SECRET, algorithms: ['HS256'] }))
app.use('/api/comment', require('./routes/commRouter.js'))
app.use('/api/issue', require('./routes/issueRouter.js'))

app.use((err, req, res, next) => {
  if(err.name === "UnauthorizedError"){
    res.status(err.status)
  }
  console.log(err)
  return res.send({errMsg: err.message})
})

app.listen(9000, () => {
  console.log(`Server is running on local port 9000`)
})