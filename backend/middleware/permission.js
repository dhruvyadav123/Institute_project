// middleware/permission.js
const permissions = require("../config/permission");

exports.checkPermission = (module, action) => {
  return (req, res, next) => {
    const role = req.user.role;

    const allowed =
      permissions[role] &&
      permissions[role][module] &&
      permissions[role][module].includes(action);

    if (!allowed) {
      return res.status(403).json({ message: "Permission denied" });
    }

    next();
  };
};
