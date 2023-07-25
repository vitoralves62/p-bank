import db from "../database/models/index.js";

const permissions = (permissionsList) => {
    return async (req,res,next) => {
        const {id} = req

        const user = await db.Users.findOne({
            include: [
                {
                    model: db.permissions,
                    as: 'permissions_for_users',
                    attributes: ['id', 'permname']
                }
            ],
            where: {
                id: id
            }
        })
        if(!user){
            return res.status(401).send('Acesso negado!')
        }

        const permissionsRegistered = user.permissions_for_users
            .map((permission) => permission.permname)
            .some((permission) => permissionsList.includes(permission))

        if (!permissionsRegistered) {
            return res.status(401).send('Acesso negado!')
        }
        return next();
    }
}

export default permissions;