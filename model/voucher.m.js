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
        minimum_price: {
            type: 'decimal',
            nullable: false
        },
        percent: {
            type: 'int',
            nullable: false
        },
        date_expire: {
            type: 'timestamptz',
            nullable: false
        },
        limit: {
            type: 'int',
            nullable: false
        }
    },
    checks:  [{
        expression: 'percent > 0 AND percent <= 100 AND minimum_price >= 0'
    }],
    uniques: [
        {
            name: "code",
            columns: ["code"]
        }
    ]
})