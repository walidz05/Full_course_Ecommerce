
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


exports.hashPassword = async(password) => {
      const Hashpassword = await bcrypt.hash(password,10);
      return Hashpassword;
}

exports.createToken = (user, JWT_SECRET) => {
  const token = jwt.sign({ id: user._id, name: user.name }, JWT_SECRET, {
    expiresIn: "7d",
  });
  return token;
};

exports.verfiyPassword  = async (userPassword,passwordReq) => {
 await bcrypt.compare(passwordReq, userPassword);
}




