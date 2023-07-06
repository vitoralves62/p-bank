'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class roles extends Model {
    static associate(models) {
      roles.belongsToMany(models.Users, {
        through: models.users_roles,
        as: 'roles_user',
        foreignKey: 'role_id'
      })
      roles.belongsToMany(models.permissions, {
        through: models.roles_permissions,
        as: 'permissions_roles',
        foreignKey: 'role_id'
      })
    }
  }
  roles.init({
    rolename: DataTypes.STRING,
    roledec: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'roles',
  });
  return roles;
};