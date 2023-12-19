const EntitySchema = require('typeorm').EntitySchema;
module.exports = new EntitySchema({
    name: 'Product',
    tableName : 'product', 
    columns: {
        id: {
            type: 'int',
            primary: true,
            generated: true
        },
        name: {
            type: 'varchar',
            nullable: false,
        },
        stock: {
            type: 'int',
            nullable: false
        },
        description: {
            type: 'char'
        },
        price: {
            type: 'decimal',
            nullable: false
        }
    },

    relations: {
        category: {
            target: "Category",
            type: "many-to-one",
            joinTable: false,
            cascade: false,
            joinColumn: {
                name: "category_id"
            }
        },
    },
    

})