const express = require('express');
const router = express.Router();
let User = require('../models/user_model');

router.get('/', async(req,res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: "+err));
})

router.post('/add', async(req,res) => {
  
  const newUser = new User({
    username: req.body.username
  })
  
  newUser.save()
    .then(() => res.json("User Added!"))
    .catch((err) => res.status(400).json("Error: "+err));
  
})

module.exports = router;