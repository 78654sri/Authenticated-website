const { validateToken } = require('../utils/auth');

exports.checkForToken = function(req, res, next){
    const token = req.cookies["token"];
    if(!token) return next();

    try{
        const userPayload = validateToken(token);
        req.user = userPayload;
        next();
    }catch(error){
        next();
    }

};