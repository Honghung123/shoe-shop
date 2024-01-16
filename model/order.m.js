const EntitySchema = require('typeorm').EntitySchema;
module.exports = new EntitySchema({
    name:'Order',
    tableName: 'order',
    columns: {
        id: {
            type: 'int',
            generated: true,
            primary: true
        },
        total: {
            type: 'decimal',
            nullable: false,
        },
        user_id: {
            type: 'int',
            nullable: false
        }
        
    },
    relations: {
        user: {
            target: "User",
            type: "many-to-one",
            joinTable: false,
            cascade: false,
            joinColumn: {
                name: 'user_id'
            },
            nullable: false
        }
    }
})