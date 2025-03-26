const express = require("express");
const AppDataSource = require("./data-source");
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const adminRoutes = require("./routes/adminRoutes");


const app = express();
app.use(express.json()); // لتفسير بيانات JSON في الطلبات


app.get('/', (req, res) => {
    res.send("<h1>Welcome Page</h1>")
})
app.use("/products", productRoutes);
app.use("/categories", categoryRoutes);
app.use("/admins", adminRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
