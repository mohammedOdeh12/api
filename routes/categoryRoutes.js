const express = require("express")
const { createCategory } = require("../controllers/categoryController")
const { getCategory } = require("../controllers/categoryController")

const { getcategoryById } = require("../controllers/categoryController")


const router = express.Router();

router.post("/", createCategory)
router.get("/", getCategory)
router.get("/:id" , getcategoryById )





module.exports = router;