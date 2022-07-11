"use strict";

const connection = require('../../models/db/db').connection;

const showLogin = (req, res) => {
  if (req.session.isLoggedIn) {
    res.redirect('/');
  } else {
    res.render('login');
  }
};

const loginSucces = (req, res, next) => {
  let inputEmail = req.body.inputEmail; // HTML form에서 name이 inputEmail으로 정해진 element의 값.
  let inputPassword = req.body.inputPassword;

  if (inputEmail && inputPassword) {
    const sql = `SELECT * FROM accounts WHERE email = ? AND password = ?`;
    connection.query(sql, [inputEmail, inputPassword], (err, result) => {
      if (err) throw err;
      if (result.length > 0) {
        req.session.isLoggedIn = true;
        req.session.email = inputEmail;
        res.redirect('/');
      } else {
      }
      res.end();
    });
  } else {
    res.end();
  }
};

module.exports = {
  showLogin,
  loginSucces,
};
