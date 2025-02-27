const Product = require('../models/Product');

module.exports = {
    createProduct: async(req, res) => {
        const newProduct = new Product(req.body);
        try {
            await newProduct.save();
            res.status(200).json("product created")
        } catch (error) {
            res.status(500).json("failed to create product")
        }
    },

    getAllProducts: async (req, res) => {
        try {
            const products = await Product.find().sort({ createdAt: -1})
            res.status(200).json(products)
        } catch (error) {
            res.status(500).json(error)
        }
    },

    getProduct: async (req, res) => {

        try {
           const product = await Product.findById(req.params.id);
           const {__v, createdAt, ...productData} =  product._doc;
           res.status(200).json(productData)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    updateProduct: async (req, res) => {
        try {
            const updatedProduct = await Product.findByIdAndUpdate(
                req.params.id,
                { $set: req.body },
                { new: true }
            );
            res.status(200).json(updatedProduct);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    deleteProduct: async (req, res) => {
        try {
            await Product.findByIdAndDelete(req.params.id);
            res.status(200).json("Product deleted");
        } catch (error) {
            res.status(500).json(error);
        }
    },

    searchProducts: async (req, res) => {
        try {
            const results = await Product.aggregate(
                [
                    {
                        $search: {
                          index: "food",
                          text: {
                            query: req.params.key,
                            path: {
                              wildcard: "*"
                            }
                          }
                        }
                      }
                ]
            )
            res.status(200).send(results);
        } catch (err) {
            res.status(500).json(err);
        }
    }
}