const jwt = require('jsonwebtoken')

const verifyJWT = (req, res, next)=>{
    console.log("verifyJWT");
    const authHeader = req.headers.authorization || req.headers.Authorization
    if(!authHeader?.startsWith('Bearer ')){
        return res.status(401).json({message:''})
    }
    const token = authHeader.split(' ')[1]

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err,decode)=>{
            if(err) return res.status(403).json({message:'Forbidden'})
            req.user = decode
          //  console.log(req.user);
            next()
        }
    )
}
 
 
module.exports = verifyJWT