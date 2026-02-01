// config/permissions.js

module.exports = {
  admin: {
    users: ["read", "edit", "delete"],
    analytics: ["view"]
  },
  manager: {
    users: ["read", "edit"],
    analytics: ["view"]
  },
  user: {}
};
