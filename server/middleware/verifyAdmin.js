

const verifyAdmin = (req,res,next)=>{
    
    if(req.user && req.user.roles === "Admin"){
        next()
    }
    else{
        return res.status(401).json({message:'Unauthorized admin '})

    }
}
module.exports = verifyAdmin