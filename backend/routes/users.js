var express = require('express');
var bcrypt = require("bcrypt");
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
  var password = req.body.password;
  const hash = bcrypt.hashSync(password, 10);
  password = hash
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


router.route('/search').post((req, res) => {

  User.find({
    email: req.body.email
  })
    .then(user => {


      if (user.length == 0) {
        res.send("0");
      }
      else {
        bcrypt.compare(req.body.password, user[0].password).then((result) => {
          if (result) {
            res.send(user[0].id);
            console.log("affwe")
          }
          else {
            res.send("1");
          }
        });
      }

    })
    .catch(err => res.status(400).json('Errors: ' + err));
});


module.exports = router;