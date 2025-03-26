const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "Category",
    tableName: "categories",
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
        description: {
            type: "text",
            nullable: true,
        },
        createdAt: {
            type: "timestamp",
            default: () => "CURRENT_TIMESTAMP",
        },
    },
    relations: {
        products: {
          target: "Product",
          type: "many-to-many",
          joinTable: {
            name: "product_categories",
          },
          inverseSide: "categories",
        },
      },
     
});
