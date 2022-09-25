const mongoose = require("mongoose");

exports.connect = async (db) => {
      try {

      await mongoose.connect(db,() => {
            console.log("connected successfuly")
      });

      } catch (error) {
            console.log(error);
      }
}



