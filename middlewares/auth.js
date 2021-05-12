const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')


module.exports = function verifyToken(req, res, next) {

  const bearerToken = req.headers['authorization'];

  if (typeof bearerToken !== 'undefined') {
    const bearer = bearerToken.split(' ');
    const token = bearer[1];
    req.token = token;
    jwt.verify(req.token, process.env.SECRET, (err, authData) => {
      if (err) {
        res.status(400).json({ message: err.message });
      }
    })
    next();
  } else {
    return res.status(403).json({ message: 'authorization token required' });
  }

}