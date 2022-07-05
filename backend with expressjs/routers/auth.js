const express = require('express')
const {register, tokentest} = require('../controllers/auth')
const {getAccess2Route} = require('../middlewares/authorization/auth')
const router = express.Router();

router.post('/register',register)
router.get('/tokentest',getAccess2Route,tokentest)

module.exports = router;