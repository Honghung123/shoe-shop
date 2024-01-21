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
})