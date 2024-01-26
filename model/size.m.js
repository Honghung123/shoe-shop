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
            nullable: true
        },
        description: {
            type: 'varchar',
            nullable: true,
        }
    },
    
})