const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },

    size: {
      required: true,
      type: String,
    },

    color: {
      required: true,
      type: String,
    },

    quantites: {
      required: true,
      type: Number,
    },

    address: {
      required: true,
      type: Map,
    },

    status: {
      default: false,
      type: Boolean,
    },

    received: {
      default: false,
      type: Boolean,
    },
    
  },
  { timestamps: true }
);
module.exports = mongoose.model("order", orderSchema);