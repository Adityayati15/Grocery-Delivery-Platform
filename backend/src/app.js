import express from "express";
import cookieParser from "cookie-parser"
import productRoutes from "./routes/product.routes.js";
import { errorHandler } from "./middleware/error.middleware.js";
import authRoutes from "./routes/auth.routes.js"
import cartRoutes from "./routes/cart.routes.js";
import orderRoutes from "./routes/order.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import addressRoutes from "./routes/address.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import deliveryRoutes from "./routes/delivery.routes.js";
import cors from "cors";

const app = express();
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);
app.use(express.json());
app.use(cookieParser());

app.use(productRoutes);
app.use("/auth", authRoutes);
app.use("/cart",cartRoutes);
app.use("/orders",orderRoutes);
app.use("/payments",paymentRoutes);
app.use("/addresses",addressRoutes);
app.use("/admin",adminRoutes);
app.use("/delivery",deliveryRoutes);

app.use(errorHandler);


export default app;