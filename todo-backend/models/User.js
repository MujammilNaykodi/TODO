module.exports = (sequelize, DataTypes) => {
    return sequelize.define('User', {
      username: { type: DataTypes.STRING, allowNull: false, unique: true },
      email: { type: DataTypes.STRING, allowNull: false, unique: true }
    });
  };
  