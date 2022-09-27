require('dotenv').config();

module.exports = {
    development: {
        username: 'root',
        password: process.env.SEQUELIZE_PASSWORD,
        database: 'khr',
        host: '127.0.0.1',
        dialect: 'mysql',
        operatorsAlias: 'false',
        timezone: "+09:00",
        logging: false,
    },
    test: {
        username: 'root',
        password: null,
        database: 'khr',
        host: '127.0.0.1',
        dialect: 'mysql',
        operatorsAlias: 'false',
        timezone: "+09:00",
    },
    production: {
        username: 'root',
        password: null,
        database: 'khr',
        host: '127.0.0.1',
        dialect: 'mysql',
        operatorsAlias: 'false',
        logging: false,
        timezone: "+09:00",
    },
};