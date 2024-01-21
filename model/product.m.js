const EntitySchema = require('typeorm').EntitySchema;

module.exports = new EntitySchema({
    name: 'Product',
    tableName : 'product', 
    columns: {
        id: {
            type: 'int',
            primary: true,
            generated: 'rowid'
        },
        name: {
            type: 'varchar',
            nullable: false,
        },
        color: {
            type: 'varchar',
            nullable: false
        },
        description: {
            type: 'varchar',
            nullable: true
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
        brand: {
            target: 'Brand',
            type: 'many-to-one',
            joinTable: false,
            joinColumn: {
                name: 'brand_id'
            }
        },
        
    },
    
    checks:  [{
        expression: 'price > 0'

    }],
})