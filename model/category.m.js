const EntitySchema = require('typeorm').EntitySchema;
module.exports = new EntitySchema({
    name: 'Category',
    tableName : 'category', 
    columns: {
        id: {
            type: 'int',
            primary: true,
            generated: true
        },
        name: {
            type: 'varchar',
            nullable: false,
        },
    }

})
