const { Schema, model } = require('mongoose');

const UserSchema = Schema({
  name: {
    type: 'string',
    required: [true, "The name is required"]
  },
  email: {
    type: 'string',
    required: [true, "The email is required"],
    unique: true
  },
  password: {
    type: 'string',
    required: [true, "The password is required"]
  },
  img: {
    type: 'string',
  },
  role: {
    default: 'USER_ROLE',
    type: 'string',
    required: true,
    emun: ['ADMIN_ROLE', 'USER_ROLE']
  },
  state: {
    type: Boolean,
    default: true
  },
  google: {
    type: Boolean,
    default: false
  }

});

// Ocultar password y __v de la extraccion de datos
UserSchema.methods.toJSON = function () {
  const { __v, password, _id, ...user } = this.toObject();
  // console.log(__v);
  // console.log(password);
  // console.log(user);
  user.uid = _id;
  //console.log(user.uid);

  return user;
}

module.exports = model('User', UserSchema);