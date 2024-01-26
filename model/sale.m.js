const EntitySchema = require("typeorm").EntitySchema;

module.exports = new EntitySchema({
    name: "Sale",
    tableName: "sale",
    columns: {
        id: {
            type: "int",
            primary: true,
            generated: "rowid",
        },
        percent: {
            type: "int",
            nullable: false,
        },
        product_id: {
            type: "int",
            nullable: false,
        },
        expire: {
            type: 'timestamptz',
            nullable: false
        }
    },
    relations: {
        product: {
            target: "Product",
            type: "one-to-one",
            joinTable: false,
            cascade: false,
            joinColumn: {
                name: "product_id",
            },
        },
    },

    checks: [
        {
            expression: "percent > 0 AND percent <= 100",
        },
    ],
    uniques: [
        {
            name: "product_id",
            columns: ["product_id"],
        }
    ]
});
