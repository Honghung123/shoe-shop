const EntitySchema = require("typeorm").EntitySchema;

module.exports = new EntitySchema({
    name: "Favourite",
    tableName: "favourite",
    columns: {
        id: {
            type: "int",
            primary: true,
            generated: "rowid",
        },
        product_id: {
            type: "int",
            nullable: false,
        },
        user_id: {
            type: "int",
            nullable: false,
        },
    },
    relations: {
        user: {
            target: "User",
            type: "many-to-one",
            joinTable: false,
            cascade: false,
            joinColumn: {
                name: "user_id",
            },
            nullable: false,
        },
    },
    uniques: [
        {
            name: "user_product_unique_favourite",
            unique: true,
            columns: ["product_id", "user_id"],
        },
    ],
});
