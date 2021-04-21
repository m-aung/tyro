const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getUsers, (req, res) => {
  return res.status(200).send(res.locals.allUsers);
});

router.post('/', userController.postUser, (req, res) => {
  //console.log(res.body);
  return res.status(200).json({ user: res.locals.user });
  //return res.status(200).json('ok');
});
// login
// app.post('/login)

// new user
// app.post('/')

module.exports = router;
