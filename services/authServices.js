
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


exports.hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
      const Hashpassword = await bcrypt.hash(password,salt);
      return Hashpassword;
}

exports.createToken = (user, JWT_SECRET) => {
  const token = jwt.sign({ id: user._id, name: user.name,email:user.email }, JWT_SECRET, {
    expiresIn: "7d",
  });
  return token;
};

exports.verfiyPassword = async (passwordReq,userPassword) => {
  return await bcrypt.compare(passwordReq, userPassword);
}




