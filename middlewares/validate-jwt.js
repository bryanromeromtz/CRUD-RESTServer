const jwt = require('jsonwebtoken');

const User = require('../models/user');

const validateJWT = async (req, res, next) => {
  const token = req.header('x-token');
  console.log(token);
  if (!token) {
    return res.status(401).json({
      msg: 'There is no token in the request'
    })
  }
  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    // Leer el usuario que corresponde al uid
    const user = await User.findById(uid);
    if (!user) {
      return res.status(401).json({
        msg: 'Invalid token - User does not exist in DB'
      });
    }

    // Verificar si el estado del usuario esta en TRUE
    if (!user.state) {
      return res.status(401).json({
        msg: 'Invalid token - User state : false'
      });
    }

    req.user = user
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