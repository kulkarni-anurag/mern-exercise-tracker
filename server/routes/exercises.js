const express = require('express');
const router = express.Router();
const Exercise = require('../models/exercise_model');

router.get('/', async(req,res) => {
  Exercise.find()
    .then((exercises) => res.json(exercises))
    .catch((err) => res.status(400).json("Error: "+err));
})

router.get('/:id', async(req,res) => {
  Exercise.findById(req.params.id)
    .then((exercise) => res.json(exercise))
    .catch((err) => res.status(400).json("Error: "+err));
})

router.post('/add', async(req,res) => {
  
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

router.post('/update/:id', async(req,res) => {
  
  Exercise.findById(req.params.id)
    .then((exercise) => {
      exercise.username = req.body.username;
      exercise.description = req.body.description;
      exercise.duration = Number(req.body.duration);
      exercise.date = Date.parse(req.body.date);
      
      exercise.save()
        .then(() => res.json("Exercise Updated!"))
        .catch((err) => res.status(400).json("Error: "+err));
    })
    .catch((err) => res.status(400).json("Error: "+err));
  
})

router.delete('/:id', async(req,res) => {
  Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json("Exercise Deleted!"))
    .catch((err) => res.status(400).json("Error: "+err));
})

module.exports = router;