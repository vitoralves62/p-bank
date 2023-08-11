'use strict';
export default (sequelize, DataTypes) => {
  const balance = sequelize.define('balance', {
    value: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {});
  balance.associate = function(models) {
    // associations can be defined here
  };
  return balance;
};