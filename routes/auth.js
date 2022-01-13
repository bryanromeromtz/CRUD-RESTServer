const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { login } = require('../controller/auth');
const { validateFields } = require('../middlewares/validate-fields');


router.post('/login', [
  check('email', 'The mail is required').isEmail(),
  check('password', 'The password is required').not().isEmpty(),
  validateFields
], login);


module.exports = router;