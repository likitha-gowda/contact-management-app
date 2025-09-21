
const {constants} = require('../constants');
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    
    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({
                titile: 'Validation failed',
                message: err.message,
                stackTrace: err.stack,
            })
            break;
        case constants.NOT_FOUND:
            res.json({
                titile: 'Not found',
                message: err.message,
                stackTrace: err.stack,
            })
            break;
        case constants.FORBIDDEN:
            res.json({
                titile: 'Forbidden',
                message: err.message,
                stackTrace: err.stack,
            })
            break;
        case constants.UNAUTHORIZED:
            res.json({
                titile: 'Unauthorized',
                message: err.message,
                stackTrace: err.stack,
            })
            break;
         case constants.SERVER_ERROR:
            res.json({
                titile: 'Server error',
                message: err.message,
                stackTrace: err.stack,
            })
            break;
        default:
            console.log('Error')
            break;
    }
};

module.exports = errorHandler;