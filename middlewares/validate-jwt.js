const jwt = require('jsonwebtoken');

const validateJWT = (req, res, next) => {
  const token = req.header('x-token');
  console.log(token);
  if (!token) {
    return res.status(401).json({
      msg: 'There is no token in the request'
    })
  }
  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY)
    req.uid = uid;
    console.log(uid);
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: 'Invalid Token'
    })
  }
}

module.exports = {
  validateJWT
}