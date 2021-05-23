const express = require('express');
const router = express.Router();
const Exercise = require('../models/exercise_model');

router.get('/', async(req,res) => {
  Exercise.find()
    .then((exercises) => res.json(exercises))
    .catch((err) => res.status(400).json("Error: "+err));
})

router.post('/', async(req,res) => {
  
  const newExercise = new Exercise({
    username: req.body.username,
    description: req.body.description,
    duration: Number(req.body.duration),
    date: Date.parse(req.body.date)
  })
  
  newExercise.save()
    .then(() => res.json("Exercise Added!"))
    .catch((err) => res.status(400).json("Error: "+err));
  
})

module.exports = router;