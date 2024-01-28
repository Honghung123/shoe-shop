const EntitySchema = require('typeorm').EntitySchema;
module.exports = new EntitySchema({
    name: 'Transaction',
    tableName: 'transaction',
    columns: {
        id: {
            type: 'varchar',
            generated: 'uuid',
            primary: true
        },
        sender_id: {
            type: 'int',
            nullable: false
        },
        receiver_id: {
            type: 'int'
        },
        amount: {
            type: 'decimal'
        },
        status: {
            type: 'varchar',
            nullable: false,
        },
        description: {
            type: 'varchar',
            nullable: true
        }
    },
    relations: {
        sender: {
            target: 'Account',
            type: "many-to-one",
            joinTable: false,
            cascade: false,
            joinColumn: {
                name: "sender_id",
            },
        },
        receiver: {
            target: 'Account',
            type: 'many-to-one',
            joinTable: 'false',
            cascade: 'false',
            joinColumn: {
                name: 'receiver_id'
            }
        }
    }

})