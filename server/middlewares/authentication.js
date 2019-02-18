
const jwt = require('jsonwebtoken');

function generateToken(id, username, email) {
  try {
    return jwt.sign({
      id: id,
      username: username,
      email: email
    }, process.env.jwt_secret);
  }
  catch(err) {
    console.log(err)
  }
}

module.exports = generateToken;