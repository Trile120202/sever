const Product = require("../models/Product")
const Cart = require("../models/Cart");
module.exports = {
  addCart: async (req, res) => {
    const userId = req.user.id;
    const { cartItem, quantity } = req.body;

    try {
  
      const cart = await Cart.findOne({ userId });

      if (cart) {
        const existingProduct = cart.products.find(
          (product) => product.cartItem.toString() === cartItem
        );

        if (existingProduct) {
       
          existingProduct.quantity += 1;
        } else {

          cart.products.push({ cartItem, quantity: 1 });
        }

        await cart.save();
        res.status(200).json("Product added to cart");
      } else {

        const newCart = new Cart({
          userId,
          products: [{ cartItem, quantity: 1 }],
        });

        const savedCart = await newCart.save();
        res.status(200).json("Product added to cart");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },


  getCart: async (req, res) => {
    const userId = req.user.id;

    try {
      const cart = await Cart.find({ userId: userId })
        .populate('products.cartItem', "_id name imageUrl price category");

      res.status(200).json(cart);
    } catch (err) {
      res.status(500).json(err);
    }
  },

   deleteCartItem: async (req, res) => {
    const cartItemId = req.params.cartItem;
  
    try {
      const updatedCart = await Cart.findOneAndUpdate(
        { 'products._id': cartItemId },
        { $pull: { products: { _id: cartItemId } } },
        { new: true }
      );
  
      if (!updatedCart) {
        return res.status(404).json({ message: 'Cart item not found' });
      }
  
      res.status(200).json(updatedCart);
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete cart item' });
    }
  },
  

  //DELETE
  resetCart: async (req, res) => {
    try {
      await Cart.findByIdAndDelete(req.user.id);
      res.status(200).json("Cart has been reset");
    } catch (err) {
      res.status(500).json(err);
    }
  },
};