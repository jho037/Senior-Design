var express = require('express');
var router = express.Router();
let User = require('../models/user.model');
/* GET users listing. */
router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Errors: ' + err));
});

router.route('/add').post((req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const phonenumber = req.body.phonenumber;
  const password = req.body.password;

  const newUser = new User({ name, email, phonenumber, password });
  User.find({
    email: req.body.email
  })
    .then(user => {
      if (user.length == 0) {
        newUser.save()
          .then(() => res.json('User added!'))
          .catch(err => res.status(400).json('Error: ' + err));
      }
      else {
        res.json("Email in use");
      }
    }
    )
});


router.route('/search').get((req, res) => {

  User.find({
    email: req.body.email
  })
    .then(user => {
      if (user.length == 0) {
        res.json("Incorrect email");
      }
      else {
        if (user[0].password == req.body.password) {
          res.json(user[0].id + " ")
        }
        else {
          res.json("Incorrect password")
        }
      }

    })
    .catch(err => res.status(400).json('Errors: ' + err));
});


module.exports = router;