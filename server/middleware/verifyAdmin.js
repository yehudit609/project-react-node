

const verifyAdmin = (req,res,next)=>{
    console.log("verifyAdmin "+req.user.roles);
    if(req.user && req.user.roles === "Admin"){
        next()
    }
    else{
        return res.status(401).json({message:'Unauthorized admin '})

    }
}
module.exports = verifyAdmin