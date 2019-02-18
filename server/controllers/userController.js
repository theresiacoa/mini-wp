const User = require('../models/user');
const bcrypt = require(`bcrypt`);
const authenticate = require(`../middlewares/authentication`);
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.google_signin_client_id);

class UserControlller {
  static register(req, res) {
    User
      .create(req.body)
      .then(newUser => {
        res.status(201).json(newUser)
      })
      .catch(err => {
        res.status(500).json({ err: err.message })
      })
  }

  static login(req, res) {
    User
      .findOne({
        email: req.body.email
      })
      .then(user => {
        if (!user) {
          res.status(500).json(`Email has not been registered`)
        } else {
          let matchPswrd = bcrypt.compareSync(req.body.password, user.password);
          if (matchPswrd) {
            let token = authenticate(user._id, user.username, user.email)
            res.json(token)
          } else {
            res.status(500).json(`Wrong Username / Password`)
          }
        }
      })
      .catch(err => {
        res.status(500).json({ err: err.message })
      })
  }

  static googleLogin(req, res) {
    // console.log(req.body)
    client.verifyIdToken({
      idToken: req.body.token,
      audience: process.env.google_signin_clientID
    })
      .then(ticket => {
        // console.log(ticket.getPayload())
        let payload = ticket.getPayload();
        return User
          .findOne({
            email: payload.email
          })
      })
      .then(data => {
        if (!data) {
          return User
            .create({
              username: payload.given_name,
              email: payload.email,
              password: process.env.fixed_password_googleSignIn,
            })
            .then(user => {
              let token = authenticate(user._id, user.username, user.email);
              res.status(201).json(token)
            })
        } else {
          let token = authenticate(data._id, data.username, data.email);
          res.json(token)
        }
      })
      .catch(err => {
        res.status(500).json({ err: err.message });
      })
  }
}

module.exports = UserControlller