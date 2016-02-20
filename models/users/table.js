//定义users表
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    userName: {
      field: 'userName',
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
    },
    password: {
      field: 'password',
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
    },
  } , {
    tableName: 'users',
    timestamps: false,
    freezeTableName: true
  });
};