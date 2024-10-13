require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const { swaggerMiddleware, swaggerSetup } = require("./SwaggerOptions");
const productRoutes = require("./Routes/ProductsRoutes");
const paymentRoutes = require("./Routes/PaymentRoutes");
const { stripeWebhook } = require("./Controllers/PaymentController");
const app = express();
const PORT = process.env.PORT || 5001;

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Middleware
const corsOptions = {
  origin: ["http://localhost:3000", "https://stipe-react.netlify.app"],
  methods: ["GET", "POST"],
  credentials: true,
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "Authorization",
  ],
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

// Премести bodyParser.raw() за webhook маршрута преди да регистрираш рутовете

// Регистриране на рутовете
app.use("/api/products", productRoutes);
app.use("/api/payment", paymentRoutes);

// Swagger docs
app.use("/api-docs", swaggerMiddleware, swaggerSetup);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
