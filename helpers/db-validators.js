const Role = require('../models/role');
const User = require('../models/user');


const validRole = async (role = '') => {
  const roleExists = await Role.findOne({ role });
  if (!roleExists) {
    throw new Error(`The role ${role} is not registered in the database`);
  }
};

const emailExist = async (email = '') => {
  const emailExists = await User.findOne({ email });
  if (emailExists) {
    throw new Error(`The Email: ${email}, already exists`);
  }
}


const mongoIdExist = async (id) => {
  const userIdExist = await User.findById(id);
  if (!userIdExist) {
    throw new Error(`The ID: ${id}, does not exist`);
  }
}

module.exports = {
  validRole,
  emailExist,
  mongoIdExist
}