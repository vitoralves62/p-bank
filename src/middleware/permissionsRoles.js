import db from "../database/models";
import { Sequelize } from "sequelize";

const permissionsRoles = (permissionsList) => {
    return async (req,res,next) => {
        const {id} = id;
        const user = await db.Users.findOne({
            include: [
                {
                    model: db.roles,
                    as: 'roleS_for_users',
                    attributes: ['id', 'rolename']
                }
            ],
            where:{
                id: id
            }
        })
        if (!user) {
            return res.status(401).send("Acesso negado!")
        }
        let rolesIDList = [];
        Object.values(user.roleS_for_users).map((role) => {
            rolesIDList.push(role.id)
        })
        if (rolesIDList.length == 0) {
            return res.status(401).send("Acesso negado!")
        }
        const roles = await db.roles.findAll({
            include: [
                {
                    model: db.permissions,
                    as: 'permissions_roles',
                    attributes: ['id', 'permname']
                }
            ],
            where: {
                id: {
                    [Sequelize.Op.in]: rolesIDList
                }
            }
        })
        let havePermission = false;
        roles.map((role) => {
            havePermission = role.permissions_roles
                .map((permission) => permission.permname)
                .some((permission) => permissionsList.includes(permission))
        })

        if (!havePermission) {
            return res.status(401).send("Acesso negado!")
        }

        return next();
    }
}

export default permissionsRoles;