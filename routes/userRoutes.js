const express = require('express');
const router = express.Router();
const {register,login} = require('../controllers/User');
const {userValidator,userValidatorLogin} = require('../validations/userValidator');

router.post('/register',userValidator,register);
router.post("/login", userValidatorLogin,login);

module.exports = router;









