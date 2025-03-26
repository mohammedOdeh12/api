const AppDataSource = require("../data-source");
const Product = require("../entities/Product");
const Category = require("../entities/category");

// Create a new product with multiple categories
const createProduct = async (req, res) => {
  try {
    const {name, price, description , stock , categoryIds} = req.body;

    if (!name || !price || !Array.isArray(categoryIds)) {
      return res.status(400).json({ message: "Name, price, and categoryIds array are required" });
    }

    const productRepository = AppDataSource.getRepository(Product);
    const categoryRepository = AppDataSource.getRepository(Category);
    
    const categories = await categoryRepository.findByIds(categoryIds);

    if (categories.length !== categoryIds.length) {
      return res.status(404).json({ message: "One or more categories not found" });
    }

    const newProduct = productRepository.create({ name, price, description , stock , categories,});
    const savedProduct = await productRepository.save(newProduct);

    res.status(201).json(savedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// جلب جميع المنتجات من فئة معينة
const getProductsByCategory = async (req , res) => {
  try {

    const {categoryId} = req.params ; 

    const categoryRepository = AppDataSource.getRepository(Category);
    const category = categoryRepository.find ({
      where : {id : categoryId},
      relations : ["products"]
    })

    if (!category) {
      res.status(500).json({message : "Category not found"})
    }
    res.json(category)
    
  } catch (error) {
    console.log(error)

    res.json({message : "Internal Server Error"})
    
  }
}
// Get all products
const getProducts = async (req, res) => {
    try {
      const productRepository = AppDataSource.getRepository(Product);
      const products = await productRepository.find({ relations: ["categories"] });

      res.json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  
  // Get a single product by ID
  const getProductById = async (req, res) => {
    try {
      const { id } = req.params;
  
      const productRepository = AppDataSource.getRepository(Product);
      const product = await productRepository.findOne({ where: { id: parseInt(id) } });
  
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      res.json(product);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  module.exports = { createProduct, getProducts, getProductsByCategory , getProductById };
