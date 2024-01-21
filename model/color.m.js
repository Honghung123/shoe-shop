const EntitySchema = require('typeorm').EntitySchema
module.exports = new EntitySchema({
    name: 'Color',
    tableName: 'color',
    columns: {
        id: {
            type: 'int',
            generated: 'rowid',
            primary: true
        },
        color: {
            type: 'varchar',
            nullable: true,
        }
    },
    
})