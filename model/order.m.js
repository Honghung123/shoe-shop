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
        createdAt: {
            type: 'timestamp',
            default: () => 'CURRENT_TIMESTAMP',
            nullable: false
        }
        ,
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