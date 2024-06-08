const { PermissionsBitField } = require('discord.js');

/**
 * @param {string | number | bigint} permissions
 * @param {import('discord.js').PermissionsString} permission
 */
function hasPermissions(permissions, permission) {
  const perms = new PermissionsBitField(permissions);
  return perms.has(permission);
}

module.exports = { hasPermissions };
