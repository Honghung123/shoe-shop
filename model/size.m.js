const EntitySchema = require('typeorm').EntitySchema
module.exports = new EntitySchema({
    name: 'Size',
    tableName: 'size',
    columns: {
        id: {
            type: 'int',
            generated: 'rowid',
            primary: true
        },
        size: {
            type: 'float',
            nullable: false
        },
        description: {
            type: 'varchar',
            nullable: true,
        }
    },
    
})