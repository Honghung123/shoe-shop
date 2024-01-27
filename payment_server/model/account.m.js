const EntitySchema = require('typeorm').EntitySchema;
module.exports = new EntitySchema({
    name: 'Account',
    tableName: 'account',
    columns: {
        id: {
            type: 'int',
            primary: true,
        },
        pin_code: {
            type: 'varchar',
            nullable: false
        },
        balance: {
            type: 'decimal',
            nullable: false
        }
    },
    checks: [{
        expression: 'balance > 0'
    }]
})