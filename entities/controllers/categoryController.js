const AppDataSource = require("../data-source");
const Category = require("../entities/category");
const Admin = require("../entities/admin")

const createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;
        if (!name) {
            return res.status(400).json({ message: "Name required" });
        }
        const categoryR = AppDataSource.getRepository(Category);
        const newCategory = categoryR.create({name, description})
        const savedCategory = await categoryR.save(newCategory);
        res.status(201).json(savedCategory)
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal Server Error" })
    }
};


// Get all Category
const getCategory = async (req, res) => {
    try {
        const categoryR = AppDataSource.getRepository(Category)
        const categories = await categoryR.find();
        res.json(categories);
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal Server Error" })
    }
}



  

// Get a single category by ID
const getcategoryById = async (req, res) => {
    try {
        const { id } = req.params;

        const categoryRepository = AppDataSource.getRepository(Category);
        const category = await categoryRepository.findOne({ where: { id: parseInt(id) } });

        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        res.json(category);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};




module.exports = { createCategory, getCategory,  getcategoryById }