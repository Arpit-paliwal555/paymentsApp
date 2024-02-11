const jwt = require('jsonwebtoken');
const { JWT_SECRET }  = require('./config');

const authMiddleware = (req, res, next) => {
        const authHeader = req.headers.authorization;
        if (!authHeader ||!authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ msg: "No token" });
        }
        try{
            const decoded = jwt.verify(authHeader.split(' ')[1], JWT_SECRET);
            req.userId = decoded.userId;
            next();
        }catch(err){
            console.log(err);
            return res.status(403).json({ msg: "an error occured" });
        };
}
module.exports = { authMiddleware };
