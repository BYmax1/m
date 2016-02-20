//定义post表结构
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('post', {
    userName: {
      field: 'userName',
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
    },
    post: {
      field: 'post',
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
    },
    time: {
      field: 'time',
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
    },
  } , {
    tableName: 'post',
    timestamps: false,
    freezeTableName: true
  });
};