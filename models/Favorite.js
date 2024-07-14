const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    products: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Product' },
        name: { type: String, required: true },
        category: { type: String, required: true },
        imageUrl: { type: String, required: true },
        price: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Favorite", favoriteSchema);
