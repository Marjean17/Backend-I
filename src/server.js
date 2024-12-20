import express from "express";
import productRouter from "./routes/product.router.js";
import cartRouter from "./routes/cart.router.js";
import path from 'path';

const app = express();
const PORT = 8080;

app.use('/static', express.static(path.join(process.cwd(), "src", "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);

// console.log(process.cwd())
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));


