const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();
const { validRole, emailExist, mongoIdExist } = require('../helpers/db-validators');

const {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete
} = require('../controller/users');

const { validateFields } = require('../middlewares/validate-fields');
const { adminRole } = require('../middlewares/validate-roles');
const { validateJWT } = require('../middlewares/validate-jwt');


router.get('/', usuariosGet);

router.put('/:id', [
  check('id', 'Not a valid ID').isMongoId(),
  check('id').custom((id) => mongoIdExist(id)),
  check('role').custom((role) => validRole(role)),

  validateFields
], usuariosPut);

router.post('/', [
  check('name', 'The name is required').not().isEmpty(),
  check('password', 'The password must have 6 or more characters').isLength({ min: 6 }),
  check('email', 'The email is not valid').isEmail(),
  check('email').custom((email) => emailExist(email)),
  check('role').custom((role) => validRole(role)),
  validateFields
], usuariosPost);



router.delete('/:id', [
  validateJWT,
  adminRole,
  check('id', 'Not a valid ID').isMongoId(),
  check('id').custom((id) => mongoIdExist(id)),
  validateFields,
], usuariosDelete);


module.exports = router;
