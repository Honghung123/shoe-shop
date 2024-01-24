const EntitySchema = require('typeorm').EntitySchema;

module.exports = new EntitySchema({
    name: 'WishList',
    tableName: 'wish_list', 
    columns: {
        product_id: {
            type: 'int',
            nullable: false,
            primary: true
        },
        user_id: {
            type: 'int',
            nullable: false,
            primary: true
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
        user: {
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
   
});
