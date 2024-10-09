const express = require('express');
const router = express.Router();
const { handleUserLogin, handleUserSignUp } = require('../controllers/userController');

router.get('/logout',function(req,res) {
   return  res.clearCookie('token').redirect('/');
});

router.post('/login',handleUserLogin);
router.post('/signup',handleUserSignUp);
module.exports = router;

//Get

//Post

