const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "Admin",
    tableName: "admins",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        name: {
            type: "varchar",
            length: 255,
            unique: true,
        },
        email: {
            type: "varchar",
            length: 255,
            unique: true,
        },
        password: {
            type: "varchar",
            length: 255,
        },
        role: {
            type: "enum",
            enum: ["superadmin", "admin", "moderator"],
            default: "admin",
        },
        createdAt: {
            type: "timestamp",
            default: () => "CURRENT_TIMESTAMP",
        },
    },
   
});
