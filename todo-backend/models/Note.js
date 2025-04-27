module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Note', {
      content: { type: DataTypes.TEXT, allowNull: false }
    });
  };
  