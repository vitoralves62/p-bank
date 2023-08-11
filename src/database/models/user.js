import { Model, DataTypes } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {
      Users.belongsToMany(models.roles, {
        through: models.users_roles,
        as: 'roleS_for_users',
        foreignKey: 'user_id'
      })
      Users.belongsToMany(models.permissions, {
        through: models.users_permissions,
        as: 'permissions_for_users',
        foreignKey: 'user_id'
      })
      Users.hasOne(models.balance, {
        foreignKey: 'user_id',
        as: 'balance'
      })
    }
  }
  Users.init(
    {
      name: DataTypes.STRING,
      status: DataTypes.BOOLEAN,
      email: DataTypes.STRING,
      password: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Users',
      defaultScope: {
        attributes: {
          exclude: ['password']
        }
      }
    }
  );
  return Users;
};
