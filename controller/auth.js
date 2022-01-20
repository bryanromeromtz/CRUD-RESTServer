const bcryptjs = require('bcryptjs');
const { generateJWT } = require('../helpers/generate-jwt');
const User = require('../models/user');


const login = async (req, res) => {

  const { email, password } = req.body;
  try {
    // Verificar si el usuario existe
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({
        msg: 'User / Password does not exist - email'
      })
    }
    // Verificar si el usuario esta activo o no se ha borrado de la base de datos
    if (!user.state) {
      res.status(400).json({
        msg: 'User removed from database - state: false'
      })
    }
    // Verificar la constraseña
    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      res.status(400).json({
        msg: 'Password invalid'
      })
    }
    // Generar JWT
    const token = await generateJWT(user.id);
    //console.log(token);

    res.json({
      user,
      token,
      msg: 'login ok'
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: 'Talk to the administrator'
    })
  }
}

const googleSignIn = async (req, res) => {
  const { id_token } = req.body;
  res.json({
    id_token,
    msg: 'Its ok'
  })
}
module.exports = {
  login,
  googleSignIn
}