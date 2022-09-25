const {validationResult} = require('express-validator');


exports.register = (req,res) => {
       const errors = validationResult(req);

       if (!errors.isEmpty()) {
           const extractedErrors = [];
           errors
             .array({ onlyFirstError: true })
             .map((err) => extractedErrors.push({ [err.param]: err.msg }));

           return res.status(422).json({
             errors: extractedErrors,
           });
       }
       else{
             
      } 

}