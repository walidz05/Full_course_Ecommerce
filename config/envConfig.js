require("dotenv").config();

module.exports = {
  PORT: process.env.PORT,
  DB: process.env.DB,
  JWT_SECRET: process.env.SECRET,
};

