const db = require('../model/dbModel');

const userController = {};

userController.getUsers = (req, res, next) => {
  const query = `SELECT * FROM users ORDER BY id`;

  db.query(query)
    .then((data) => {
      res.locals.allUsers = data.rows;
      return next();
    })
    .catch((err) => {
      next({
        log: 'error in userController.getUsers' + err,
        status: 300,
      });
    });
};

userController.postUser = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next({
      log: 'error userController.postUsers',
      status: 300,
    });
  }

  const query = `INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *`;
  console.log('userController.js: line 26');

  db.query(query, [email, password])
    .then((data) => {
      console.log('DATA', data.rows[0]);
      res.locals.user = data.rows[0];

      return next();
    })
    .catch((err) => {
      console.log('IN .CATCH');
      return next({
        log: 'error in userController.postUsers' + err,
        status: 300,
      });
    });
};

module.exports = userController;
