const EntitySchema = require('typeorm').EntitySchema;
module.exports = new EntitySchema({
    name:'Order',
    tableName: 'order',
    columns: {
        id: {
            type: 'int',
            generated: 'rowid',
            primary: true
        },
        created_at: {
            type: 'timestamp',
            default: () => 'CURRENT_TIMESTAMP',
            nullable: false
        }
        ,
        total: {
            type: 'decimal',
            nullable: false,
        },
        status: {
            type: 'varchar',
            nullable: false
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
    },
    checks: [{
        expression: "status IN ('completed', 'canceled', 'delivering', 'preparing')"
    }]
})