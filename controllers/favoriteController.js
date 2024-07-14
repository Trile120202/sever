const Favorite = require("../models/Favorite");

module.exports = {
    addFavorite: async (req, res) => {
        const { product } = req.body;
        const userId = req.user.id;

        try {
            let favorite = await Favorite.findOne({ userId });

            if (!favorite) {
                favorite = new Favorite({ userId, products: [product] });
            } else {
                favorite.products.push(product);
            }

            await favorite.save();
            res.status(200).json(favorite);
        } catch (error) {
            res.status(500).json({ message: "Failed to add favorite" });
        }
    },

    getFavorites: async (req, res) => {
        const userId = req.user.id;

        try {
            const favorite = await Favorite.findOne({ userId });
            if (!favorite) {
                return res.status(404).json({ message: "No favorites found" });
            }

            res.status(200).json(favorite.products);
        } catch (error) {
            res.status(500).json({ message: "Failed to get favorites" });
        }
    },

    removeFavorite: async (req, res) => {
        const userId = req.user.id;
        const { productId } = req.params;

        try {
            const favorite = await Favorite.findOne({ userId });
            if (!favorite) {
                return res.status(404).json({ message: "No favorites found" });
            }

            favorite.products = favorite.products.filter(
                (product) => product.productId !== productId
            );

            await favorite.save();
            res.status(200).json(favorite.products);
        } catch (error) {
            res.status(500).json({ message: "Failed to remove favorite" });
        }
    },
}
