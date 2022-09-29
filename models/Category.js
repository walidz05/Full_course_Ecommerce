const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema({
  name: {
    required: true,
    type: String,
    unique:true
  },
});

const categoryModel = mongoose.model("category", CategorySchema);
module.exports = categoryModel;
