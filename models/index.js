'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config')[env];
const db = {};

const sequelize = new Sequelize(
  config.database, config.username, config.password, config,
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Bill = require('./bill')(sequelize, Sequelize);
db.Member = require('./member')(sequelize, Sequelize);
db.Hashtag = require('./hashtag')(sequelize, Sequelize);

// bill:member = N:M (다대다 관계)
// db.Bill.belongssToMany(db.Member, { through: 'Proposer' });
// db.Member.belongssToMany(db.Bill, { through: 'Proposer' });

// bill:hashtag = N:M (다대다 관계)
// on delete cascade가 default
db.Bill.belongsToMany(db.Hashtag, { through: 'BillHashtag', timestamps: false });
db.Hashtag.belongsToMany(db.Bill, { through: 'BillHashtag', timestamps: false });


module.exports = db;
