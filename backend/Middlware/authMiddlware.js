const jwt=require('jsonwebtoken');

exports.verifyToken=async(req,res,next)=>{
try {
    const authHeader=req.headers.authorization;
    if (!authHeader)res.status(401).json({message:"No token provided"});
    const token=authHeader.split(' ')[1];
    const decoded=jwt.verify(token,process.env.JWT_SECRET);
    req.user=decoded;
    next();

} catch (error) {
    res.status(403).json({ message: 'Invalid or expired token!' }); 
}
}