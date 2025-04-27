module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Todo', {
      title: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.TEXT },
      priority: { type: DataTypes.ENUM('high', 'medium', 'low'), defaultValue: 'low' },
      completed: { type: DataTypes.BOOLEAN, defaultValue: false }
    });
  };
  