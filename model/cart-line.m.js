const EntitySchema = require("typeorm").EntitySchema;

module.exports = new EntitySchema({
  name: "CartLine",
  tableName: "cart_line",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: "rowid",
    },
    size_id: {
      type: "int",
      nullable: true,
    },
    quantity: {
      type: "int",
      nullable: false,
    },
    product_id: {
      type: "int",
      nullable: false,
    },
    user_id: {
      type: "int",
      nullable: false,
    },
  },
  relations: {
    product: {
      target: "Product",
      type: "many-to-one",
      joinTable: false,
      cascade: false,
      joinColumn: {
        name: "product_id",
      },
      nullable: false,
    },
    user: {
      target: "User",
      type: "many-to-one",
      joinTable: false,
      cascade: false,
      joinColumn: {
        name: "user_id",
      },
      nullable: false,
    },
    size: {
      target: "Size",
      type: "many-to-one",
      joinTable: false,
      cascade: false,
      joinColumn: {
        name: "size_id",
      },
      nullable: false,
    },
  },
  uniques: [
    {
      name: "user_product_unique",
      unique: true,
      columns: ["product_id", "user_id"],
    },
  ],
});
