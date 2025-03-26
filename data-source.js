const { DataSource } = require("typeorm");
require("reflect-metadata");
require("dotenv").config(); // تحميل متغيرات البيئة من ملف .env

const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 3306,
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "Password@123",
    database: process.env.DB_NAME || "mydatabase",
    synchronize: true,  // يُنشئ الجداول تلقائيًا بناءً على الـ Entities
    logging: true,
    entities: [__dirname + "/entities/*.js"], // تحديد مسار الـ Entities
});

AppDataSource.initialize()
    .then(() => console.log("✅ Database Connected Successfully! 🚀"))
    .catch((err) => console.error("❌ Database Connection Error:", err));

module.exports = AppDataSource;
