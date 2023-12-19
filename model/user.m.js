const EntitySchema = require('typeorm').EntitySchema;
module.exports = new EntitySchema({
    name: 'User',
    tableName : 'user', 
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
        email: {
            type: 'varchar',
            nullable: false,
            unique: true
        },
        password : {
            type: 'varchar',
            nullable: false,
        },
        locked: {
            type: 'boolean',
            default: false,
            nullable: false
        }
    }

})
