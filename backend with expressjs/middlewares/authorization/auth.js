const customError = require('../../helpers/error/customError');
const jwt = require('jsonwebtoken');
const {isTokenIncluded,getAccessTokenFromHeaders} = require('../../helpers/authorization/tokenHelpers');

const getAccess2Route = (req, res, next) => {
    const {JWT_SECRET_KEY} = process.env;
    if(!isTokenIncluded(req))
        return next(new customError("You are not authorized to access this page."),401);

    const access_token = getAccessTokenFromHeaders(req)

    jwt.verify(access_token,JWT_SECRET_KEY,(err,decoded) => {
        if(err)
            return next(new customError("You are not authorized to access this page.",401));

        console.log(decoded);
        next();
    })

}



module.exports = {
    getAccess2Route,
}