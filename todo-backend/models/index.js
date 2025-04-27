const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.User = require('./User')(sequelize, Sequelize);
db.Todo = require('./Todo')(sequelize, Sequelize);
db.Tag = require('./Tag')(sequelize, Sequelize);
db.Note = require('./Note')(sequelize, Sequelize);

// Relations
db.Todo.belongsToMany(db.Tag, { through: 'TodoTag' });
db.Tag.belongsToMany(db.Todo, { through: 'TodoTag' });

db.Todo.belongsToMany(db.User, { through: 'TodoUser', as: 'assignedUsers' });
db.User.belongsToMany(db.Todo, { through: 'TodoUser', as: 'assignedTodos' });

db.Todo.belongsTo(db.User, { as: 'creator' });
db.User.hasMany(db.Todo, { foreignKey: 'creatorId' });

db.Todo.hasMany(db.Note);
db.Note.belongsTo(db.Todo);

module.exports = db;
