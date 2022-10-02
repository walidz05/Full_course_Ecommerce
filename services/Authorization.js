const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../config/envConfig');

class Authotization {
      authorized (req,res,next){
      
        
                  const tokenHeader = req.headers.authorization;
              
                   if (tokenHeader) {

                   const token = tokenHeader.split('Bearer ')[1];
                        
                   const verify = jwt.verify(token,JWT_SECRET);

                   if(verify)
                   {
                         next();
                  }
                  else {

                        return res.status(401).json({
                          errors: [{ msg: "invalid token" }],
                        });  
                  }
                   
                   } else {
                     return res.status(401).json({
                       errors: [
                         { msg: "you are not authenticated please log in" },
                       ],
                     });
                   }
         

      }

}

module.exports = new Authotization()
