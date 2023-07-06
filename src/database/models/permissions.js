'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class permissions extends Model {
    static associate(models) {
      permissions.belongsToMany(models.Users, {
        through: models.users_permissions,
        as: 'permissions_users',
        foreignKey: 'permission_id'
      })
      permissions.belongsToMany(models.roles, {
        through: models.roles_permissions,
        as: 'permissions_roles',
        foreignKey: 'permission_id'
      })
    }
  }
  permissions.init({
    permname: DataTypes.STRING,
    permdesc: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'permissions',
  });
  return permissions;
};