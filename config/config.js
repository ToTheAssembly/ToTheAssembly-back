require('dotenv').config();

module.exports = {
    development: {
        username: 'root',
        password: process.env.SEQUELIZE_PASSWORD,
        database: 'khr',
        host: '127.0.0.1',
        dialect: 'mysql',
        operatorsAlias: 'false',
    },
    test: {
        username: 'root',
        password: null,
        database: 'khr',
        host: '127.0.0.1',
        dialect: 'mysql',
        operatorsAlias: 'false',
    },
    production: {
        username: 'root',
        password: null,
        database: 'khr',
        host: '127.0.0.1',
        dialect: 'mysql',
        operatorsAlias: 'false',
        logging: false,
    },
};