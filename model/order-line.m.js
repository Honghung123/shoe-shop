const EntitySchema = require('typeorm').EntitySchema;
module.exports = new EntitySchema({
    name: 'OrderLine',
    tableName: 'order_line',
    columns: {
        id: {
            type: 'int',
            generated: 'rowid',
            primary: true
        },
        quantity: {
            type: 'int',
            nullable: false
        },
        product_id: {
            type: 'int',
            nullable: false,
        },
        order_id: {
            type: 'int',
            nullable: false
        },
        price: {
            type: 'decimal',
            nullable: false
        }
    },
    relations: {
        product: {
            target: "Product",
            type: "many-to-one",
            joinTable: false,
            cascade: false,
            joinColumn: {
                name: 'product_id'
            },
            nullable: false
        },
        order: {
            target: "Order",
            type: "many-to-one",
            joinTable: false,
            cascade: false,
            joinColumn: {
                name: 'order_id'
            },
            nullable: false
        }
    },
    checks:  [{
        expression: 'price > 0'

    }],
    uniques: [
        {
            name: "order_product_unique",
            unique: true,
            columns: ["product_id", "order_id"]
            
        }
    ]
})