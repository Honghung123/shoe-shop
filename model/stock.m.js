const EntitySchema = require('typeorm').EntitySchema;

module.exports = new EntitySchema({
    name: 'Stock',
    tableName : 'product_stock', 
    columns: {
        id: {
            type: 'int',
            primary: true,
            generated: 'rowid'
        },
        product_id: {
            type: 'varchar',
            nullable: false,
            
        },  
        size_id: {
            type: 'varchar',
            nullable: true
        },
        quantity: {
            type: 'int',
            nullable: false,
        }
    },

    relations: {
        product: {
            target: "Product",
            type: "many-to-one",
            joinTable: false,
            cascade: false,
            joinColumn: {
                name: "product_id"
            },
            nullable: false
        },
        size: {
            target: 'Size',
            type: 'many-to-one',
            joinTable: false,
            joinColumn: {
                name: 'size_id'
            },
            nullable: false
        },
        
    },
    checks:  [{
        expression: 'quantity >= 0'

    }],
    uniques: [
        {
            name: "stock_product_size",
            columns: ["product_id", "size_id"],
        }
    ]
    

})