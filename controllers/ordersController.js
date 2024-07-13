const Orders = require("../models/Orders");

module.exports = {
    getOrders: async (req, res) => {
        try {
            const allOrder = await Orders.find().populate({
              path: 'products.productId',
              select: '-oldPrice -description -category',
            });

            res.status(200).json(allOrder);
        } catch (error) {
            res.status(500).json({ message: "Failed to get orders" });
        }
    },

    getUserOrders: async (req, res) => {
        const userId = req.user.id;
      
        try {
          const userOrders = await Orders.find({ userId })
            .populate({
              path: 'products.productId',
              select: '-oldPrice -description -category', 
            }) 
            .exec();
      
          res.status(200).json(userOrders);
        } catch (error) {
          res.status(500).json({ message: "Failed to get user orders" });
        }
    },

    createOrder: async (req, res) => {
        const { userId, customerId, products, subtotal, total, payment_status } = req.body;

        const order = new Orders({
            userId,
            customerId,
            products,
            subtotal,
            total,
            payment_status
        });

        try {
            const savedOrder = await order.save();
            res.status(201).json(savedOrder);
        } catch (error) {
            res.status(500).json({ message: "Failed to create order" });
        }
    }
};
