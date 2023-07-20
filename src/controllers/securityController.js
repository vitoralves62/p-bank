import securityService from "../services/securityServices.js";

class securityController {
  static postACL = async (req, res) => {
    const { roles, permissions } = req.body;
    const id = req.params.id;
    const security_Service = new securityService();
    
    try {
      const acl = await securityService.postAcl({ roles, permissions, id });
      res.status(201).send(acl);
    } catch (error) {
      res.status(400).send({ message: error.message });
      console.log(error);
    }
  }

  static postPermsRoles = async (req,res) => {
    const { roleID, permissions } = req.body;

    try {
      const PermsRoles = await securityService.postPermsRoles({roleID, permissions })
      res.status(201).send(PermsRoles)
    } catch (error) {
      res.status(400).send({message: error.message});
      console.log(error);
    }
  }
}

export default securityController;
