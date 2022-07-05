const customError = require('../helpers/error/customError')
const customErrorHandler = (err, req, res, next) => {
    console.log(err);

    if (err.code === 11000) 
        err = new customError("Duplicate key found",400)

    res.
        status(err.status || 500)
        .json({
            success: false,
            message : err.message
        })

}

module.exports = customErrorHandler;