const User = require('../models/user');
const asyncErrorWrapper = require('express-async-handler');
const {sendJwtToClient} = require('../helpers/authorization/tokenHelpers');

const register = asyncErrorWrapper(async (req, res, next) => {
    
    const {name,email,password} = req.body;

    const user = await User.create({ name, email, password });

    sendJwtToClient(user, res); 

})

const tokentest = (req, res, next) => {
    res.json({
        success: true,
        message: 'Token is valid'
    })
}



module.exports = {
    register,
    tokentest,
}