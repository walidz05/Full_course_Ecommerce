const express = require('express');
const router = express.Router();
const {register} = require('../../controllers/userController');
const {userValidator} = require('../../validations/userValidator');

router.post('/register',userValidator,register);



module.exports = router;









