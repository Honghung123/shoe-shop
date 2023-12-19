const EntitySchema = require('typeorm').EntitySchema;
module.exports = new EntitySchema({
    name: 'CartLine',
    tableName : 'cart_line', 
    columns: {
        id: {
            type: 'int',
            primary: true,
            generated: true
        },
        quantity: {
            type: 'int',
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
        cart: {
            target: "User",
            type: "many-to-one",
            joinTable: false,
            cascade: false,
            joinColumn: {
                name: 'user_id'
            },
            nullable: false
        }
    },
    // indices: [
    //     {
    //         name: "user_product_unique",
    //         unique: true,
    //         columns: ["user_id", "product_id"]
    //     }
    // ]
    

})