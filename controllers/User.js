const {validationResult} = require('express-validator');
const UserModel = require("../models/User");
const {createToken,hashPassword,verfiyPassword} = require("../services/authServices");
const bcrypt = require("bcrypt");
const {JWT_SECRET} = require('../config/envConfig');


exports.register = async (req,res) => {

       
  const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      } 

  
  else {
    const { name, email, password } = req.body;

    console.log(name, email, password);

    try {
      const checkEmail = await UserModel.findOne({ email });

      if (checkEmail) {
        return res.status(401).json({
           errorEmail: "this email has already exist" ,
        });
      } else {
        const hash = await hashPassword(password);

        const user = await UserModel.create({
          name,
          email,
          password: hash,
          admin: true,
        });

        const token = createToken(user, JWT_SECRET);

        return res.status(200).json({
          msg: "register successfuly",
          token,
        });
      }
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
  } 

}



//login
exports.login = async (req,res) => {

    const {email,password} = req.body;

      const errors = validationResult(req);

        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array()});
        }
        
        else {
          
          const user = await UserModel.findOne({ email });

          if (!user) {
            return res
              .status(400)
              .json({ errors: [{ msg: "email not found", param: "email" }] });
          } else {
            const compare = await verfiyPassword(password, user.password);

            if (compare) {
              if (user.admin) {
                const token = createToken(user, JWT_SECRET);
                return res.status(200).json({
                  msg: "login successfuly",
                  token,
                  admin: true,
                });
              } else {
                const token = createToken(user, JWT_SECRET);
                return res.status(200).json({
                  msg: "login successfuly",
                  token,
                  admin: false,
                });
              }
            } else {
              return res
                .status(400)
                .json({
                  errors: [{ msg: "password dont match", param: "password" }],
                });
            }
          }
        }

}