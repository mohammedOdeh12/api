const express = require("express");
const {createAdmin} = require("../controllers/adminController")
const {getAllAdmins} = require("../controllers/adminController")
const {assignCategoriesToAdmin} = require("../controllers/adminController")
const {getAllAdminsWithCategories} = require("../controllers/adminController")


const router = express.Router();

router.post("/", createAdmin);
router.get("/", getAllAdmins);
router.post("/assign-categories", assignCategoriesToAdmin);


module.exports = router;