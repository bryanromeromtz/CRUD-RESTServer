const User = require('../models/user');
const bcrypt = require('bcryptjs');

//const { validateFields } = require('../middlewares/validate-fields')

const usuariosGet = async (req, res) => {
  //const { q, name = "No name", work, apikey } = req.query
  const { limit = 5, from = 0 } = req.query;
  // Este codigo de aqui abajo es lo mismo que usar Promise.all([]) de la linea 16
  // const users = await User.find({ state: true })
  //   .skip(Number(from))
  //   .limit(Number(limit))

  // const total = await User.countDocuments({ state: true });

  const [total, users] = await Promise.all([
    User.countDocuments({ state: true }),
    User.find({ state: true })
      .skip(Number(from))
      .limit(Number(limit))
  ])

  res.json({
    total,
    users,
  });
}

const usuariosPut = async (req, res) => {
  const { id } = req.params;
  const { _id, email, password, google, ...rest } = req.body;
  if (password) {
    const salt = bcrypt.genSaltSync();
    rest.password = bcrypt.hashSync(password, salt);
  }

  const user = await User.findByIdAndUpdate(id, rest)


  res.json(user);
}

const usuariosPost = async (req, res) => {


  const { name, email, password, role } = req.body;
  const user = new User({ name, email, password, role });

  //Verificar si el correo existe

  //Encriptar la contraseña del user
  const salt = bcrypt.genSaltSync();

  user.password = bcrypt.hashSync(password, salt);

  // Guardar en base de datos
  await user.save()
  res.json({
    user
  });
}

const usuariosDelete = async (req, res) => {
  const { id } = req.params;


  // Fisicamente lo borramos
  // Manera tradicional borrando completamente el usuario
  //const user = await User.findByIdAndDelete(id, body);
  // Manera moderna de borrar un usuario sin borrarlo de la base de datos
  const user = await User.findByIdAndUpdate(id, { state: false });

  const authenticatedUser = req.user;
  res.json({
    user,
    authenticatedUser,
  });
}

module.exports = {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
}