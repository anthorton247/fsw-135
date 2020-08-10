const express = require("express")
const invRouter = express.Router()
const Inventory = require("../Models/inventory")

invRouter.get("/", (req, res, next) => {
    Inventory.find((err, inventory) => {
            if(err){
                res.status(500)
                return next(err)
            } 
            return res.status(200).send(inventory)
    })
})

invRouter.get("/search/name", (req, res, next) => {
    Inventory.find({ name: req.query.name}, (err, items) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(items)
    })
})

invRouter.post("/", (req, res, next) => {
    const newItem = new Inventory(req.body)
    newItem.save((err, saveItem) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(saveItem)
    })
})

invRouter.delete("/:invID", (req, res) => {
    Inventory.findOneAndDelete({_id: req.params.invID}, (err, deletedItem) =>{
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(`Successfully deleted item ${deletedItem.name} from inventory.`)
    })
})

invRouter.put("/:invID", (req, res, next) => {
    Inventory.findOneAndUpdate(
        {_id: req.params.invID},
        req.body,
        {new: true},
        (err, updatedItem) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedItem)
        }
    )
})

module.exports = invRouter