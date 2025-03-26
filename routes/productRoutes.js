const express = require("express");
const {createProduct} = require("../controllers/productController");
const {getProducts} = require("../controllers/productController");
const {getProductById} = require("../controllers/productController");
const {getProductsByCategory} = require("../controllers/productController");

const router = express.Router();

router.post("/", createProduct); // Create product
router.get("/" , getProducts);
router.get("/:id" , getProductById);
router.get("/category/:categoryId/products", getProductsByCategory);




module.exports = router;
