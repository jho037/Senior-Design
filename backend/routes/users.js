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
  const hash = bcrypt.hashSync("a", 10);
  console.log(hash);
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
        res.json("Email is in use");
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

router.route('/update/password').post((req, res) => {
  const id = req.body.id;
  const currpass = req.body.currpass;
  const hash = bcrypt.hashSync(req.body.newpass, 10);
  newpass = hash;
  User.findById(id)
    .then(user => {
      console.log(user.password)
      bcrypt.compare(currpass, user.password).then((result) => {
        if (result) {
          user.password = newpass;
          user.save()
            .then(() => res.json(user))
            .catch(err => res.status(400).json('Error: ' + err));
        }
        else {
          res.send("1");
        }
      });
    })
    .catch(err => res.status(400).json('Errors: ' + err));
});

router.route('/update/email').post((req, res) => {
  const id = req.body.id;
  const curremail = req.body.curremail;
  const newemail = req.body.newemail;
  User.findById(id)
    .then(user => {
      if (curremail == user.email) {
        console.log("changing email")
        user.email = newemail;
        user.save()
          .then(() => res.json(user))
          .catch(err => res.status(400).json('Error: ' + err));
      }
      else {
        res.send("1");
      }
    })
    .catch(err => res.status(400).json('Errors: ' + err));
});

router.route('/update/goal').post((req, res) => {
  const id = req.body.id;
  const newgoal = req.body.newgoal;
  User.findById(id)
    .then(user => {
      console.log("changing email")
      user.goal = newgoal;
      user.save()
        .then(() => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Errors: ' + err));
});

router.route('/addGoal').post((req, res) => {
  const id = req.body.id;
  const goal = req.body.goal;
  User.findById(id)
    .then(user => {
      user.goal = goal;

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
          if (amou[x] > 0) {
            data[cats[x]] = data[cats[x]] + amou[x];
          }
        }
        else
          if (amou[x] > 0) {
            data[cats[x]] = amou[x];
          }
      }
      cats = Object.keys(data)
      amou = Object.values(data)
      amou = amou.map(indx => {
        return (Math.floor((indx) * 100) / 100)
      })
      res.json({ categories: cats, pamounts: amou });
    })
});

router.route("/lineChartTrans").post((req, res) => {
  var trans = [];
  User.findById(req.body.id)
    .then(user => {
      trans = user.transactions.map(indx => {
        temp = [];
        if (indx.amount > 0) {
          temp.push(indx.amount);
          temp.push(indx.date.substring(5));
        }
        // temp.push(indx.amount);
        // temp.push(indx.date);
        return temp;
      });
      var dats = [];
      var amou = [];
      var famou = [];
      var data = {};
      trans.map(indx => {
        if (indx[0] > 0) {
          amou.push(indx[0]);
          dats.push(indx[1]);
        }
      })
      console.log(dats);
      console.log(amou);
      for (var x = 0; x < dats.length; x++) {
        if (dats[x] in data) {
          data[dats[x]] = data[dats[x]] + amou[x];
        }
        else {
          data[dats[x]] = amou[x];
        }
      }
      dats = Object.keys(data).reverse();
      amou = Object.values(data).reverse();
      famou = amou.map(indx => {
        // famou.push(Math.floor((indx)*100)/100);
        return (Math.floor((indx) * 100) / 100);
      })
      console.log(dats);
      console.log(famou);


      res.json({ dates: dats, lamounts: famou });
    })
});

module.exports = router;
