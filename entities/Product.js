const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "Product",
    tableName: "products",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        name: {
            type: "varchar",
            length: 255,
        },
        description: {
            type: "text",
            nullable: true,
        },
        price: {
            type: "decimal",
            precision: 10,
            scale: 2,
        },
        stock: {
            type: "int",
            default: 0,
        },
        createdAt: {
            type: "timestamp",
            default: () => "CURRENT_TIMESTAMP",
        },
    },
    relations: {
        categories: {
          target: "Category",
          type: "many-to-many",
          joinTable: {
            name: "product_categories",
          },
          inverseSide: "products",
        },
    },
});
