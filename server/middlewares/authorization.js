const jwt = require('jsonwebtoken');

function decode(req, res, next) {
  try {
    var decoded = jwt.verify(req.headers.token, process.env.jwt_secret);
    req.decoded = decoded;
    next()
  } catch(err) {
    res.status(500).json({err: err.message})
  }
}

module.exports = decode