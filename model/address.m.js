const EntitySchema = require('typeorm').EntitySchema;

module.exports = new EntitySchema({
    name: 'Address',
    tableName : 'user_address', 
    columns: {
        id: {
            type: 'int',
            primary: true,
            generated: 'rowid'
        },
        address: {
            type: 'varchar',
            nullable: false
        },
        user_id: {
            type: 'int',
            nullable: false
        },
        is_default: {
            type: 'boolean',
            nullable: false
        }
    },

    relations: {
        user: {
            target: "Product",
            type: "many-to-one",
            joinTable: false,
            cascade: false,
            joinColumn: {
                name: "user_id"
            },
            nullable: false
        },
        
        
    },
    uniques: [
        {
            name: "user_id_address",
            columns: ["user_id", "address"],
        }
    ]
    

})