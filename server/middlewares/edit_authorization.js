const jwt = require('jsonwebtoken');

function decode(req, res, next) {
  // console.log(req.headers)
  try {
    var decoded = jwt.verify(req.headers.token, process.env.jwt_secret);
    // console.log(req.headers.userid, '===', decoded.id)
    if (req.headers.userid === decoded.id) {
      req.decoded = decoded;
      next()
    } else {
      res.status(500).json(`you don't have permission to edit this article`)
    }
  } catch(err) {
    res.status(500).json({err: err.message})
  }
}

module.exports = decode