import { Sequelize } from "sequelize";
import db from "../database/models/index.js";

class securityService {
  static async postAcl(dto) {
    const { id, roles, permissions } = dto;

    // Encontrar o usuário pelo ID
    const findUser = await db.Users.findOne({
      include: [
        {
          model: db.roles,
          as: 'roleS_for_users',
          attributes: ['id', 'rolename', 'roledec'],
          through: {
            attributes: []
          }
        },
        {
          model: db.permissions,
          as: 'permissions_for_users',
          attributes: ['id', 'permname', 'permdesc'],
          through: {
            attributes: []
          }
        }
      ],
      where: {
        id: id
      }
    });


    if (!findUser) {
      throw new Error('Usuário e/ou senha incorretos!');
    }

    // Encontrar as roles com base nos IDs fornecidos
    const rolesRegistered = await db.roles.findAll({
      where: {
        id: {
          [Sequelize.Op.in]: roles
        }
      }
    });

    // Encontrar as permissions com base nos IDs fornecidos
    const permissionsRegistered = await db.permissions.findAll({
      where: {
        id: {
          [Sequelize.Op.in]: permissions
        }
      }
    });

    // Remover todas as roles e permissions existentes do usuário
    await findUser.removeRoleS_for_users(findUser.roleS_for_users);
    await findUser.removePermissions_for_users(findUser.permissions_for_users);

    // Adicionar as roles e permissions fornecidas ao usuário
    await findUser.addRoleS_for_users(rolesRegistered);
    await findUser.addPermissions_for_users(permissionsRegistered);

    // Recuperar o usuário atualizado com as novas roles e permissions
    const newUser = await db.Users.findOne({
      include: [
        {
          model: db.roles,
          as: 'roleS_for_users',
          attributes: ['id', 'rolename', 'roledec'],
          through: {
            attributes: [],
        }
        },
        {
          model: db.permissions,
          as: 'permissions_for_users',
          attributes: ['id', 'permname', 'permdesc'],
          through: {
            attributes: [],
        }
        }
      ],
      where: {
        id: findUser.id
      }
    });

    return newUser;
  }

  static async postPermsRoles (dto){
    const { id, roleID, permissions } = dto;
    const findRole = await db.roles.findOne({
        include: [{
            model: db.permissions,
            as: 'permissions_roles',
            attributes: ['id', 'permname', 'permdesc'],
            through: {
              attributes: [],
          }
        }]
    })
    if(!findRole){
        throw new Error ('Cargo inexstente.')
    }
    const permissionsRegistered = await db.permissions.findAll({
        where: {
          id: {
            [Sequelize.Op.in]: dto.permissions
          }
        }
    }); 

    await findRole.removePermissions_roles(findRole.permissions_roles)

    await findRole.addPermissions_roles(permissionsRegistered)

    const newRole = await db.roles.findOne({
        include: [
            {
                model: db.permissions,
                as: 'permissions_roles',
                attributes: ['id', 'permname', 'permdesc'],
                through: {
                  attributes: [],
              }
            }
        ],
        where: {
            id: roleID
        }
    })
    return newRole
  }
}

export default securityService;
