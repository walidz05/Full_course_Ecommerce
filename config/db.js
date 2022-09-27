const mongoose = require("mongoose");

exports.connect = async (db) => {

      try {

      await mongoose.connect(db).then(() => {
            console.log('db connected')
      }).catch((err) => {
            console.log(err)
      });

      } catch (error) {
            console.log(error);
      }
      
}



