const EntitySchema = require('typeorm').EntitySchema;
module.exports = new EntitySchema({
    name: 'Category',
    tableName : 'category', 
    columns: {
        id: {
            type: 'int',
            generated: 'rowid',
            primary: true
        },
        name: {
            type: 'varchar',
            nullable: false,
        },
    }
    

})
