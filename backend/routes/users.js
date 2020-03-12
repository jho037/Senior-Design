var express = require('express');
var bcrypt = require("bcrypt");
var router = express.Router();
let User = require('../models/user.model');
const mongoose = require('mongoose');
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
          .then((user) => {
            res.json(user);
          })
          .catch(err => res.status(400).json('Error: ' + err));
      }
      else {
        res.json("Email in use");
      }
    }
    )
});


router.route('/update/access').post((req, res) => {
  const id = req.body.id;
  const accessToken = req.body.accessToken;
  User.findById(id)
    .then(user => {
      user.accessToken = accessToken;

      user.save()
        .then(() => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Errors: ' + err));
});

router.route('/update/transactions').post((req, res) => {
  const id = req.body.id;
  const transactions = req.body.transactions;
  User.findById(id)
    .then(user => {
      user.transactions = transactions;

      user.save()
        .then(() => res.json(transactions))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Errors: ' + err));
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
            res.send(user[0]);
          }
          else {
            res.send("1");
          }
        });
      }

    })
    .catch(err => res.status(400).json('Errors: ' + err));
});

router.route('/getAccesstoken').post((req, res) => {

  User.find({
    email: req.body.email
  })
    .then(user => {
      res.json(user[0].accessToken);

    })
    .catch(err => res.status(400).json('Errors: ' + err));

});

router.route("/searchTrans").post((req, res) => {
  var trans = [];
  User.findById(req.body.id)
    .then(user => {
      trans = user.transactions.map(indx => {
        temp = [];
        temp.push(indx.amount);
        temp.push(indx.category);
        temp.push(indx.name);
        temp.push(indx.date);
        return temp;
      });
      res.json(trans);
    })
});

router.route("/pieChartTrans").post((req, res) => {
  var trans = [];
  User.findById(req.body.id)
    .then(user => {
      trans = user.transactions.map(indx => {
        temp = [];
        temp.push(indx.amount);
        temp.push(indx.category);
        temp.push(indx.name);
        temp.push(indx.date);
        return temp;
      });
      var cats = [];
      var amou = [];
      var data = {};
      trans.map(indx => {
        cats.push(indx[1][0]);
        amou.push(indx[0]);
      })
      for (var x = 0; x < cats.length; x++) {
        if (cats[x] in data) {
          data[cats[x]] = data[cats[x]] + amou[x];
        }
        else
          data[cats[x]] = amou[x];
      }
      cats = Object.keys(data)
      amou = Object.values(data)
      res.json({ categories: cats, amounts: amou });
    })
});


module.exports = router;