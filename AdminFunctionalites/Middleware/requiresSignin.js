const jwt = require('jsonwebtoken')

exports.requiresignin = (req, res, next) => {

    if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];
        const user = jwt.verify(token, 'json');
        req.user = user;
    }else{
    return res.status(400).json({message:"Sign in First"})
    }
    next();

}
