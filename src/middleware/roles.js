import db from "../database/models/index.js"

const roles = (rolesList) => {
    return async (req, res, next) => {
        const { id } = req

        const user = await db.Users.findOne({
            include: [
                {
                    model: db.roles,
                    as: 'roleS_for_users',
                    attributes: ['id', 'rolename']
                }
            ],
            where: {
                id: id
            }
        })
        if (!user) {
            return res.status(401).send('Acesso negado!')
        }

        const rolesRegistered = user.roleS_for_users
            .map((role) => role.rolename)
            .some((role) => rolesList.includes(role))
        
        if(!rolesRegistered) {
            return res.status(401).send('Acesso negado!')
        }

        return next();
    }
}

export default roles;