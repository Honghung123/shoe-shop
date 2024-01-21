const EntitySchema = require('typeorm').EntitySchema
const Product = require('./product.m')
module.exports = new EntitySchema({
    name: 'Size',
    tableName: 'size',
    columns: {
        id: {
            type: 'int',
            generated: 'rowid',
            primary: true
        },
        description: {
            type: 'varchar',
            nullable: true,
        }
    },
    
})