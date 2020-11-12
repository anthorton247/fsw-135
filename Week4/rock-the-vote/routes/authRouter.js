const express = require("express")
const authRouter = express.Router()
const User = require('../models/user.js')
const jwt = require('jsonwebtoken')

//Signup
authRouter.post("/signup", (req, res, next) => {
  User.findOne({ username: req.body.username.toLowerCase() }, (err, user) => {
    if(err){
      res.status(500)
      return next(err)
    }
    if(user){
      res.status(403)
      return next(new Error("That username is already taken"))
    }
    const newUser = new User(req.body)
    newUser.save((err, savedUser) => {
      if(err){
        res.status(500)
        return next(err)
      }
                            // payload,            // secret
      const token = jwt.sign(savedUser.toObject(), process.env.SECRET)
      return res.status(201).send({ token, user: savedUser })
    })
  })
})

// Login
authRouter.post("/login", (req, res, next) => {
  User.findOne({ username: req.body.username.toLowerCase() }, (err, user) => {
    if(err){
      res.status(500)
      return next(err)
    }
    if(!user){
      res.status(403)
      return next(new Error("Username or Password are incorrect"))
    }
    if(req.body.password !== user.password){
      res.status(403)
      return next(new Error("Username or Password are incorrect"))
    }
    const token = jwt.sign(user.toObject(), process.env.SECRET)
    return res.status(200).send({ token, user })
  })
})

// Get All Users
authRouter.get("/", (req, res, next) => {
  User.find((err, users) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(200).send(users)
  })
})

// Find One User

authRouter.get("/search/username", (req, res, next) => {
    User.find({ name: req.query.name}, (err, user) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(user)
    })
})

// Add new User
authRouter.post("/", (req, res, next) => {
  const newUser = new User(req.body)
  newUser.save((err, savedUser) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(201).send(savedUser)
  })
})

// Delete User
authRouter.delete("/:userID", (req, res, next) => {
  User.findOneAndDelete(
    { _id: req.params.userID },
    (err, deletedUser) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(200).send(`Successfully deleted user: ${deletedUser.username}`)
    }
  )
})

// Update User
authRouter.put("/:userID", (req, res, next) => {
  User.findOneAndUpdate(
    { _id: req.params.userID },
    req.body,
    { new: true },
    (err, updatedUser) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(201).send(updatedUser)
    }
  )
})

module.exports = authRouter