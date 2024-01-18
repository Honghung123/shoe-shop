const EntitySchema = require('typeorm').EntitySchema
module.exports = new EntitySchema({
    name: 'Size',
    tableName: 'product_size',
    columns: {
        id: {
            type: 'int',
            generated: 'rowid',
            primary: true
        },
        

    }
})