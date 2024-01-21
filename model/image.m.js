const EntitySchema = require('typeorm').EntitySchema;

module.exports = new EntitySchema({
    name: 'ProductImage',
    tableName : 'product_image', 
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
        image: {
            type: 'varchar',
            nullable: true
        },
        
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
    },
    uniques: [
        {
            name: "product_imgae",
            columns: ["product_id", "image"],
        }
    ],
    
    

})