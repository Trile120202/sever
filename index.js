const express = require('express')
const app = express();
const port = 3000
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const productRoute = require('./routes/product')
const authRoute = require('./routes/auth')
const userRoute = require('./routes/user')
const cartRoute = require('./routes/cart')
const orderRoute = require('./routes/orders')
const favoritesRoute = require('./routes/favorite')

dotenv.config()
mongoose.connect(process.env.MONGO_URL).then(() => console.log("db connected")).catch((err) => console.log(err));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cors({
  origin: ['http://localhost:3000', 'https://admin-production-1601.up.railway.app'],
}));

app.use("/api/", authRoute);
app.use("/api/users", userRoute);
app.use("/api/cart", cartRoute);
app.use('/api/products', productRoute);
app.use("/api/orders", orderRoute);
app.use("/api/favorite", favoritesRoute);

app.listen(process.env.PORT || port, () => console.log(`App listening on port ${process.env.PORT}!`))
