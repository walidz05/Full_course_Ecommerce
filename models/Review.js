const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema(
  {     
    rating: {
      type: Number,
      default: 1,
    },

    comment: {
      type: String,
    },

    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },

  },
  { timestamps: true }
);

module.exports = mongoose.model("review", reviewSchema);

