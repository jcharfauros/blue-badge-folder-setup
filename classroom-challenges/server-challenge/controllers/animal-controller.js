let router = require("express").Router();
let Animal = require("../db").import("../models/animal");
const validateSession = require('../middleware/validate-session');
// var express = require('express');
// var router = express.Router();
// var sequelize = require('../db');
// var Animal = sequelize.import('../models/animal');

/* ANIMAL CREATE */

router.post("/create", validateSession, function (req, res){
    Animal.create({
        name: req.body.animal.name,
        legNumber: req.body.animal.legNumber,
        predator: req.body.animal.predator,
        userId: req.user.id
    })
    .then(function createSuccess(animal) {
        if (animal) {
            res.status(200).json({ 
                animal: animal,
                message: "Animal successfully created!",
            });
        } else {
            res.send("Animal not created");
        }
    })
    .catch(function (err){
        res.status(500).json({ error: err });
    });
});

/* ANIMAL GET all */
router.get("/", validateSession, function (req, res) {
    Animal.findAll()
      .then((animals) => res.status(200).json(animals))
      .catch((err) => res.status(500).json({ error: err }));
});

/* ANIMAL update/:id */

router.put("/update/:id", validateSession, function (req, res) {
    const updateAnimalEntry = {
        name: req.body.animal.name,
        legNumber: req.body.animal.legNumber,
        predator: req.body.animal.predator,
    };
    const query = { where: { id: req.params.id, userId: req.user.id } };
    Animal.update(updateAnimalEntry, query)
        // .then((animals) => res.status(200).json(animals))
        .then((response) => res.status(200).json({ message: response[0] != 0 ? "Animal entry was updated" : "No record found", response: response}))
        .catch((err) => res.status(500).json({ error: err }));
  });

/* ANIMAL delete/:id */

router.delete("/delete/:id", validateSession, function(req, res){
    
    const query = { where: { id: req.params.id, userId: req.user.id }};
    
    Animal.destroy(query)
    .then(() => res.status(200).json({ message: "Animal entry was deleted"}))
    .catch((err) => res.status(500).json({ error: err }));

    // .then(()=> res.status(200).json({ message: "Animal entry was removed"}))
    // .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;