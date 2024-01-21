const EntitySchema = require('typeorm').EntitySchema;

module.exports = new EntitySchema({
    name: 'Voucher',
    tableName: 'voucher',
    columns: {
        id: {
            type: 'int',
            primary: true,
            generated: 'rowid'
        },
        code: {
            type: 'varchar',
            nullable: false
        },
        percent: {
            type: 'int',
            nullable: false
        },
        date_expire: {
            type: 'timestamp',
            nullable: false
        },
        limit: {
            type: 'int',
            nullable: false
        }
    },
    checks:  [{
        expression: 'percent > 0 AND percent <= 100'
    }],
    uniques: [
        {
            name: "code",
            columns: ["code"]
        }
    ]
})