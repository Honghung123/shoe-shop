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
        description: {
            type: 'varchar',
            nullable: false
        },
        price: {
            type: 'decimal',
            nullable: false
        },
        brand_id: {
            type: 'int',
            nullable: false
        },
        cat_id: {
            type: 'int',
            nullable: false
        },
        is_deleted: {
            type: 'boolean',
            default: 0
        }
    },
    relations: {
        category: {
            target: "Category",
            type: "many-to-one",
            joinTable: false,
            cascade: false,
            joinColumn: {
                name: "cat_id"
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