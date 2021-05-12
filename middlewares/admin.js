const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')


module.exports = function verifyIsAdmin(req, res, next) {

  const bearerToken = req.headers['authorization'];

  if (typeof bearerToken !== 'undefined') {
    const bearer = bearerToken.split(' ');
    const token = bearer[1];
    req.token = token;
    var decodedToken = jwt.verify(token, process.env.SECRET);
    if(decodedToken.user.is_admin == false){
        return res.status(403).json({ message: 'Admin can only have access to this routes' });
    }
    next();
  } else {
    return res.status(403).json({ message: 'Authorization token required' });
  }

}