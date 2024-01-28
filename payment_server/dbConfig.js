const typeorm = require('typeorm')
const transactionModel = require('./model/transaction.m');
const accountModel = require('./model/account.m')
const dataSource = new typeorm.DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.PAYMENT_DB,
    synchronize: true,
    logging: true,
    logger: true,
    entities: [accountModel, transactionModel],
});
const connectDb = async () => {
    try {
      await dataSource.initialize();
      console.log('Connected to database');
    } catch (error) {
      console.log(error);
      console.log(`Something went wrong: Can't connect to database`);
  
    }
  };

const transactionRepo = dataSource.getRepository('Transaction');
const accountRepo = dataSource.getRepository('Account');
module.exports = {connectDb, accountRepo, transactionRepo}
