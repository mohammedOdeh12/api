const AppDataSource = require("../data-source");
const Admin = require("../entities/admin");
const Category = require("../entities/category")
const bcrypt = require("bcrypt");



// create Admin
const createAdmin = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name, !email, !password) {
            return res.status(400).json({ message: "Name and Email and password is required" });
        }
        const adminRepository = AppDataSource.getRepository(Admin);


        const existingAdmin = await adminRepository.findOne({ where: { email } });
        // التحقق مما إذا كان البريد الإلكتروني مسجلاً مسبقًا
        if (existingAdmin) {
            return res.status(400).json({ message: "Email already in use" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = adminRepository.create({ name, email, password: hashedPassword })
        await adminRepository.save(newAdmin)
        res.status(201).json({ message: "Admin created successfully", admin: { id: newAdmin.id, name, email } });


    } catch (error) {
        res.status(500).json({ message: "Error creating admin", error })
    }
}

const getAllAdmins = async (req, res) => {
    try {
        const adminRepository = AppDataSource.getRepository(Admin);
        // جلب جميع المسؤولين
        const admins = await adminRepository.find();

        res.status(200).json(admins);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// ربط مسؤول بفئات
const assignCategoriesToAdmin = async (req, res) => {

    try {
        const { adminId, categoryIds } = req.body;


        if (!adminId, Array.isArray(categoryIds) , categoryIds.length === 0) {
            res.status(400).json({ message: "Invalid data" })
        }
        const adminRepository = AppDataSource.getRepository(Admin);
        const categoryRepository = AppDataSource.getRepository(Category);



        // التحقق مما إذا كان المسؤول موجودًا
        const admin = adminRepository.findOne({ where: { id: adminId }, relations: ["categories"] })
        if (!admin) {
            res.status(404).json({ message: "Admin not Found" })
        }

        // جلب الفئات من قاعدة البيانات
        const categories = categoryRepository.findBy(categoryIds)
        if ((await categories).length == categoryIds.length) {

            res.status(404).json({ message: "Some categories not found" })
        }

        // ربط المسؤول بالفئات
        admin.categories = [...categories, ...admin.categories]
        await adminRepository.save(admin)

        res.status(200).json({ message: "Categories assigned successfully", admin });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" })

    }
}
// جلب جميع المسؤولين مع فئاتهم
const getAllAdminsWithCategories = async (req , res ) => {
    try {

        const adminRepository = AppDataSource.getRepository(Admin)
        const admins = adminRepository.findBy({relations :["categories"]})
        res.status(200).json(admins)
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message : "Internal Server Error"})
        
    }
}

module.exports = { createAdmin, getAllAdmins , assignCategoriesToAdmin , getAllAdminsWithCategories }