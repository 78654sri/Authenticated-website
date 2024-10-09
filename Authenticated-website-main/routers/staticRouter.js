const express = require('express');
const router = express.Router();
const { renderHomePage , renderLoginPage , renderSignUpPage } =  require('../controllers/staticController')

router.get('/', renderHomePage)

router.get('/login', renderLoginPage)
router.get('/signup', renderSignUpPage)


module.exports = router;
