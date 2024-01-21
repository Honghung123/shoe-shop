const EntitySchema = require('typeorm').EntitySchema
module.exports = new EntitySchema({
    tableName: 'brand',
    name: 'Brand',
    columns: {
        id: {
            type: 'int',
            generated: 'rowid',
            primary: true
        },
        brand_name: {
            type: 'varchar',
            nullable: false
        }
    },
    // relations: {
    //     products: {
    //         target: 'Product',
    //         type: 'one-to-many',
    //         // joinTable: {
    //         //     name: 'brand_product',
    //         //     joinColumn: { name: 'brand_id', referencedColumnName: 'id' },
    //         //     inverseJoinColumn: { name: 'product_id', referencedColumnName: 'id' },
    //         // },
    //         joinTable: false,
    //         cascade: false,
    //         nullable: false
    //     },
    // }
})