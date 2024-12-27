import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const verifytoken=async(req,res,next)=>{
    const mytoken=req.cookies.token;
    
    if(!mytoken){
        return res.status(401).json({
            message:"token not found",
            success:false
        })
    }
    try {
        
        
         jwt.verify(mytoken,process.env.SECRET_KEY,(err,user)=>{
            if (err) {
                console.error("Token verification error:", err);
                return res.status(403).json({
                    message: "Invalid or expired token",
                    success: false,
                });
            }
           
            req.user =user;
            next();
        });
        
    } catch (error) {
        console.error("Error in token verification middleware:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
    
}



export const requireAdmin = (req, res, next) => {
    try {
      
      const currentUserEmail = req.user?.email; 
  
      

      const admin = process.env.ADMIN_EMAIL === currentUserEmail;
  
      if (!admin) {
        return res.status(403).json({ message: "Unauthorized - you must be an admin" });
      }
  
      next();
    } catch (error) {
     
      return res.status(500).json({ message: "Internal server error" });
    }
  };
  
