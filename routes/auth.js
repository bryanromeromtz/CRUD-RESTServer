const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { login, googleSignIn } = require('../controller/auth');
const { validateFields } = require('../middlewares/validate-fields');


router.post('/login', [
  check('email', 'The mail is required').isEmail(),
  check('password', 'The password is required').not().isEmpty(),
  validateFields
], login);

router.post('/google', [
  check('id_token', 'id_token is required').not().isEmpty(),
  validateFields
], googleSignIn);


module.exports = router;